import React, {Component} from 'react';
import './styles/App.css';
import {Provider} from 'react-redux';
import {store} from './store/createStore';
import Navigation from './components/Navigation';
import {APIProvider} from '@winwin/api-firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

class App extends Component {

  render() {
    return (
      // The provider allows all of its descendant elements to access the redux store through
      // the connect function from react-redux
      <APIProvider config={firebaseConfig}>
        <Provider store={store}>
          <Navigation/>
          { /*Put the main application in here. Probably the app router*/}
        </Provider>
      </APIProvider>
    );
  }
}

export default App;
