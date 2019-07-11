import React from 'react';
import enzyme, { shallow, mount } from 'enzyme';
import { NavigationBar } from '../../../components/Navigation/NavigationBar';
import { NAVBAR_ROUTES } from '../../../constants/routes';
import { MenuItem } from '@material-ui/core';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const mockLocation = {
  pathname: './dashboard',
};

test('Navbar Renders correctly', () => {
  const wrapper = mount(
    <Router>
      <NavigationBar location={mockLocation} routesList={NAVBAR_ROUTES} />
    </Router>,
  );
  expect(wrapper).toMatchSnapshot();
  const expectedLength = NAVBAR_ROUTES.length;
  const menuItems = wrapper.find(MenuItem).length;
  expect(menuItems).toEqual(expectedLength);
});
