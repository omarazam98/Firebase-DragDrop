import * as React from 'react';
import { PaymentCard, styles } from '../../../components/PaymentCard';
import { shallow } from 'enzyme';

const mockState = {
  paymentMethod: {
    type: 'visa',
    number: 1010,
  },
  user: {
    uid: '1111',
    displayName: 'The Weapon',
  },
};

const mockAPI = {
  auth: {
    currentUser: () => {
      jest.fn();
    },
  },
};

test('Render the payment card with no data', () => {
  const wrapper = shallow(<PaymentCard classes={styles} api={mockAPI}/>);
  expect(wrapper).toMatchSnapshot();
});

test('Render full payment card with data', () => {
  const wrapper = shallow(<PaymentCard classes={styles} api={mockAPI}/>);
  wrapper.setState(mockState);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('#userName').text())
    .toBe(mockState.user.displayName);
  expect(wrapper.find('#payment').text())
    .toBe(`XXXX XXXX XXXX ${mockState.paymentMethod.number}`);
});
