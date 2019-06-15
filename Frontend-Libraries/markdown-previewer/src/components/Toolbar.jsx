import React, { Component } from "react";
import "../App.css";

class Toolbar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className={this.props.className}>
				<span>{this.props.text}</span>
				<i className={this.props.isMax} onClick={this.props.onMax} />
			</div>
		);
	}
}

export default Toolbar;
