import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { PaymentCard } from '../components/PaymentCard';

const validAPI = {
  auth: {
    currentUser: () => {
      return {
        uid: '1111',
        displayName: 'The Weapon',
      };
    },
  },
  data: {
    users: {
      getPaymentMethods: () => {
        return Promise.resolve({ type: 'visa', number: 1010 });
      },
    },
  },
};
const noMethodsAPI = {
  auth: {
    currentUser: () => {
      return {
        uid: '1111',
        displayName: 'The Weapon',
      };
    },
  },
  data: {
    users: {
      getPaymentMethods: () => {
        return Promise.resolve();
      },
    },
  },
};
const noUserAPI = {
  auth: {
    currentUser: () => {
      return;
    },
  },
};

storiesOf('Payment Method', module)
  .add('with valid methods', () => (
    <PaymentCard api={ validAPI }/>
  ))
  .add('with no payment methods', () => (
  <PaymentCard api={ noMethodsAPI }/>
  )).add('with no user', () => (
  <PaymentCard api={ noUserAPI }/>
  ));
