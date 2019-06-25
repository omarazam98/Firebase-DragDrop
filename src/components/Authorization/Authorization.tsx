import React from 'react';
import { withRouter } from 'react-router';

interface AuthState {
    loggedIn: boolean;
}
export function withAuth(MyComponent) {
    return class AuthenticatedComponent extends React.Component<any, AuthState> {
        _isMounted: boolean = false;
        constructor(props) {
            super(props);
            this.state = {loggedIn: props.api.auth.currentUser};
        }

        componentDidMount() {
            this._isMounted = true;
            this.props.api.auth.onAuthStateChanged((user) => {
                if(this._isMounted) {
                    this.setState({loggedIn: user ? true : false});
                }
            });
        }

        componentWillUnmount(){
            this._isMounted = false;
        }

        render() {
            return this.state.loggedIn
                ? <MyComponent {...this.props} />: <h1>Authorization Required</h1>
        }
    }
}

export default withAuth;
