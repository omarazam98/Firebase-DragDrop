import React from 'react';
import { withAPI } from '@winwin/api-firebase';
import withAuth from '../Authorization/Authorization';
import { Login } from '../Login/Login';
import EmailRedirect from '../EmailRedirect';

export const Dashboard = (props) => {
  return (
    <h1>Dashboard</h1>
  );
};

export default withAPI(withAuth(Dashboard, EmailRedirect, Login));
