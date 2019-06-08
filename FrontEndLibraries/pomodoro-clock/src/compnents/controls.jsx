import React, { Component } from 'react';

class Controls extends Component {
	render() {
		const classes = this.props.pause ? 'fas fa-play ' : 'fas fa-pause ';

		return (
			<div>
				<button
					id="start_stop"
					className="btns"
					onClick={this.props.onClick}>
					<i className={classes} />
				</button>
				<button id="reset" className="btns" onClick={this.props.reset}>
					<i className="fas fa-undo" />
				</button>
			</div>
		);
	}
}

export default Controls;
