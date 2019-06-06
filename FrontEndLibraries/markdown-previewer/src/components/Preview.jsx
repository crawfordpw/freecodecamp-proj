import React, { Component } from 'react'
import '../App.css'
import Toolbar from './Toolbar.jsx'

class Preview extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <Toolbar text="Preview" />
            </div>
        )
    }
}

export default Preview
