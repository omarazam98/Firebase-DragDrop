// Main routing component.
// If a new page is added, be sure to add the route to src/constants/routes
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Routes from '../../constants/routes';
import {withAPI} from '@winwin/api-firebase';
import SplitPane from 'react-split-pane';

interface NavState {
  loggedIn: boolean
}
export class Navigation extends React.Component<any, any>{
  _isMounted: boolean = false;

  constructor(props){
    super(props);
    this.state = {
      loggedIn: false
    };
    this.links = this.links.bind(this);
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

  // iterate over all routes from routes.ts
  // return a jsx expression containing links to all routes
  links() {
    // can't push JSX on an empty array, so init with a div
    const allLinks = [<div />];
    Routes.forEach((route:any) => (this.state.loggedIn || !route.authRequired) && allLinks.push(<Link to={route.path}>{route.name}<br /></Link>));
    return allLinks;
  }

  render(){
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
                {Routes.map((route: any, index) =>
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                )}
              </div>
            </SplitPane>
          </Router>
        </div>
    );
  }
}

export default withAPI(Navigation);
