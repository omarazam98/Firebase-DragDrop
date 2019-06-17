import Navigation from '../../components/Navigation';
import * as React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme/build';

const options = {
  lifecycleExperimental: false,
  disableLifecycleMethods: true,
};

test('Render the navigation', () => {
  const test = <Navigation />;
  const wrapper = shallow(test, options);
  expect(wrapper).toMatchSnapshot();
});
