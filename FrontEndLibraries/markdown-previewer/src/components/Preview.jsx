import React, { Component } from "react";
import "../App.css";
import Toolbar from "./Toolbar.jsx";

const marked = require("marked");
marked.setOptions({
	breaks: true
});

const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
	return `<a target="_blank" href="${href}">${text}</a>`;
};

class Preview extends Component {
	render() {
		return (
			<div className={this.props.className}>
				<Toolbar
					text="Preview"
					className="toolbar"
					onMax={this.props.onMax}
					isMax={this.props.isMax}
				/>
				<div
					id="preview"
					dangerouslySetInnerHTML={{
						__html: marked(this.props.text, { renderer: renderer })
					}}
				/>
			</div>
		);
	}
}

export default Preview;
