import React, { Component } from 'react';
import './App.scss';
import Buttons from './components/buttons';

/* eslint no-eval: 0 */
let operatorRegex = /[x/+-]/;
let numberRegex = /[0-9]|\./;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { display: '0', formula: '', prevVal: 'a', equals: false };
	}

	clear() {
		this.setState({
			display: '0',
			formula: '',
			prevVal: 'a',
			equals: false
		});
	}

	handleEquals() {
		let formula = this.state.formula.replace('x', '*');
		if (operatorRegex.test(this.state.prevVal)) {
			formula = this.state.formula.substring(
				0,
				this.state.formula.length - 1
			);
		}

		let newDisplay = eval(formula);
		if (this.state.formula === '') {
			this.setState({ display: '0', formula: '' });
		} else {
			this.setState({
				display: newDisplay,
				formula: formula,
				prevVal: 'a',
				equals: true
			});
		}
	}

	handleStart(val) {
		if (val === '+' || val === '-') {
			if (!operatorRegex.test(this.state.prevVal)) {
				this.setState({
					display: val,
					prevVal: val,
					formula: val
				});
			}
		}
	}

	handleClick = e => {
		let val = e.target.value;

		// clear button is clicked
		if (val === 'AC') {
			this.clear();
		}
		// equals was pressed
		else if (val === '=') {
			this.handleEquals();
		}
		// starting a formula with an operator
		else if (this.state.formula === '' && operatorRegex.test(val)) {
			this.handleStart(val);
		}
		// Use an Operator with previous answer
		else if (operatorRegex.test(val) && this.state.equals) {
			let display = this.state.display;
			this.setState({
				formula: display + val,
				display: val,
				prevVal: val,
				equals: false
			});
		}
		// If Equals was pressed, and the next button is a number
		else if (this.state.equals) {
			if (/\./.test(val) && !/[0-9]/.test(this.state.prevVal)) {
				this.setState({
					formula: '0' + val,
					display: val,
					prevVal: val,
					equals: false
				});
			} else {
				this.setState({
					formula: val,
					display: val,
					prevVal: val,
					equals: false
				});
			}
		}
		// multiple operators in sucession
		else if (
			operatorRegex.test(this.state.prevVal) &&
			operatorRegex.test(val)
		) {
			// replace the operator if another is clicked right after. Don't replace at
			// the beginning if its 'x' or '/'
			if (
				(this.state.formula.length === 1 &&
					!(val === 'x' || val === '/')) ||
				this.state.formula.length > 1
			) {
				this.setState({
					display: val,
					prevVal: val,
					formula: this.state.formula.replace(/.$/, val)
				});
			}
		}
		// don't do anything if 0 is pressed when only 0 is on display
		else if (!(this.state.formula === '' && val === '0')) {
			// if there is a decimal already in the formula, skip
			if (!/\./.test(this.state.display) || !/\./.test(val)) {
				// if a number or '.' pressed and only 0 is not showing and previous value pressed was
				// a number or '.'
				if (
					numberRegex.test(val) &&
					!/^0/.test(this.state.display) &&
					numberRegex.test(this.state.prevVal)
				) {
					this.setState({
						formula: this.state.formula + val,
						display: this.state.display + val,
						prevVal: val
					});

					// add a 0 before a decimal
				} else if (
					/\./.test(val) &&
					!/[0-9]/.test(this.state.prevVal)
				) {
					this.setState({
						formula: this.state.formula + '0' + val,
						display: this.state.display + val,
						prevVal: val
					});
				} else {
					this.setState({
						formula: this.state.formula + val,
						display: val,
						prevVal: val
					});
				}
			}
		}
	};

	render() {
		return (
			<div className="App">
				<div className="calculator">
					<div id="formula">{this.state.formula}=</div>
					<div id="display">{this.state.display}</div>
					<Buttons handleClick={this.handleClick} />
				</div>
			</div>
		);
	}
}

export default App;
