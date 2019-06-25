import React from 'react';
import EmailRedirect from '../EmailRedirect'
import { Login } from '../Login/Login'
import {withRouter} from 'react-router-dom';
import { withAPI } from '@winwin/api-firebase';

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
            if(this.state.loggedIn){
                return this.props.api.auth.currentUser.emailVerified ? <MyComponent {...this.props} />: <EmailRedirect {...this.props}/>
            }else{
                return (<><h1>Authorization Required</h1> <Login {...this.props} /></>)
            }
        }
    }
}

export default withAuth;
