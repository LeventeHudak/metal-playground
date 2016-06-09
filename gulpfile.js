'use strict';

var metal = require('gulp-metal');
var path = require('path');

metal.registerTasks({
	buildSrc: ['src/**/*.js', 'componentSrc/**/*.js', 'demos/components/**/*.js'],
	cssSrc: ['src/**/*.css', 'componentSrc/**/*.css', 'demos/components/**/*.css'],
	scssSrc: ['src/**/*.scss', 'componentSrc/**/*.scss', 'demos/components/**/*.scss'],
	soyDest: function(file) {
		return path.dirname(file.path);
	},
	soySrc: ['src/**/*.soy', 'componentSrc/**/*.soy', 'demos/components/**/*.soy'],
	bundleCssFileName: 'metalPlayground.css',
	bundleFileName: 'metalPlayground.js',
	moduleName: 'metal-metalPlayground'
});
