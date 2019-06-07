import React, { Component } from 'react'
import './../App.scss'

class Buttons extends Component {
    render() {
        return (
            <div className="calc-buttons">
                <button id="divide" value="/" onClick={this.props.button}>
                    /
                </button>
                <button id="multiply" value="x" onClick={this.props.button}>
                    x
                </button>
                <button id="subtract" value="-" onClick={this.props.button}>
                    -
                </button>
                <button id="add" value="+" onClick={this.props.button}>
                    +
                </button>
                <button id="seven" value="7" onClick={this.props.button}>
                    7
                </button>
                <button id="eight" value="8" onClick={this.props.button}>
                    8
                </button>
                <button id="nine" value="9" onClick={this.props.button}>
                    9
                </button>
                <button
                    id="clear"
                    value="AC"
                    onClick={this.props.button}
                    className="button-lg-height"
                >
                    AC
                </button>
                <button id="four" value="4" onClick={this.props.button}>
                    4
                </button>
                <button id="five" value="5" onClick={this.props.button}>
                    5
                </button>
                <button id="six" value="6" onClick={this.props.button}>
                    6
                </button>
                <button id="one" value="1" onClick={this.props.button}>
                    1
                </button>
                <button id="two" value="2" onClick={this.props.button}>
                    2
                </button>
                <button id="three" value="3" onClick={this.props.button}>
                    3
                </button>
                <button
                    id="equals"
                    value="="
                    onClick={this.props.button}
                    className="button-lg-height"
                >
                    =
                </button>
                <button
                    id="zero"
                    value="0"
                    onClick={this.props.button}
                    className="button-lg-width"
                >
                    0
                </button>
                <button id="decimal" value="." onClick={this.props.button}>
                    .
                </button>
            </div>
        )
    }
}

export default Buttons
