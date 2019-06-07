import React, { Component } from 'react';
import '../App.scss';

class DrumPad extends Component {
	constructor(props) {
		super(props);
		this.state = { active: false };
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress);
	}

	handleKeyPress = e => {
		if (e.keyCode === this.props.letter.charCodeAt()) {
			this.playSound();
		}
	};

	activate = () => {
		this.setState({
			active: !this.state.active
		});
	};

	playSound = e => {
		if (this.props.power) {
			this.props.handleDisplay(this.props.id);
			const sound = document.getElementById(this.props.letter);
			sound.currentTime = 0;
			sound.volume = this.props.volume;
			sound.play();
			this.activate();
			setTimeout(() => this.activate(), 100);
		}
	};

	render() {
		const drumPad = this.state.active ? 'drum-pad-hit' : 'drum-pad';

		return (
			<div
				className={drumPad}
				id={this.props.id}
				onClick={this.playSound}
			>
				<p>{this.props.letter}</p>
				<audio
					id={this.props.letter}
					src={this.props.src}
					className="clip"
				/>
			</div>
		);
	}
}

export default DrumPad;
