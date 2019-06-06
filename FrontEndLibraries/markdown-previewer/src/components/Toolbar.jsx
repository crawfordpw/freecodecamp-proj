import React, { Component } from 'react'
import '../App.css'

class Toolbar extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <span>{this.props.text}</span>
                <i className="fas fa-expand" />
            </div>
        )
    }
}

export default Toolbar
