import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, dive } from 'enzyme';
import { withAuth } from '../../../components/Authorization/Authorization';

let wrapper;
let authedAPI;
let unverifiedAPI;
let unauthedAPI;
let WrappedComponent;
let AuthedComponent;
let UnauthedComponent;
let UnverifiedComponent;
let currentUserVerified;
let currentUserUnverified;

beforeAll(() => {
  currentUserVerified = jest.fn().mockReturnValue({ emailVerified: true });
  currentUserUnverified = jest.fn().mockReturnValue({ emailVerified: false });
  authedAPI = {
    auth: {
      currentUser: currentUserVerified,
      onAuthStateChanged: jest.fn(),
    },
  };
  unverifiedAPI = {
    auth: {
      currentUser: currentUserUnverified,
      onAuthStateChanged: jest.fn(),
    },
  };
  unauthedAPI = {
    auth: {
      currentUser: jest.fn(),
      onAuthStateChanged: jest.fn(),
    },
  };
  AuthedComponent = () => { return (<h1> Logged in </h1>); };
  UnauthedComponent = () => { return (<h1> Logged Out </h1>); };
  UnverifiedComponent = () => { return (<h1> Email verification required </h1>); };
});

beforeEach(() => {
  WrappedComponent = withAuth(AuthedComponent, UnverifiedComponent, UnauthedComponent);
});

test('Renders Component if logged in and verified', () => {
  wrapper = shallow(<WrappedComponent api={authedAPI}/>);
  expect(wrapper.find(AuthedComponent).length).toBe(1);
});

test('Renders email redirect if logged in and not email verified', () => {
  wrapper = shallow(<WrappedComponent api={unverifiedAPI}/>);
  expect(wrapper.find(UnverifiedComponent).length).toBe(1);
});

test('Renders log in page if not logged in', () => {
  wrapper = shallow(<WrappedComponent api={unauthedAPI}/>);
  expect(wrapper.find(UnauthedComponent).length).toBe(1);
});
