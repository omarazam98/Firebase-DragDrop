import React from 'react';
import ReactDOM from 'react-dom';
import { Login } from '../../../components/Login/Login';
import { shallow, dive } from 'enzyme';
import requireAuth from '../../../components/Authorization/Authorization';

let wrapper;
let fakeAPI;

beforeAll(function (){
    fakeAPI = {
        auth: {
        }
    }
});

beforeEach(() => {
   // wrapper = dive(requireAuth(<h1>Test</h1>));
});

/*test('has a valid snapshot', () => {
    expect(wrapper).toMatchSnapshot();
});*/

test('Renders Component if logged in and verified', () => {
    //console.log(wrapper);
});

test('Renders log in page if not logged in', () => {

});
