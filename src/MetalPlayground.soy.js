/* jshint ignore:start */
import Component from 'metal-component/src/Component';
import Soy from 'metal-soy/src/Soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from MetalPlayground.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace MetalPlayground.
 * @public
 */

goog.module('MetalPlayground.incrementaldom');

/** @suppress {extraRequire} */
var soy = goog.require('soy');
/** @suppress {extraRequire} */
var soydata = goog.require('soydata');
/** @suppress {extraRequire} */
goog.require('goog.i18n.bidi');
/** @suppress {extraRequire} */
goog.require('goog.asserts');
var IncrementalDom = goog.require('incrementaldom');
var ie_open = IncrementalDom.elementOpen;
var ie_close = IncrementalDom.elementClose;
var ie_void = IncrementalDom.elementVoid;
var ie_open_start = IncrementalDom.elementOpenStart;
var ie_open_end = IncrementalDom.elementOpenEnd;
var itext = IncrementalDom.text;
var iattr = IncrementalDom.attr;

var $templateAlias1 = Soy.getTemplate('Tooltip.incrementaldom', 'render');


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $render(opt_data, opt_ignored, opt_ijData) {
  ie_open('div', null, null,
      'class', 'metal-playground');
    $renderNavigation(opt_data, null, opt_ijData);
    $renderColumns(null, null, opt_ijData);
    $renderSidenav(opt_data, null, opt_ijData);
    $renderTooltips(null, null, opt_ijData);
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'MetalPlayground.render';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $renderColumns(opt_data, opt_ignored, opt_ijData) {
  ie_open('div', null, null,
      'class', 'container-fluid');
    ie_open('div', null, null,
        'class', 'col-md-4');
      ie_void('div', null, null,
          'class', 'metal-playground-editor');
    ie_close('div');
    ie_open('div', null, null,
        'class', 'col-md-8');
      ie_open('div', null, null,
          'class', 'flex-container metal-playground-live-view');
        ie_open('div', null, null,
            'class', 'metal-playground-rendered-component');
          itext('component will be displayed here...');
        ie_close('div');
      ie_close('div');
    ie_close('div');
  ie_close('div');
}
exports.renderColumns = $renderColumns;
if (goog.DEBUG) {
  $renderColumns.soyTemplateName = 'MetalPlayground.renderColumns';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $renderNavigation(opt_data, opt_ignored, opt_ijData) {
  ie_open('nav', null, null,
      'class', 'collapse-basic-search navbar navbar-default navbar-no-collapse');
    ie_open('ul', null, null,
        'class', 'nav navbar-nav');
      ie_open('li');
        ie_open('a', null, null,
            'class', 'control-menu-icon',
            'data-content', 'body',
            'data-toggle', 'sidenav',
            'data-type', 'fixed-push',
            'href', '#metalSidenav');
          ie_void('span', null, null,
              'class', 'icon-align-justify metal-playground-component-selector');
        ie_close('a');
      ie_close('li');
      ie_open('li', null, null,
          'class', 'active');
        ie_open('a', null, null,
            'href', '#');
          itext('Metal Playground');
        ie_close('a');
      ie_close('li');
      ie_open('li');
        ie_open('a', null, null,
            'class', 'control-menu-icon',
            'data-onclick', opt_data.onPlayingClickHandler_,
            'href', '#');
          ie_void('span', null, null,
              'class', (opt_data.isPlaying ? 'icon-stop' : 'icon-play') + ' metal-playground-play-stop');
        ie_close('a');
      ie_close('li');
      if (opt_data.isPlaying) {
        ie_open('li');
          ie_open('a', null, null,
              'class', 'control-menu-icon');
            ie_void('div', null, null,
                'class', 'bounceball metal-playground-loading-indicator');
          ie_close('a');
        ie_close('li');
      }
      ie_open('li');
        ie_open('a', null, null,
            'class', 'control-menu-icon',
            'href', 'index.html');
          ie_void('span', null, null,
              'class', 'icon-refresh metal-playground-reset');
        ie_close('a');
      ie_close('li');
      if (opt_data.currentComponent != null) {
        ie_open('li');
          ie_open('a', null, null,
              'class', 'control-menu-icon',
              'data-onclick', opt_data.onSaveCurrentStateClickHandler_,
              'href', '#');
            ie_void('span', null, null,
                'class', 'icon-save metal-playground-save-current-state');
          ie_close('a');
        ie_close('li');
      }
      ie_open('li');
        ie_open('a', null, null,
            'class', 'control-menu-icon');
          ie_open('span', null, null,
              'class', 'text-main');
            itext('Component state changes will get propageted to the editor, unless you press the STOP button.');
          ie_close('span');
        ie_close('a');
      ie_close('li');
    ie_close('ul');
  ie_close('nav');
}
exports.renderNavigation = $renderNavigation;
if (goog.DEBUG) {
  $renderNavigation.soyTemplateName = 'MetalPlayground.renderNavigation';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $renderSidenav(opt_data, opt_ignored, opt_ijData) {
  ie_open('div', null, null,
      'class', 'sidenav-fixed sidenav-menu-slider closed',
      'id', 'metalSidenav');
    ie_open('div', null, null,
        'class', 'sidebar sidebar-inverse sidenav-menu');
      ie_open('div', null, null,
          'class', 'sidebar-header');
        ie_open('h4');
          itext('Available components');
        ie_close('h4');
      ie_close('div');
      ie_open('div', null, null,
          'class', 'sidebar-body');
        ie_open('div', null, null,
            'class', 'row row-spacing');
          ie_open('div', null, null,
              'class', 'col-md-12');
            var current_componentList59 = opt_data.componentList;
            var current_componentListLen59 = current_componentList59.length;
            for (var current_componentIndex59 = 0; current_componentIndex59 < current_componentListLen59; current_componentIndex59++) {
              var current_componentData59 = current_componentList59[current_componentIndex59];
              ie_open('div');
                ie_open('blockquote', null, null,
                    'class', 'blockquote-sm blockquote-primary');
                  ie_open('a', null, null,
                      'class', 'control-menu-icon',
                      'href', '#',
                      'data-onclick', opt_data.onComponentClickHandler_,
                      'data-componentindex', current_componentIndex59);
                    itext((goog.asserts.assert((current_componentData59.NAME) != null), current_componentData59.NAME));
                  ie_close('a');
                ie_close('blockquote');
                if (current_componentData59.savedStates != null) {
                  ie_open('ul', null, null,
                      'class', 'metal-playground-state-list');
                    var stateNameList55 = current_componentData59.savedStateNames;
                    var stateNameListLen55 = stateNameList55.length;
                    for (var stateNameIndex55 = 0; stateNameIndex55 < stateNameListLen55; stateNameIndex55++) {
                      var stateNameData55 = stateNameList55[stateNameIndex55];
                      ie_open('li');
                        ie_open('blockquote', null, null,
                            'class', 'blockquote-sm blockquote-main');
                          ie_open('a', null, null,
                              'class', 'control-menu-icon',
                              'href', '#',
                              'data-onclick', opt_data.onComponentStateClickHandler_,
                              'data-componentindex', current_componentIndex59,
                              'data-stateindex', stateNameIndex55);
                            itext((goog.asserts.assert((stateNameData55) != null), stateNameData55));
                          ie_close('a');
                        ie_close('blockquote');
                      ie_close('li');
                    }
                  ie_close('ul');
                }
              ie_close('div');
            }
          ie_close('div');
        ie_close('div');
        ie_void('div', null, null,
            'class', 'sidebar-footer');
      ie_close('div');
    ie_close('div');
  ie_close('div');
}
exports.renderSidenav = $renderSidenav;
if (goog.DEBUG) {
  $renderSidenav.soyTemplateName = 'MetalPlayground.renderSidenav';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $renderTooltips(opt_data, opt_ignored, opt_ijData) {
  var resetTitleHtml__soy63 = function() {
    itext('Resets the application');
  };
  $templateAlias1({delay: [300, 150], elementClasses: 'fade', selector: '.metal-playground-reset', title: resetTitleHtml__soy63, visible: false}, null, opt_ijData);
  var liveReloadingTitleHtml__soy71 = function() {
    itext('Toggles the live reloading of the editor if the components state changes');
  };
  $templateAlias1({delay: [300, 150], elementClasses: 'fade', selector: '.metal-playground-play-stop', title: liveReloadingTitleHtml__soy71, visible: false}, null, opt_ijData);
  var openComponentSelectorTitleHtml__soy79 = function() {
    itext('Opens the component selector');
  };
  $templateAlias1({delay: [300, 150], elementClasses: 'fade', selector: '.metal-playground-component-selector', title: openComponentSelectorTitleHtml__soy79, visible: false}, null, opt_ijData);
  var saveStateTitleHtml__soy87 = function() {
    itext('Saves the current state with the given name');
  };
  $templateAlias1({delay: [300, 150], elementClasses: 'fade', selector: '.metal-playground-save-current-state', title: saveStateTitleHtml__soy87, visible: false}, null, opt_ijData);
}
exports.renderTooltips = $renderTooltips;
if (goog.DEBUG) {
  $renderTooltips.soyTemplateName = 'MetalPlayground.renderTooltips';
}

exports.render.params = ["componentList","currentComponent","isPlaying","onComponentClickHandler_","onComponentStateClickHandler_","onPlayingClickHandler_","onSaveCurrentStateClickHandler_"];
exports.render.types = {"componentList":"any","currentComponent":"any","isPlaying":"any","onComponentClickHandler_":"any","onComponentStateClickHandler_":"any","onPlayingClickHandler_":"any","onSaveCurrentStateClickHandler_":"any"};
exports.renderColumns.params = [];
exports.renderColumns.types = {};
exports.renderNavigation.params = ["currentComponent","isPlaying","onPlayingClickHandler_","onSaveCurrentStateClickHandler_"];
exports.renderNavigation.types = {"currentComponent":"any","isPlaying":"any","onPlayingClickHandler_":"any","onSaveCurrentStateClickHandler_":"any"};
exports.renderSidenav.params = ["componentList","onComponentClickHandler_","onComponentStateClickHandler_"];
exports.renderSidenav.types = {"componentList":"any","onComponentClickHandler_":"any","onComponentStateClickHandler_":"any"};
exports.renderTooltips.params = [];
exports.renderTooltips.types = {};
templates = exports;
return exports;

});

class MetalPlayground extends Component {}
Soy.register(MetalPlayground, templates);
export { MetalPlayground, templates };
export default templates;
/* jshint ignore:end */
