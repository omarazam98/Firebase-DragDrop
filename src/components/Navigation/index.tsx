// Main routing component.
// If a new page is added, be sure to add the route to src/constants/routes
import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {ROUTES, NAVBAR_ROUTES} from '../../constants/routes';
import SplitPane from 'react-split-pane';
import {withAPI} from '@winwin/api-firebase';

interface NavState {
  loggedIn: boolean;
  emailVerified: boolean;
}

export class Navigation extends React.Component<any, any> {
  _isMounted: boolean = false;

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      emailVerified: false,
    };
    this.links = this.links.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.api.auth.onAuthStateChanged((user) => {
      if (this._isMounted) {
        this.setState(() => {
          return {
            loggedIn: user ? true : false,
            emailVerified: (user && user.emailVerified) ? true: false
          }
        })
      }
    });
  }


  componentWillUnmount() {
    this._isMounted = false;
  }

  links() {
    // can't push JSX on an empty array, so init with a div
    const allLinks = [<div/>];
    NAVBAR_ROUTES.forEach((route: any) => ((this.state.loggedIn && this.state.emailVerified) || !route.authRequired) && allLinks.push(
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
              <button id='signOut' onClick={() => {this.props.api.auth.signOut();}}>Log Out</button>
            </div>
            {/* Route indicates what component should be shown, based on what is linked */}
            {/* Map routes from links to their components */}
            <div>
              {ROUTES.map((route: any, index) => (
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
