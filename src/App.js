import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Router from 'react-router-dom';
import * as ROUTES from './constants/routes';
import {Upload} from './components/Upload/Upload';

class App extends Component {
  state = {
    data: null
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
  };

  render() {
    return (
      <div className="App">
        <Router.BrowserRouter>
          <Router.Route path={ROUTES.UPLOAD} component={Upload} />

        </Router.BrowserRouter>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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
