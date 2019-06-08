import React, { Component } from 'react'

class TimerControl extends Component {
    render() {
        return (
            <div>
                <div id={this.props.labelID}>{this.props.label}</div>
                <div id={this.props.decrement} />
                <div id={this.props.lengthID}>{this.props.length}</div>
                <div id={this.props.increment} />
            </div>
        )
    }
}

export default TimerControl
