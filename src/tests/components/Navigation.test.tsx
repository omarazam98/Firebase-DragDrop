import { Navigation } from '../../components/Navigation';
import * as React from 'react';
import { shallow, render, mount } from 'enzyme';
import { Link } from 'react-router-dom';
import { NAVBAR_ROUTES } from '../../constants/routes';

const options = {
  lifecycleExperimental: false,
  disableLifecycleMethods: true,
};

const authedLinks = NAVBAR_ROUTES.filter(route => !route.authRequired);

const mockAPI = {
  auth: {
      signOut: jest.fn(),
  }
};

test('Render the navigation', () => {
  const test = <Navigation />;
  const wrapper = shallow(test, options);
  expect(wrapper).toMatchSnapshot();
});

test('Sign out button calls sign out', () => {
  const test = <Navigation api={ mockAPI } />;
  const wrapper = shallow(test, options);
  wrapper.find('#signOut').simulate('click');
  expect(mockAPI.auth.signOut).toHaveBeenCalled();
});

test('Only non auth required links render when not logged in', () => {
  const test = <Navigation api={mockAPI} />;
  const wrapper = shallow(test, options);
  expect(wrapper.find(Link).length).toBe(authedLinks.length);
});

test('All links render when logged in', () => {
  const test = <Navigation api={mockAPI} />;
  const wrapper = shallow(test, options);
  wrapper.setState({loggedIn: true})
  expect(wrapper.find(Link).length).toBe(NAVBAR_ROUTES.length);
});
