'use strict';

import core from 'metal';
import templates from './DigitalClock.soy';
import Component from 'metal-component';
import Soy from 'metal-soy';

class DigitalClock extends Component {
	disposed() {
		clearInterval(this.interval);
	}

	onStartClick() {
		console.log('start');

		if (!core.isDefAndNotNull(this.interval)) {
			this.interval = setInterval(this.intervalFunction.bind(this), this.step);
		}
	}

	onPauseClick() {
		console.log('pause');

		clearInterval(this.interval);

    this.interval = null;
	}

	onStopClick() {
		console.log('stop');

		clearInterval(this.interval);

		this.elapsed = 0;
		this.interval = null;
		this.resetTimer();
	}

	onLapClick() {
		console.log('lap');

    let time = new Date(this.elapsed);
		time.setHours(time.getHours() - 1);

    let timeObj = {
      hours: time.getHours(),
      minutes: time.getMinutes(),
      seconds: time.getSeconds(),
      miliseconds: time.getMilliseconds() / 10
    };

    this.laps.push(timeObj);

		this.laps = this.laps;
	}

	onClearLapClick() {
		console.log('clear laps');

		this.laps = [];

		this.laps = this.laps;
	}

	resetTimer() {
		this.hours = 0;
		this.minutes = 0;
		this.seconds = 0;
		this.miliseconds = 0;
	}

	intervalFunction() {
		this.elapsed += this.step;

		let time = new Date(this.elapsed);
		time.setHours(time.getHours() - 1);

		this.miliseconds = time.getMilliseconds() / 10;
		this.seconds = time.getSeconds();
		this.minutes = time.getMinutes();
		this.hours = time.getHours();
	}
}
Soy.register(DigitalClock, templates);

DigitalClock.STATE = {
	elapsed: {
		validator: core.isNumber,
		value: 0
	},

	hours: {
		validator: core.isNumber,
		value: 0
	},

	minutes: {
		validator: core.isNumber,
		value: 0
	},

	seconds: {
		validator: core.isNumber,
		value: 0
	},

	miliseconds: {
		validator: core.isNumber,
		value: 0
	},

	interval: {
		value: null
	},

	step: {
		validator: core.isNumber,
		value: 10
	},

	laps: {
		validator: Array.isArray,
		valueFn: () => []
	}
};

export default DigitalClock;
