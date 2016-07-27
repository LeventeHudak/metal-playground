'use strict';

import MetalPlayground from '../src/MetalPlayground';

import dom from 'metal-dom';
import Tooltip from 'metal-tooltip';

let metalPlayground, prompt;

describe('MetalPlayground', function() {
	afterEach(function() {
		if (metalPlayground) {
			metalPlayground.dispose();
			metalPlayground = null;
		}

		if (prompt) {
			prompt.restore();
			prompt = null;
		}
	});

	it('should complement the two JSON objects', () => {
		metalPlayground = new MetalPlayground();

		let jsonA = {
			test: 'test',
			test2: 'test2',
			test3: 'test3'
		};
		let jsonB = {
			test2: 'test2',
			test3: 'test3'
		};

		let jsonC = metalPlayground.complementJSON_(jsonA, jsonB);

		let jsonD = {
			test: 'test'
		};

		assert.deepEqual(jsonD, jsonC);
	});

	it('should update the editor with the selected components state if isPlaying is true', (done) => {
		metalPlayground = new MetalPlayground({
			componentList: {
				Tooltip: Tooltip
			}
		});

		let defaultEditorContent = metalPlayground.editor_.getValue();

		let tooltipComponentLink = metalPlayground.element.querySelector('div.col-md-12 > div > blockquote > a.control-menu-icon');
		dom.triggerEvent(tooltipComponentLink, 'click');

		metalPlayground.once('stateSynced', () => {
			metalPlayground.editor_.getSession().on('change', (e) => {
				if (e.action === 'insert') {
					let afterChangeEditorContent = metalPlayground.editor_.getValue();

					assert.notStrictEqual(defaultEditorContent, afterChangeEditorContent);

					done();
				}
			});
		});
	});

	it('should not update the editor with the selected components state if isPlaying is false', (done) => {
		metalPlayground = new MetalPlayground({
			componentList: {
				Tooltip: Tooltip
			}
		});

		let defaultEditorContent = metalPlayground.editor_.getValue();

		let tooltipComponentLink = metalPlayground.element.querySelector('div.col-md-12 > div > blockquote > a.control-menu-icon');
		dom.triggerEvent(tooltipComponentLink, 'click');

		metalPlayground.isPlaying = false;

		metalPlayground.once('stateSynced', () => {
			let afterChangeEditorContent = metalPlayground.editor_.getValue();

			assert.strictEqual(defaultEditorContent, afterChangeEditorContent);

			done();
		});
	});

	it('should not throw any errors when clicking on the same component again', (done) => {
		metalPlayground = new MetalPlayground({
			componentList: {
				Tooltip: Tooltip
			}
		});

		let tooltipComponentLink = metalPlayground.element.querySelector('div.col-md-12 > div > blockquote > a.control-menu-icon');
		dom.triggerEvent(tooltipComponentLink, 'click');

		metalPlayground.once('stateSynced', () => {
			dom.triggerEvent(tooltipComponentLink, 'click');

			metalPlayground.once('stateSynced', () => {
				done();
			});
		});
	});

	it('should not throw any errors when the component is not found by name in the component list nor when the isPlaying attribute is false by default', (done) => {
		metalPlayground = new MetalPlayground({
			componentList: {
				Tooltip: Tooltip
			}
		});

		prompt = sinon.stub(window, 'prompt', () => {
			return 'Saved state 1';
		});

		let tooltipComponentLink = metalPlayground.element.querySelector('div.col-md-12 > div > blockquote > a.control-menu-icon');
		dom.triggerEvent(tooltipComponentLink, 'click');

		metalPlayground.once('stateSynced', () => {
			metalPlayground.currentComponent.NAME = 'Test';
			metalPlayground.isPlaying = false;

			let saveBtn = metalPlayground.element.querySelector('.metal-playground-save-current-state');
			dom.triggerEvent(saveBtn, 'click');

			metalPlayground.once('stateSynced', () => {
				let savedState = metalPlayground.element.querySelector('ul.metal-playground-state-list > li > blockquote > a');

				assert.isNull(savedState);

				done();
			});
		});
	});

	it('should save the state if saveStateBtn was clicked', (done) => {
		metalPlayground = new MetalPlayground({
			componentList: {
				Tooltip: Tooltip
			}
		});

		prompt = sinon.stub(window, 'prompt', () => {
			return 'Saved state 1';
		});

		let tooltipComponentLink = metalPlayground.element.querySelector('div.col-md-12 > div > blockquote > a.control-menu-icon');
		dom.triggerEvent(tooltipComponentLink, 'click');

		metalPlayground.once('stateSynced', () => {
			let saveBtn = metalPlayground.element.querySelector('.metal-playground-save-current-state');
			dom.triggerEvent(saveBtn, 'click');

			metalPlayground.once('stateSynced', () => {
				let savedState = metalPlayground.element.querySelector('ul.metal-playground-state-list > li > blockquote > a');

				assert.isNotNull(savedState);

				done();
			});
		});
	});

	it('should NOT save the state if name is somehow null', (done) => {
		metalPlayground = new MetalPlayground({
			componentList: {
				Tooltip: Tooltip
			}
		});

		prompt = sinon.stub(window, 'prompt', () => {
			return null;
		});

		var spy = sinon.spy(metalPlayground, 'complementJSON_');

		let tooltipComponentLink = metalPlayground.element.querySelector('div.col-md-12 > div > blockquote > a.control-menu-icon');
		dom.triggerEvent(tooltipComponentLink, 'click');

		metalPlayground.once('stateSynced', () => {

			let saveBtn = metalPlayground.element.querySelector('.metal-playground-save-current-state');
			dom.triggerEvent(saveBtn, 'click');

			assert.equal(spy.called, false);

			metalPlayground.complementJSON_.restore();

			done();
		});
	});

	it('should load the saved state', (done) => {
		metalPlayground = new MetalPlayground({
			componentList: {
				Tooltip: Tooltip
			}
		});

		prompt = sinon.stub(window, 'prompt', () => {
			return 'Saved state 1';
		});

		let defaultEditorContent = metalPlayground.editor_.getValue();

		let tooltipComponentLink = metalPlayground.element.querySelector('div.col-md-12 > div > blockquote > a.control-menu-icon');
		dom.triggerEvent(tooltipComponentLink, 'click');

		metalPlayground.once('stateSynced', () => {
			let saveBtn = metalPlayground.element.querySelector('.metal-playground-save-current-state');
			dom.triggerEvent(saveBtn, 'click');

			metalPlayground.once('stateSynced', () => {
				let loadStateBtn = metalPlayground.element.querySelector('ul.metal-playground-state-list > li > blockquote.blockquote-main > a');
				dom.triggerEvent(loadStateBtn, 'click');

				metalPlayground.once('stateSynced', () => {
					metalPlayground.editor_.getSession().on('change', (e) => {
						if (e.action === 'insert') {
							let afterChangeEditorContent = metalPlayground.editor_.getValue();

							assert.notStrictEqual(defaultEditorContent, afterChangeEditorContent);

							done();
						}
					});
				});
			});
		});
	});

	it('should toggle the playing state', (done) => {
		metalPlayground = new MetalPlayground({
			componentList: {
				Tooltip: Tooltip
			}
		});

		assert.strictEqual(true, metalPlayground.isPlaying);

		let playStopBtn = metalPlayground.element.querySelector('.metal-playground-play-stop');
		dom.triggerEvent(playStopBtn, 'click');

		metalPlayground.once('stateSynced', () => {
			assert.strictEqual(false, metalPlayground.isPlaying);

			done();
		});
	});

	it('should save the editor content', (done) => {
		metalPlayground = new MetalPlayground({
			componentList: {
				Tooltip: Tooltip
			}
		});

		let defaultEditorContent = metalPlayground.editor_.getValue();

		metalPlayground.editorIgnoreChange_ = true;
		metalPlayground.onEditorSaveHandler_();

		let afterChangeEditorContent = metalPlayground.editor_.getValue();

		assert.strictEqual(defaultEditorContent, afterChangeEditorContent);


		metalPlayground.editor_.setValue('');
		metalPlayground.onEditorSaveHandler_();
		metalPlayground.editor_.setValue(afterChangeEditorContent);

		let tooltipComponentLink = metalPlayground.element.querySelector('div.col-md-12 > div > blockquote > a.control-menu-icon');
		dom.triggerEvent(tooltipComponentLink, 'click');

		metalPlayground.once('stateSynced', () => {
			metalPlayground.onEditorSaveHandler_();

			metalPlayground.editor_.getSession().on('change', (e) => {
				if (e.action === 'insert') {
					afterChangeEditorContent = metalPlayground.editor_.getValue();

					assert.notStrictEqual(afterChangeEditorContent, defaultEditorContent);

					done();
				}
			});
		});
	});

	it('should not fail when the componentList is null', () => {
		metalPlayground = new MetalPlayground({
			componentList: {
				Tooltip: null
			}
		});
	});
});
