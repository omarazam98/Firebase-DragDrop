// places routes in this file
// each page/component should have a route
// e.g. winwinhomesharing.org/signup would have the route 'signup'
import SignUp from '../components/SignUp/SignUp'
import Login from '../components/Login/Login';
import Dashboard from '../components/Dashboard/Dashboard';
import EmailRedirect from '../components/EmailRedirect';

// to add a new page, simply add another element to the array below
// path is the path to the page
// exact is if the route is to the exact path
// name will be the label of the link
// component should be the page/component to be shown
// To add a componenet page to the routes table/nav bar, you should import
// it here at the top of the file and add it to the routes object:
/*** Example:
 * import App from '../../App'
 *
 * const ROUTES = [
 *  {
 *     path:'/',
 *     exact:true,
 *     name:'Home',
 *     component: App,
 *  },
/* Example routes with basic JSX elements as components
 *  {
 *     path:'/example1',
 *     name:'Primary',
 *     component: () => <div>Hello world!</div>,
 *  },
 *  {
 *     path:'/example2',
 *     exact:true,
 *     name:'Secondary',
 *     component: () => <div>Goodbye, world!</div>,
 *  },
 * ];
 *
 **/

/*These show up in the nav bar as links*/
export const NAVBAR_ROUTES = [
  {
    path: '/signup',
    exact: true,
    name: 'Sign Up',
    component: SignUp,
  },
  {
    path: '/login',
    exact: true,
    name: 'Log In',
    component: Login,
  },
  {
    path: '/dashboard',
    exact: true,
    name: 'Dashboard',
    component: Dashboard,
    authRequired: true,
  },
];

/*These are not rendered as links*/
export const ROUTES = [
  ...NAVBAR_ROUTES,
  {
    path: '/email',
    exact: true,
    name: 'Email Link',
    component: EmailRedirect,
  },
];
