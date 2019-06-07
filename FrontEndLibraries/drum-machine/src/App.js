import React, { Component } from "react";
import "./App.css";
import DrumPad from "./components/drumpad.jsx";

const dataBank = [
	{
		id: "Chord-1",
		letter: "Q",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
	},
	{
		id: "Chord-2",
		letter: "W",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
	},
	{
		id: "Chord-3",
		letter: "E",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
	},
	{
		id: "Shaker",
		letter: "A",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
	},
	{
		id: "Open-HH",
		letter: "S",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
	},
	{
		id: "Closed-HH",
		letter: "D",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
	},
	{
		id: "Punchy-Kick",
		letter: "Z",
		src: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
	},
	{
		id: "Side-Stick",
		letter: "X",
		src: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
	},
	{
		id: "Snare",
		letter: "C",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
	}
];

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { display: " " };
	}

	handleDisplay = display => {
		this.setState({ display });
	};

	render() {
		return (
			<div className="App">
				<div id="drum-machine" className="drum-panel">
					<div className="drum-pads">
						{dataBank.map(data => (
							<DrumPad
								id={data.id}
								key={data.letter}
								src={data.src}
								letter={data.letter}
								handleDisplay={this.handleDisplay}
							/>
						))}
					</div>
					<div className="right-panel">
						<div id="display">{this.state.display}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
