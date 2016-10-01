var Funnel = require('broccoli-funnel');
var compileSass = require('broccoli-sass');
var autoprefixer = require('broccoli-autoprefixer');
var babelTranspile = require('broccoli-babel-transpiler');
var mergeTrees = require('broccoli-merge-trees');

var styles = [
    'assets/css',
    'node_modules/bootstrap-sass/assets/stylesheets',
];
styles = compileSass(styles, 'app.scss', 'app.css', {
    precision: 8,
    outputStyle: 'expanded',
});
styles = autoprefixer(styles);
styles = new Funnel(styles, { destDir: 'css' });

var scripts = 'assets/js';
scripts = babelTranspile(scripts);
scripts = new Funnel(scripts, { destDir: 'js' });

module.exports = mergeTrees([styles, scripts]);
