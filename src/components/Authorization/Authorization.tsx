import React from 'react';
import EmailRedirect from '../EmailRedirect';
import { Login } from '../Login/Login';

interface AuthState {
  loggedIn: boolean;
}

export const withAuth = (MyComponent) => {
  return class AuthenticatedComponent extends React.Component<any, AuthState> {
    isMounted: boolean = false;

    constructor(props) {
      super(props);
      this.state = { loggedIn: props.api.auth.currentUser() };
    }

    componentDidMount() {
      this.isMounted = true;
      this.props.api.auth.onAuthStateChanged((user) => {
        if (this.isMounted) {
          this.setState({ loggedIn: user ? true : false });
        }
      });
    }

    componentWillUnmount() {
      this.isMounted = false;
    }

    render() {
      if (this.state.loggedIn) {
        return (this.props.api.auth.currentUser() &&
          this.props.api.auth.currentUser().emailVerified) ?
          <MyComponent {...this.props} /> : <EmailRedirect {...this.props} />;
      }
      return (<><h1>Authorization Required</h1> <Login {...this.props} /></>);

    }
  };
};

export default withAuth;
