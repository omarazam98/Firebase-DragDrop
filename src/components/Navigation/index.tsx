// Main routing component.
// If a new page is added, be sure to add the route to src/constants/routes
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ROUTES, NAVBAR_ROUTES, RouteType } from '../../constants/routes';
import SplitPane from 'react-split-pane';
import { withAPI } from '@winwin/api-firebase';

interface NavState {
  loggedIn: boolean;
  emailVerified: boolean;
  isMounted: boolean;
}
interface NavProps {
  api: any;
}
export class Navigation extends React.Component<NavProps, NavState> {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      emailVerified: false,
      isMounted: false,
    };
    this.links = this.links.bind(this);
  }

  componentDidMount() {
    this.setState(() => {
      return {
        isMounted: true,
      };
    });
    this.props.api.auth.onAuthStateChanged((user) => {
      if (this.state.isMounted) {
        this.setState(() => {
          return {
            loggedIn: user ? true : false,
            emailVerified: (user && user.emailVerified) ? true : false,
          };
        });
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

  links() {
    // can't push JSX on an empty array, so init with a div
    const allLinks = [<div/>];
    NAVBAR_ROUTES.forEach((route: any) =>
      ((this.state.loggedIn && this.state.emailVerified) || !route.authRequired) && allLinks.push(
      <Link to={route.path}>{route.name}<br/></Link>));
    return allLinks;
  }

  render() {
    return (
      <div>
        <Router>
          <SplitPane split="vertical" minSize={50} defaultSize={100}>
            {/* Link creates the object that a user can click on to go to another page */}
            <div>
              {this.links()}
              {this.state.loggedIn && <button id="signOut" onClick={() => {
                this.props.api.auth.signOut();
              }}>Log Out</button> }
            </div>
            {/* Route indicates what component should be shown, based on what is linked */}
            {/* Map routes from links to their components */}
            <div>
              {ROUTES.map((route: RouteType, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ))}
            </div>
          </SplitPane>
        </Router>
      </div>
    );
  }
}

export default withAPI(Navigation);
