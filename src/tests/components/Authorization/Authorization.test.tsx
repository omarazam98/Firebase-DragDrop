import React from 'react';
import ReactDOM from 'react-dom';
import { Login } from '../../../components/Login/Login';
import { shallow, dive } from 'enzyme';
import { withAuth } from '../../../components/Authorization/Authorization';

let wrapper;
let authedAPI;
let unauthedAPI;
let WrappedComponent;
let TestComponent;
let AuthReqComponent;

beforeAll(function (){
    authedAPI = {
        auth: {
            currentUser: true,
            onAuthStateChanged: jest.fn()
        },
    };
    unauthedAPI = {
        auth: {
            currentUser: false,
            onAuthStateChanged: jest.fn()
        },
    };
    TestComponent = () => {return (<h1> Test </h1>)};
    AuthReqComponent = () => {return (<h1>Authorization Required</h1>)};
});

beforeEach(() => {
    WrappedComponent = withAuth(TestComponent);
});

test('Renders Component if logged in and verified', () => {
    wrapper = shallow(<WrappedComponent api={authedAPI}/>);
    expect(wrapper.find(TestComponent).length).toBe(1);
});

test('Renders log in page if not logged in', () => {
    wrapper = shallow(<WrappedComponent api={unauthedAPI}/>);
    console.log(wrapper.find('h1').length);
});
