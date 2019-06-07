import React, { Component } from "react";
import "../App.css";

class DrumPad extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		document.addEventListener("keydown", this.handleKeyPress);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKeyPress);
	}

	handleKeyPress = e => {
		if (e.keyCode === this.props.letter.charCodeAt()) {
			this.playSound();
		}
	};

	playSound = e => {
		this.props.handleDisplay(this.props.id);
		const sound = document.getElementById(this.props.letter);
		sound.currentTime = 0;
		sound.play();
	};

	render() {
		return (
			<div
				className="drum-pad"
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
