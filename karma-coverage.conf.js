'use strict';

var metalKarmaConfig = require('metal-karma-config/coverage');

module.exports = function(config) {
  metalKarmaConfig(config);

  config.files.push('./node_modules/ace-editor-builds/src-min-noconflict/ace.js');
  config.files.push('./node_modules/ace-editor-builds/src-min-noconflict/mode-json.js');
  config.files.push('./node_modules/ace-editor-builds/src-min-noconflict/worker-json.js');
};
