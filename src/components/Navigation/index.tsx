// Main routing component.
// If a new page is added, be sure to add the route to src/constants/routes
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ROUTES, NAVBAR_ROUTES, RouteType } from '../../constants/routes';
import { withAPI } from '@winwin/api-firebase';
import { Paper } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';
import NavigationBar from './NavigationBar';

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    position: 'fixed',
    marginRight: theme.spacing(5),
  },
  content: {
    // currently nav bar is at width of 14
    marginLeft: theme.spacing(16),
    overflow: 'auto',
  },
});

interface NavState {
  loggedIn: boolean;
  emailVerified: boolean;
  isMounted: boolean;
}
interface NavProps {
  api: any;
  classes: any;
}
export class Navigation extends React.Component<NavProps, NavState> {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      emailVerified: false,
      isMounted: false,
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
        this.setState((prevState) => {
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

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <Router>
          {/* Link creates the object that a user can click on to go to another page */}
          <div className={classes.root}>
            <Paper>
              <NavigationBar routesList={NAVBAR_ROUTES}/>
              <button id="signOut"
                      onClick = {() => { this.props.api.auth.signOut(); }}>Log Out</button>
            </Paper>
          </div>
          {/* Route indicates what component should be shown, based on what is linked */}
          {/* Map routes from links to their components */}
          <div className={classes.content}>
            {ROUTES.map((route: RouteType, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
          </div>
        </Router>
      </div>
    );
  }
}

// @ts-ignore
export default withAPI(withStyles(styles)(Navigation));
