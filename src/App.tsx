import React, { Component } from 'react';
import './styles/App.css';
import { Provider } from 'react-redux';
import { store } from './store/createStore';
import Navigation from './components/Navigation';

class App extends Component {

  render() {
    return (
      // The provider allows all of its descendant elements to access the redux store through
      // the connect function from react-redux
      <Provider store={store}>
        <Navigation />
        { /*Put the main application in here. Probably the app router*/ }
      </Provider>
    );
  }
}

export default App;
