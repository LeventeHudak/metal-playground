'use strict';

import core from 'metal';
import Component from 'metal-component';
import { cancelDebounce, debounce } from 'metal-debounce';
import dom from 'metal-dom';
import Soy from 'metal-soy';
import templates from './MetalPlayground.soy';

import Tooltip from 'metal-tooltip';

class MetalPlayground extends Component {
	rendered() {
		this.setupEditor_();
		this.setupTooltips_();
	}

	complementJSON_(A, B) {
		for (var attribute in B) {
			delete A[attribute];
		}

		return A;
	}

	handleSelectedComponentStateChange_() {
		if (this.isPlaying) {
			let stateJson = this.complementJSON_(this.currentComponent.getState(), Component.STATE);

			this.updateEditorContentWithStateData_(stateJson);
		}
	}

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

	onComponentClickHandler(event) {
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
		this.currentComponent.NAME = this.componentList[index].NAME;

		this.currentComponent.on('stateChanged', this.handleSelectedComponentStateChange_.bind(this));
	}

	onComponentStateClickHandler(event) {
		event.preventDefault();

		let item = event.currentTarget;
		let componentIndex = parseInt(item.getAttribute('data-componentindex'));
		let stateIndex = parseInt(item.getAttribute('data-stateindex'));

		this.onComponentClickHandler(event);

		let savedStateJson = this.componentList[componentIndex].savedStates[stateIndex];
		this.currentComponent.setState(savedStateJson);
	}

	onPlayingClickHandler(event) {
		event.preventDefault();

		this.isPlaying = !this.isPlaying;
	}

	onSaveCurrentStateClickHandler() {
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

	setComponentList_(value) {
		let componentList = [];

		for (var moduleName in value) {
			if (core.isDefAndNotNull(value[moduleName].NAME) &&
				value[moduleName].prototype instanceof Component &&
				value[moduleName].NAME !== MetalPlayground.NAME) {

				componentList.push(value[moduleName]);
			}
		}

		return componentList;
	}

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

	setupTooltips_() {
		new Tooltip({
			delay: [300, 150],
			elementClasses: 'fade',
			position: Tooltip.Align.Bottom,
			selector: '.metal-playground-reset',
			title: 'Resets the application',
			visible: false
		}, '.metal-playground');

		new Tooltip({
			delay: [300, 150],
			elementClasses: 'fade',
			position: Tooltip.Align.Bottom,
			selector: '.metal-playground-play-stop',
			title: 'Toggles the live reloading of the editor if the components state changes',
			visible: false
		}, '.metal-playground');

		new Tooltip({
			delay: [300, 150],
			elementClasses: 'fade',
			position: Tooltip.Align.Left,
			selector: '.metal-playground-component-selector',
			title: 'Opens the component selector',
			visible: false
		}, '.metal-playground');

		new Tooltip({
			delay: [300, 150],
			elementClasses: 'fade',
			position: Tooltip.Align.Bottom,
			selector: '.metal-playground-save-current-state',
			title: 'Saves the current state with the given name.',
			visible: false
		}, '.metal-playground');
	}

	updateEditorContentWithStateData_(stateJson) {
		this.editorIgnoreChange_ = true;

		let prevCursorPos = this.editor_.getCursorPosition();

		this.editor_.setValue(JSON.stringify(stateJson, null, '\t'), 1);

		this.editor_.moveCursorTo(prevCursorPos.row, prevCursorPos.column);
	}
}
Soy.register(MetalPlayground, templates);

MetalPlayground.STATE = {
	componentList: {
		setter: 'setComponentList_',
		validator: core.isObject,
		value: window.metal
	},

	currentComponent: {
		validator: core.isObject,
		value: null
	},

	isPlaying: {
		validator: core.isBoolean,
		value: true
	}
};

export default MetalPlayground;
