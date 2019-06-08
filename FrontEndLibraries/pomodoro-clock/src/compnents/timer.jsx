import React, { Component } from 'react'
import '../App.scss'
import TimerControl from './timer-control.jsx'

class Timer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            timeLeft: '15:00',
        }
    }

    render() {
        return (
            <div>
                <TimerControl
                    labelID="break-label"
                    label="Break Length"
                    decrement="break-decrement"
                    lengthID="break-length"
                    length={this.state.breakLength}
                    increment="break-increment"
                />
                <TimerControl
                    labelID="session-label"
                    label="Session Length"
                    decrement="session-decrement"
                    lengthID="session-length"
                    length={this.state.sessionLength}
                    increment="session-increment"
                />
                <div id="timer-label">Session</div>
                <div id="time-left">{this.state.timeLeft}</div>
                <div id="start_stop" />
                <div id="reset" />
            </div>
        )
    }
}

export default Timer
