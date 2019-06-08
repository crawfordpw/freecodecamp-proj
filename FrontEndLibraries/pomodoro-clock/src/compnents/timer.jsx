import React, { Component } from 'react';
import '../App.scss';
import TimerControl from './timer-control.jsx';
import Controls from './controls.jsx';

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			breakLength: 5,
			sessionLength: 25,
			timeLeft: 25 * 60 * 1000,
			pause: true,
			label: 'Session'
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.timeLeft <= 0 && prevState.label === 'Session') {
			this.setState({
				timeLeft: this.state.breakLength * 60 * 1000,
				label: 'Break'
			});
			this.audio.play();
		}
		if (prevState.timeLeft <= 0 && prevState.label === 'Break') {
			this.setState({
				timeLeft: this.state.sessionLength * 60 * 1000,
				label: 'Session'
			});
			this.audio.play();
		}
	}

	setBreakLength = e => {
		if (this.state.pause) {
			this.handleLength('break', e.currentTarget.value);
		}
	};

	setSessionLength = e => {
		if (this.state.pause) {
			this.handleLength('session', e.currentTarget.value);
		}
	};

	handleLength(type, changeVal) {
		if (type === 'break') {
			let val = this.state.breakLength;
			if (changeVal === '+') {
				val++;
				if (val > 60) val = 60;
			} else {
				val--;
				if (val < 1) val = 1;
			}
			if (this.state.label === 'Break') {
				let time = val * 60 * 1000;
				this.setState({ breakLength: val, timeLeft: time });
			} else {
				this.setState({ breakLength: val });
			}
		} else {
			let val = this.state.sessionLength;
			if (changeVal === '+') {
				val++;
				if (val > 60) val = 60;
			} else {
				val--;
				if (val < 1) val = 1;
			}
			if (this.state.label === 'Session') {
				let time = val * 60 * 1000;
				this.setState({ sessionLength: val, timeLeft: time });
			} else {
				this.setState({ sessionLength: val });
			}
		}
	}

	handleTime = () => {
		if (this.state.pause) {
			this.setState({
				pause: false
			});
			this.time = setInterval(
				() => this.setState({ timeLeft: this.state.timeLeft - 1000 }),
				1000
			);
		} else {
			this.setState({
				pause: true
			});
			clearInterval(this.time);
		}
	};

	// modified from FCC sample
	formatTime() {
		let time = this.state.timeLeft;
		let minutes = Math.floor(time / 60000);
		let seconds = (time / 1000) % 60;
		seconds = seconds < 10 ? '0' + seconds : seconds;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		return minutes + ':' + seconds;
	}

	reset = () => {
		clearInterval(this.time);
		this.setState({
			breakLength: 5,
			sessionLength: 25,
			timeLeft: 25 * 60 * 1000,
			label: 'Session',
			pause: true
		});
		this.audio.pause();
		this.audio.currentTime = 0;
	};

	render() {
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
					<div id="timer-label">{this.state.label}</div>
					<div id="time-left">{this.formatTime()}</div>
				</div>
				<Controls
					pause={this.state.pause}
					onClick={this.handleTime}
					reset={this.reset}
				/>
				<audio
					id="beep"
					src="https://s3-us-west-1.amazonaws.com/benjaminadk/Data+synth+beep+high+and+sweet.mp3"
					ref={ref => (this.audio = ref)}
				/>
			</div>
		);
	}
}

export default Timer;
