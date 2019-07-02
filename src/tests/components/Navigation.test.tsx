import { Navigation } from '../../components/Navigation';
import * as React from 'react';
import { shallow, render, mount } from 'enzyme';
import { Link } from 'react-router-dom';
import { NAVBAR_ROUTES } from '../../constants/routes';

const options = {
  lifecycleExperimental: false,
  disableLifecycleMethods: true,
};

const authedLinks = NAVBAR_ROUTES.filter(route => route.authRequired);

const mockAPI = {
  auth: {
    signOut: jest.fn(),
    currentUser: jest.fn(),
  }
};

test('Render the navigation unauthed', () => {
  const test = <Navigation api={ mockAPI } />;
  const wrapper = shallow(test, options);
  expect(wrapper).toMatchSnapshot();
});

test('Render the navigation authed', () => {
  const test = <Navigation api={ mockAPI } />;
  const wrapper = shallow(test, options);
  wrapper.setState(() => {
    return {
      loggedIn: true,
      emailVerified: true,
    }
  });
  expect(wrapper).toMatchSnapshot();
});

test('Sign out button calls sign out', () => {
  const test = <Navigation api={ mockAPI } />;
  const wrapper = shallow(test, options);
  wrapper.find('#signOut').simulate('click');
  expect(mockAPI.auth.signOut).toHaveBeenCalled();
});

test('Only non auth required links render when not logged in', () => {
  const test = <Navigation api={ mockAPI } />;
  const wrapper = shallow(test, options);
  expect(wrapper.find(Link).length).toBe(NAVBAR_ROUTES.length - authedLinks.length);
});

test('All links render when logged in and verified', () => {
  const test = <Navigation api={ mockAPI } />;
  const wrapper = shallow(test, options);
  wrapper.setState({loggedIn: true, emailVerified: true})
  expect(wrapper.find(Link).length).toBe(NAVBAR_ROUTES.length);
});
