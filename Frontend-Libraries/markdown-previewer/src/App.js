import React, { Component } from "react";
import "./App.css";
import Editor from "./components/Editor.jsx";
import Preview from "./components/Preview.jsx";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: placeholder,
			editorMaximized: false,
			previewMaximized: false
		};
	}

	handleChange = e => {
		this.setState({
			text: e.target.value
		});
	};

	handleMax = window => {
		if (window === "editor") {
			this.setState({ editorMaximized: !this.state.editorMaximized });
		} else {
			this.setState({ previewMaximized: !this.state.previewMaximized });
		}
	};

	render() {
		const maxClasses = this.state.editorMaximized
			? ["col-12", "d-none", "fas fa-compress"]
			: this.state.previewMaximized
			? ["d-none", "col-12", "fas fa-compress"]
			: ["col-6", "col-6", "fas fa-expand"];

		return (
			<div className="App">
				<h1 className="h1-class">Markdown Previewer</h1>
				<div className="editor-preview">
					<div className={maxClasses[0]}>
						<Editor
							className="text-area"
							text={this.state.text}
							onChange={this.handleChange}
							onMax={() => this.handleMax("editor")}
							isMax={maxClasses[2]}
						/>
					</div>
					<div className={maxClasses[1]}>
						<Preview
							className="text-area"
							text={this.state.text}
							onMax={() => this.handleMax("preview")}
							isMax={maxClasses[2]}
						/>
					</div>
				</div>
			</div>
		);
	}
}

// this placeholder text taken directly from freecodecamp's sample
const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

export default App;
