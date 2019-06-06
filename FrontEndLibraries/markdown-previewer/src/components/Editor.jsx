import React, { Component } from "react";
import "../App.css";
import Toolbar from "./Toolbar.jsx";

class Editor extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className={this.props.className}>
				<Toolbar
					text="Editor"
					className="toolbar"
					onMax={this.props.onMax}
					isMax={this.props.isMax}
				/>
				<textarea
					id="editor"
					value={this.props.text}
					type="text"
					onChange={this.props.onChange}
				/>
			</div>
		);
	}
}

export default Editor;
