import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Upload } from '../components/Upload/Upload';

const mockAPI = {
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
        return Promise.resolve({type: 'visa', number: 1010});
      },
    },
  },
  storage : {
    storageRef: {
      get: () => {return {
      put: () => {return {
        on: action('Upload Begun')
      }}
      }}
    }
  }
};

storiesOf('Upload', module)
  .add('Basic Upload', () =>
    <Upload api={mockAPI}/>);
