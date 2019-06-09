import React, { Component } from 'react';

class TimerControl extends Component {
	render() {
		return (
			<div>
				<div id={this.props.labelID} className="control-label">
					{this.props.label}
				</div>
				<div className="inc-dec">
					<button
						id={this.props.decrement}
						value="-"
						onClick={this.props.onClick}
						className="btns">
						<i className="fas fa-arrow-down" />
					</button>
					<div id={this.props.lengthID} className="control-length">
						{this.props.length}
					</div>
					<button
						id={this.props.increment}
						value="+"
						onClick={this.props.onClick}
						className="btns">
						<i className="fas fa-arrow-up " />
					</button>
				</div>
			</div>
		);
	}
}

export default TimerControl;
