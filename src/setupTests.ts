import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';
const dotenv = require('dotenv');

dotenv.config();
configure({adapter: new Adapter()});
