'use strict';

import Component from 'metal-component';
import core from 'metal';
import { cancelDebounce, debounce } from 'metal-debounce';
import Soy from 'metal-soy';
import templates from './MetalPlayground.soy';

import 'metal-tooltip';

class MetalPlayground extends Component {
	/**
	 * Subtracts B JSON from A JSON.
	 * @param {!Object} A
	 * @param {!Object} B
	 * @return {!Object} A without the attributes from {!Object} B
	 * @protected
	 */
	complementJSON_(A, B) {
		for (var attribute in B) {
			delete A[attribute];
		}

		return A;
	}

	/**
	 * Called when the component is being disposed.
	 */
	disposed() {
		this.currentComponent && this.currentComponent.dispose();

		cancelDebounce(this.saveEditorFn_);

		this.editor_.session.removeAllListeners('change');
		this.editor_.destroy();
	}

	/**
	 * Called when the state of the selected component changes.
	 * @protected
	 */
	handleSelectedComponentStateChange_() {
		if (this.isPlaying) {
			let stateJson = this.complementJSON_(this.currentComponent.getState(), Component.STATE);

			this.updateEditorContentWithStateData_(stateJson);
		}
	}

	/**
	 * Called when someone clicks on a component in the sidenav.
	 * @param {!Event} event
	 * @protected
	 */
	onComponentClickHandler_(event) {
		event.preventDefault();

		this.isPlaying = true;

		if (core.isDefAndNotNull(this.currentComponent)) {
			this.currentComponent.dispose();
			this.currentComponent = {};
		}

		let item = event.currentTarget;
		let index = parseInt(item.getAttribute('data-componentindex'));

		this.element.querySelector('.metal-playground-rendered-component').innerHTML = '';

		this.currentComponent = new this.componentList[index](null, '.metal-playground-rendered-component');
		this.currentComponent.NAME = core.getFunctionName(this.componentList[index]);

		this.currentComponent.on('stateChanged', this.handleSelectedComponentStateChange_.bind(this));
	}

	/**
	 * Called when someone clicks on a saved state in the sidenav.
	 * @param {!Event} event
	 * @protected
	 */
	onComponentStateClickHandler_(event) {
		event.preventDefault();

		let item = event.currentTarget;
		let componentIndex = parseInt(item.getAttribute('data-componentindex'));
		let stateIndex = parseInt(item.getAttribute('data-stateindex'));

		this.onComponentClickHandler_(event);

		let savedStateJson = this.componentList[componentIndex].savedStates[stateIndex];
		this.currentComponent.setState(savedStateJson);
	}

	/**
	 * Called when the content of the editor changes.
	 * @protected
	 */
	onEditorSaveHandler_() {
		if (!this.editorIgnoreChange_) {
			if (this.editor_.getValue() !== '' && core.isDefAndNotNull(this.currentComponent)) {
				try {
					let stateJson = this.complementJSON_(JSON.parse(this.editor_.getValue()), Component.STATE);

					this.currentComponent.setState(stateJson);
				} catch (err) {}
			}
		}

		this.editorIgnoreChange_ = false;
	}

	/**
	 * Called when someone clicks on the play / stop buttons.
	 * @param {!Event} event
	 * @protected
	 */
	onPlayingClickHandler_(event) {
		event.preventDefault();

		this.isPlaying = !this.isPlaying;
	}

	/**
	 * Called when someone clicks on the save state button.
	 * @param {!Event} event
	 * @protected
	 */
	onSaveCurrentStateClickHandler_(event) {
		event.preventDefault();

		let saveName = prompt('Please enter a name', 'Saved state 1');

		if (core.isDefAndNotNull(saveName)) {
			let playing = this.isPlaying;

			if (this.isPlaying) {
				this.isPlaying = false;
			}

			for (let i = 0; i < this.componentList.length; i++) {
				if (this.componentList[i].NAME === this.currentComponent.NAME) {
					let stateJson = this.complementJSON_(this.currentComponent.getState(), Component.STATE);

					if (core.isDefAndNotNull(this.componentList[i].savedStates)) {
						this.componentList[i].savedStates.push(stateJson);
						this.componentList[i].savedStateNames.push(saveName);
					} else {
						this.componentList[i].savedStates = [];
						this.componentList[i].savedStates.push(stateJson);

						this.componentList[i].savedStateNames = [];
						this.componentList[i].savedStateNames.push(saveName);
					}

					this.componentList = this.componentList;
				}
			}

			this.isPlaying = playing;
		}
	}

