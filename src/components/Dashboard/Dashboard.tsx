import React from 'react';
import { withAPI } from '@winwin/api-firebase';
import withAuth from '../Authorization/Authorization';

export function Dashboard(props) {
  return (
    <h1>Dashboard</h1>
  );
}

export default withAPI(withAuth(Dashboard));
