import  { Navigation }from '../../components/Navigation';
import * as React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme/build';

const options = {
  lifecycleExperimental: false,
  disableLifecycleMethods: true,
};
const mockAPI = {
  auth: {
    firebaseAuth: {
      signOut: jest.fn(),
    }
  }
}
test('Render the navigation', () => {
  const test = <Navigation />;
  const wrapper = shallow(test, options);
  expect(wrapper).toMatchSnapshot();
});


test('Sign out button logs out user', () => {
  const test = <Navigation api={ mockAPI } />;
  const wrapper = shallow(test, options);
  console.log(wrapper.find('#signOut').simulate('click'));
});

