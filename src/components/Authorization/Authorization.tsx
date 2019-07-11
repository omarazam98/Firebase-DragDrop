import React, { Fragment } from 'react';

interface AuthState {
  loggedIn: boolean;
  isMounted: boolean;
}
interface AuthProps {
  api: any;
}
export const withAuth = (Authed, EmailVerRequired, Unauthed) => {
  return class AuthenticatedComponent extends React.Component<AuthProps, AuthState> {

    constructor(props) {
      super(props);
      this.state = {
        loggedIn: props.api.auth.currentUser(),
        isMounted: true,
      };
    }

    componentDidMount() {
      this.setState(() => {
        return {
          isMounted: true,
        };
      });
      this.props.api.auth.onAuthStateChanged((user) => {
        if (this.state.isMounted) {
          this.setState({ loggedIn: user ? true : false });
        }
      });
    }

    componentWillUnmount() {
      this.setState(() => {
        return {
          isMounted: false,
        };
      });
    }

    render() {
      if (this.state.loggedIn) {
        return (this.props.api.auth.currentUser() &&
          this.props.api.auth.currentUser().emailVerified) ?
          <Authed {...this.props} /> : <EmailVerRequired {...this.props} />;
      }
      return (<Fragment><h1>Authorization Required</h1> <Unauthed {...this.props} /></Fragment>);
    }
  };
};

export default withAuth;
