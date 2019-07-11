import { PaymentCard, styles } from '../../../components/PaymentCard';
import * as React from 'react';
import { shallow, render, mount } from 'enzyme';

const mockAPI = {
  auth: {
    signOut: jest.fn(),
    currentUser: jest.fn(),
  },
};

const options = {
  lifecycleExperimental: false,
  disableLifecycleMethods: true,
};

test('Render the payment card', () => {
  const wrapper = shallow(<PaymentCard classes={styles} api={mockAPI}/>);
  expect(wrapper).toMatchSnapshot();
  console.log(wrapper.dive().debug())
});
