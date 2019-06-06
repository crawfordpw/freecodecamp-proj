import React, { Component } from 'react'
import '../App.css'
import Toolbar from './Toolbar.jsx'

class Editor extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <Toolbar text="Editor" />
                <textarea id="editor" />
            </div>
        )
    }
}

export default Editor
