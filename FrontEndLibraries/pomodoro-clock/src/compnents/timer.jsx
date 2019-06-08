import React, { Component } from 'react';
import '../App.scss';
import TimerControl from './timer-control.jsx';

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			breakLength: 5,
			sessionLength: 25,
			timeLeft: '15:00',
			pause: true
		};
	}

	setBreakLength = e => {
		this.handleLength('break', e.currentTarget.value);
	};

	setSessionLength = e => {
		this.handleLength('session', e.currentTarget.value);
	};

	handleLength(type, changeVal) {
		console.log(`Handle Length: ${type}, ${changeVal}`);
	}

	render() {
		const classes = this.state.pause
			? 'fas fa-play play-undo'
			: 'fas fa-pause play-undo';

		return (
			<div className="Timer">
				<h1>Pomodoro Clock</h1>
				<div className="timer-control">
					<div className="single-timer-control">
						<TimerControl
							labelID="break-label"
							label="Break Length"
							decrement="break-decrement"
							lengthID="break-length"
							length={this.state.breakLength}
							increment="break-increment"
							onClick={this.setBreakLength}
						/>
					</div>
					<div className="single-timer-control">
						<TimerControl
							labelID="session-label"
							label="Session Length"
							decrement="session-decrement"
							lengthID="session-length"
							length={this.state.sessionLength}
							increment="session-increment"
							onClick={this.setSessionLength}
						/>
					</div>
				</div>
				<div className="time-remaining">
					<div id="timer-label">Session</div>
					<div id="time-left">{this.state.timeLeft}</div>
				</div>
				<div className="control-buttons">
					<button id="start_stop" className="btns">
						<i className={classes} />
					</button>
					<button id="reset" className="btns">
						<i className="fas fa-undo play-undo" />
					</button>
				</div>
			</div>
		);
	}
}

export default Timer;
