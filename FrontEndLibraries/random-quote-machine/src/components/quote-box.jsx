import React, { Component } from 'react'
import '../App.css'

const styles = {
    transition: 'opacity 1s ease-in',
}

// this color array is taken directly from the freecodecamp sample random quote machine
const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857',
]

class QuoteBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            author: '',
            quote: '',
            quotesArr: null,
            lastIndex: 0,
            lastColor: 0,
            opacity: 1,
            bgColor: null,
        }
    }

    componentDidMount() {
        fetch(
            'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
            {
                headers: {
                    Accept: 'application/json',
                },
            }
        )
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    quotesArr: responseData.quotes,
                    author: responseData.quotes[0].author,
                    quote: responseData.quotes[0].quote,
                    bgColor: colors[0],
                })
            })
            .catch(error => this.setState({ error }))
    }

    generateQuote = () => {
        let index = Math.floor(Math.random() * this.state.quotesArr.length)
        let color = Math.floor(Math.random() * colors.length)

        let newRandom =
            this.state.lastIndex === index || this.state.lastColor === color
        while (newRandom) {
            index = Math.floor(Math.random() * this.state.quotesArr.length)
            color = Math.floor(Math.random() * colors.length)
            newRandom =
                this.state.lastIndex === index || this.state.lastColor === color
        }

        this.setState({ opacity: 0, bgColor: colors[color] })
        setTimeout(
            function() {
                this.setState({
                    opacity: 1,
                    author: this.state.quotesArr[index].author,
                    quote: this.state.quotesArr[index].quote,
                    lastIndex: index,
                    lastColor: color,
                })
            }.bind(this),
            1000
        )
    }

    shareOnTwitter = () => {
        // found on https://gist.github.com/McKinneyDigital/2884508#file-share-twitter-js
        var url = 'twitter.com'
        let text = `"${this.state.quote}" - ${this.state.author}`
        window.open(
            'http://twitter.com/intent/tweet?url=' +
                encodeURIComponent(url) +
                '&text=' +
                encodeURIComponent(text),
            '',
            'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0'
        )
    }

    render() {
        return (
            <div
                id="quote-box"
                style={this.props.style}
                className={this.props.className}
            >
                <style>
                    {`:root{ 
					--main-bg-color: ${this.state.bgColor}; 
					--main-text-color: ${this.state.bgColor};}
					`}
                </style>
                <p
                    id="text"
                    className="quote-size"
                    style={{ ...styles, opacity: this.state.opacity }}
                >
                    {this.state.quote}
                </p>
                <p
                    id="author"
                    className="text-right"
                    style={{ ...styles, opacity: this.state.opacity }}
                >
                    - {this.state.author}
                </p>
                <div className="buttons">
                    <button
                        id="tweet-quote"
                        className="mt-3 btn btn-primary btn-md"
                        onClick={this.shareOnTwitter}
                    >
                        <i className="fab fa-twitter" />
                    </button>
                    <button
                        id="new-quote"
                        className="mt-3 btn btn-primary btn-md"
                        onClick={this.generateQuote}
                    >
                        New Quote
                    </button>
                </div>
            </div>
        )
    }
}

export default QuoteBox
