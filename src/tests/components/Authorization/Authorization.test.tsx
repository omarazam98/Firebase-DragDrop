import React from 'react';
import ReactDOM from 'react-dom';
import { Login } from '../../../components/Login/Login';
import { EmailRedirect } from '../../../components/EmailRedirect';
import { shallow, dive } from 'enzyme';
import { withAuth } from '../../../components/Authorization/Authorization';

let wrapper;
let authedAPI;
let unverifiedAPI;
let unauthedAPI;
let WrappedComponent;
let TestComponent;
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
  TestComponent = () => { return (<h1> Test </h1>); };
});

beforeEach(() => {
  WrappedComponent = withAuth(TestComponent);
});

test('Renders Component if logged in and verified', () => {
  wrapper = shallow(<WrappedComponent api={authedAPI}/>);
  expect(wrapper.find(TestComponent).length).toBe(1);
});

test('Renders email redirect if logged in and not email verified', () => {
  wrapper = shallow(<WrappedComponent api={unverifiedAPI}/>);
  expect(wrapper.find(EmailRedirect).length).toBe(1);
});

test('Renders log in page if not logged in', () => {
  wrapper = shallow(<WrappedComponent api={unauthedAPI}/>);
  expect(wrapper.find(Login).length).toBe(1);
});
