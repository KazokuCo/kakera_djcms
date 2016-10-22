FROM python:3.5

# Install NodeJS; based on the official node image.
ENV NODE_VERSION 6.7.0
RUN wget -q -O /tmp/node.tar.xz "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" && \
    tar xf /tmp/node.tar.xz -C /usr/local --strip-components=1 && \
    rm /tmp/node.tar.xz

# Install the gunicorn web server.
RUN pip install --no-cache-dir gunicorn

# Finally, install kakera itself.
WORKDIR /srv/kakera
ADD . .
RUN pip install --no-cache-dir -r requirements.txt
RUN npm install && npm install -g gulp-cli && gulp

# Run it under gunicorn.
ENV GUNICORN_WORKERS 1
EXPOSE 8000
CMD ["/bin/bash", "-c", "./manage.py collectstatic --noinput && ./manage.py migrate && /usr/local/bin/gunicorn -b 0.0.0.0:8000 -w ${GUNICORN_WORKERS} kakera.wsgi"]
