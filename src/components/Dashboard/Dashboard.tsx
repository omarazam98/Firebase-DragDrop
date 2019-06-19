import React from 'react';
import {withAPI} from '@winwin/api-firebase';

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

export default withAPI(Dashboard);
