import React from 'react';
import { withRouter } from 'react-router';
import { withAPI } from '@winwin/api-firebase';

interface AuthState {
    loggedIn: boolean;
}
export default function requireAuth(MyComponent) {
    class AuthenticatedComponent extends React.Component<any, AuthState> {
        constructor(props) {
            super(props);
            this.state = {loggedIn: props.api.auth.currentUser()};
        };

        componentDidMount() {
            this.props.api.auth.firebaseAuth.onAuthStateChanged((user) => {
                this.setState({loggedIn: user ? true : false});
            });
        }

        render() {
            console.log(this.state.loggedIn);
            return this.state.loggedIn
                ? <MyComponent {...this.props} />: <h1> Need to Log in </h1> //<LogIn/>
        };
    }
    return withAPI(AuthenticatedComponent);
}
