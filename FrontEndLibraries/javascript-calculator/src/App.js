import React, { Component } from 'react'
import './App.scss'
import Buttons from './components/buttons'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="App">
                <div className="calculator">
                    <div id="display">asd</div>
                    <Buttons />
                </div>
            </div>
        )
    }
}

export default App