	/**
	 * Called when the component is rendered.
	 */
	rendered() {
		this.setupEditor_();
	}

	/**
	 * Grabs the components from the value and binds them to the instance.
	 * @param {!Object} value Should contain the components to be added.
	 * @protected
	 * @return {!Object} The added components.
	 */
	setComponentList_(value) {
		let componentList = [];

		for (var moduleName in value) {
			if (core.isDefAndNotNull(value[moduleName]) &&
				value[moduleName].prototype instanceof Component &&
				value[moduleName] !== MetalPlayground) {

				let module = value[moduleName];
				module.NAME = core.getFunctionName(module);

				componentList.push(module);
			}
		}

		return componentList;
	}

	/**
	 * Initalizes and sets up the editor during refreshes.
	 * @protected
	 */
	setupEditor_() {
		let prevEditorContent = '{"state": "will be displayed here..."}';
		let prevCursorPos = null;

		if (this.editor_) {
			cancelDebounce(this.saveEditorFn_);

			prevEditorContent = this.editor_.getValue();
			prevCursorPos = this.editor_.getCursorPosition();
			let oldDiv = this.editor_.container;
			let newDiv = oldDiv.cloneNode(false);

			this.editor_.session.removeAllListeners('change');
			this.editor_.destroy();

			oldDiv.parentNode.replaceChild(newDiv, oldDiv);

			let renderedComponentNode = this.element.querySelector('.metal-playground-rendered-component');
			renderedComponentNode.innerHTML = '';

			if (core.isDefAndNotNull(this.currentComponent) && core.isDefAndNotNull(this.currentComponent.element)) {
				renderedComponentNode.appendChild(this.currentComponent.element);
			}
		}

		this.editor_ = window.ace.edit(this.element.querySelector('.metal-playground-editor'));
		this.editor_.$blockScrolling = Infinity;
		this.editor_.getSession().setMode('ace/mode/json');
		this.editor_.setTheme('ace/theme/github');
		this.editor_.setValue(prevEditorContent, 1);

		if (core.isDefAndNotNull(prevCursorPos)) {
			this.editor_.moveCursorTo(prevCursorPos.row, prevCursorPos.column);
		}

		this.saveEditorFn_ = debounce(this.onEditorSaveHandler_.bind(this), 200);
		this.editor_.on('change', this.saveEditorFn_);
	}

	/**
	 * Updates the editor content with the given state.
	 * @param {JSON} stateJson
	 * @protected
	 */
	updateEditorContentWithStateData_(stateJson) {
		this.editorIgnoreChange_ = true;

		let prevCursorPos = this.editor_.getCursorPosition();

		this.editor_.setValue(JSON.stringify(stateJson, null, '\t'), 1);

		this.editor_.moveCursorTo(prevCursorPos.row, prevCursorPos.column);
	}
}
Soy.register(MetalPlayground, templates);

MetalPlayground.STATE = {
	/**
	 * Holds the components.
	 * @type {!Object}
	 * @default window.metal
	 */
	componentList: {
		setter: 'setComponentList_',
		validator: core.isObject,
		value: window.metal
	},

	/**
	 * Holds the currently selected component.
	 * @type {!Object}
	 * @default null
	 */
	currentComponent: {
		validator: core.isObject,
		value: null
	},

	/**
	 * Holds weather or not the editor should update itself automatically.
	 * @type {boolean}
	 * @default true
	 */
	isPlaying: {
		validator: core.isBoolean,
		value: true
	}
};

export default MetalPlayground;
