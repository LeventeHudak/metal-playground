'use strict';

var metal = require('gulp-metal');
var path = require('path');

metal.registerTasks({
	buildSrc: ['src/**/*.js', 'demos/components/**/*.js'],
	cssSrc: ['src/**/*.css', 'demos/components/**/*.css'],
	scssSrc: ['src/**/*.scss', 'demos/components/**/*.scss'],
	soyDest: function(file) {
		return path.dirname(file.path);
	},
	soySrc: ['src/**/*.soy', 'demos/components/**/*.soy'],
	bundleCssFileName: 'metalPlayground.css',
	bundleFileName: 'metalPlayground.js',
	moduleName: 'metal-metalPlayground'
});
