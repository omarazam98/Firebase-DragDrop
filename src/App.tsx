import React, { Component } from 'react';
const logoSvg = require('./logo.svg');
import './styles/App.css';
import { Provider } from 'react-redux';
import { store } from './store/createStore';

class App extends Component {

  render() {
    return (
      // The provider allows all of its decendant elements to access the redux store through
      // the connect function from react-redux
      <Provider store={store}>
        { /*Put the main application in here. Probably the app router*/ }
      </Provider>
    );
  }
}

export default App;
