import React from 'react';
import { withRouter } from 'react-router';
import { withAPI } from '@winwin/api-firebase';
import Dashboard from '../Dashboard/Dashboard';

export class AuthenticatedComponent extends React.Component<any, any> {

/*    componentWillMount() {
        this.checkAuth();
    }*/

 /*   checkAuth() {
        if ( ! this.props.api.auth.currentUser) {
            const location = this.props.location;
            const redirect = location.pathname + location.search;

            this.props.router.push(`/login?redirect=${redirect}`);
        }
    }*/

    render() {
        return this.props.api.auth.currentUser
            ? <Dashboard {...this.props} /> : <h1> Need to Log in </h1> //<LogIn/>
    }

}

export default withAPI(AuthenticatedComponent);
