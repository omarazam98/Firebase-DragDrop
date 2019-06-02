import React, { Component } from 'react';
const logoSvg = require('./logo.svg');
import './styles/App.css';

class App extends Component {
  state = {
    data: null,
  };
  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
        .then(res => this.setState({data: res.express}))
        .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/winwin_homesharing');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logoSvg} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p className="App-intro">{this.state.data}</p>
      </div>
    );
  }
}

export default App;
