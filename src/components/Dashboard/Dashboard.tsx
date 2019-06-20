import React from 'react';
import {withAPI} from '@winwin/api-firebase';
import requireAuth from '../Authorization/Authorization';

export function Dashboard(props) {
    if (props.api.auth.currentUser) {
        return (
            <div>Dashboard</div>
        );
    }else{
        return (
            <div>Not Authorized</div>
        )
    }
}

export default requireAuth(withAPI(Dashboard));
