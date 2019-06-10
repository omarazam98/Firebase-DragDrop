// Main routing component.
// If a new page is added, be sure to add the route to src/constants/routes
// Links to pages should be added here
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const NAVIGATION = () => (
  <div>
    <Router>
      {/* Link creates the object that a user can click on to go to another page */}
      <Link to={ROUTES.LANDING}>Home</Link>
      <hr />
      {/* Route indicates what component should be shown, based on what is linked */}
      {/*<Route exact path={ROUTES.LANDING} component={LandingPage doesn't exist yet} /> */}
    </Router>
  </div>
);

export default NAVIGATION;
