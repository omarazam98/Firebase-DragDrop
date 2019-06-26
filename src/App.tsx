import React, {Component} from 'react';
import './styles/App.css';
import {Provider} from 'react-redux';
import {store} from './store/createStore';
import Navigation from './components/Navigation';
<<<<<<< refs/remotes/origin/integration
import { APIProvider } from '@winwin/api-firebase';

const firebaseConfig = {
  apiKey: window['_env_'].REACT_APP_API_KEY,
  authDomain: window['_env_'].REACT_APP_AUTH_DOMAIN,
  databaseURL: window['_env_'].REACT_APP_DATABASE_URL,
  projectId: window['_env_'].REACT_APP_PROJECT_ID,
  storageBucket: window['_env_'].REACT_APP_STORAGE_BUCKET,
  messagingSenderId: window['_env_'].REACT_APP_MESSAGING_SENDER_ID,
  appId: window['_env_'].REACT_APP_APP_ID,
=======
import {APIProvider} from '@winwin/api-firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
>>>>>>> Added calls to API for payment info
};

class App extends Component {

  render() {
    return (
      // The provider allows all of its descendant elements to access the redux store through
      // the connect function from react-redux
<<<<<<< refs/remotes/origin/integration
      <Provider store={store}>
        <APIProvider config={firebaseConfig}>
          <Navigation />
          { /*Put the main application in here. Probably the app router*/ }
        </APIProvider>
      </Provider>
=======
      <APIProvider config={firebaseConfig}>
        <Provider store={store}>
          <Navigation/>
          { /*Put the main application in here. Probably the app router*/}
        </Provider>
      </APIProvider>
>>>>>>> Added calls to API for payment info
    );
  }
}

export default App;
