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
            'data-onclick', opt_data.onPlayingClickHandler,
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
              'data-onclick', opt_data.onSaveCurrentStateClickHandler,
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
            var current_componentList56 = opt_data.componentList;
            var current_componentListLen56 = current_componentList56.length;
            for (var current_componentIndex56 = 0; current_componentIndex56 < current_componentListLen56; current_componentIndex56++) {
              var current_componentData56 = current_componentList56[current_componentIndex56];
              ie_open('div');
                ie_open('blockquote', null, null,
                    'class', 'blockquote-sm blockquote-primary');
                  ie_open('a', null, null,
                      'class', 'control-menu-icon',
                      'href', '#',
                      'data-onclick', opt_data.onComponentClickHandler,
                      'data-componentindex', current_componentIndex56);
                    itext((goog.asserts.assert((current_componentData56.NAME) != null), current_componentData56.NAME));
                  ie_close('a');
                ie_close('blockquote');
                if (current_componentData56.savedStates != null) {
                  ie_open('ul', null, null,
                      'class', 'metal-playground-state-list');
                    var stateNameList52 = current_componentData56.savedStateNames;
                    var stateNameListLen52 = stateNameList52.length;
                    for (var stateNameIndex52 = 0; stateNameIndex52 < stateNameListLen52; stateNameIndex52++) {
                      var stateNameData52 = stateNameList52[stateNameIndex52];
                      ie_open('li');
                        ie_open('blockquote', null, null,
                            'class', 'blockquote-sm blockquote-main');
                          ie_open('a', null, null,
                              'class', 'control-menu-icon',
                              'href', '#',
                              'data-onclick', opt_data.onComponentStateClickHandler,
                              'data-componentindex', current_componentIndex56,
                              'data-stateindex', stateNameIndex52);
                            itext((goog.asserts.assert((stateNameData52) != null), stateNameData52));
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

exports.render.params = ["componentList","currentComponent","isPlaying","onComponentClickHandler","onComponentStateClickHandler","onPlayingClickHandler","onSaveCurrentStateClickHandler"];
exports.render.types = {"componentList":"any","currentComponent":"any","isPlaying":"any","onComponentClickHandler":"any","onComponentStateClickHandler":"any","onPlayingClickHandler":"any","onSaveCurrentStateClickHandler":"any"};
exports.renderNavigation.params = ["currentComponent","isPlaying","onPlayingClickHandler","onSaveCurrentStateClickHandler"];
exports.renderNavigation.types = {"currentComponent":"any","isPlaying":"any","onPlayingClickHandler":"any","onSaveCurrentStateClickHandler":"any"};
exports.renderSidenav.params = ["componentList","onComponentClickHandler","onComponentStateClickHandler"];
exports.renderSidenav.types = {"componentList":"any","onComponentClickHandler":"any","onComponentStateClickHandler":"any"};
templates = exports;
return exports;

});

class MetalPlayground extends Component {}
Soy.register(MetalPlayground, templates);
export { MetalPlayground, templates };
export default templates;
/* jshint ignore:end */
