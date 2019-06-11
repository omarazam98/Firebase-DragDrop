// Main routing component.
// If a new page is added, be sure to add the route to src/constants/routes
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Routes from '../../constants/routes';

function navigation(props) {
  return (
    <div>
      <Router>
        {/* Link creates the object that a user can click on to go to another page */}
        {links()}
        <hr/>
        {/* Route indicates what component should be shown, based on what is linked */}
        {/* Map routes from links to their components */}
        {Routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </Router>
    </div>
  );
}
// iterate over all routes from routes.ts
// return a jsx expression containing links to all routes
function links() {
  const allLinks = [<p>Links:</p>];
  Routes.forEach(route => allLinks.push(<Link to={route.path}>{route.name}</Link>, <br />));
  return allLinks;
}

export default navigation;
