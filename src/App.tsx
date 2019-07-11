import React, { Component } from 'react';
import './styles/App.css';
import { Provider } from 'react-redux';
import { store } from './store/createStore';
import Navigation from './components/Navigation';
import { APIProvider } from '@winwin/api-firebase';

const firebaseConfig = {
  apiKey: window['_env_'].REACT_APP_API_KEY,
  authDomain: window['_env_'].REACT_APP_AUTH_DOMAIN,
  databaseURL: window['_env_'].REACT_APP_DATABASE_URL,
  projectId: window['_env_'].REACT_APP_PROJECT_ID,
  storageBucket: window['_env_'].REACT_APP_STORAGE_BUCKET,
  messagingSenderId: window['_env_'].REACT_APP_MESSAGING_SENDER_ID,
  appId: window['_env_'].REACT_APP_APP_ID,
};

class App extends Component {

  render() {
    return (
      // The provider allows all of its descendant elements to access the redux store through
      // the connect function from react-redux
      <Provider store={store}>
        <APIProvider config={firebaseConfig}>
          <Navigation />
          { /*Put the main application in here. Probably the app router*/ }
        </APIProvider>
      </Provider>
    );
  }
}

export default App;
