import React from 'react';

import { storiesOf } from '@storybook/react';
import { withAuth } from '../components/Authorization/Authorization';

const authedAPI = {
  auth: {
    currentUser: () => { return { emailVerified: true }; },
    onAuthStateChanged: () => { },
  },
};
const unverifiedAPI = {
  auth: {
    currentUser: () => { return { emailVerified: false }; },
    onAuthStateChanged: () => { },
  },
};
const unauthedAPI = {
  auth: {
    currentUser: () => { },
    onAuthStateChanged: () => { },
  },
};

const AuthedComponent = () => { return (<h1> Logged in </h1>); };
const UnauthedComponent = () => { return (<h1> Logged Out </h1>); };
const UnverifiedComponent = () => { return (<h1> Email verification required </h1>); };
const WrappedComponent = withAuth(AuthedComponent, UnverifiedComponent, UnauthedComponent);

storiesOf('Resources/Wrappers/Authorization types', module)
  .add('Logged In, Verified', () => (
    <WrappedComponent api={authedAPI}/>
  ))
  .add('Logged in, unverified', () => (
    <WrappedComponent api={unverifiedAPI}/>
  )).add('Not logged in', () => (
  <WrappedComponent api={unauthedAPI}/>
  ));
