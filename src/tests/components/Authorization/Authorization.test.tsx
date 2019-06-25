import React from 'react';
import ReactDOM from 'react-dom';
import { Login } from '../../../components/Login/Login';
import { EmailRedirect } from '../../../components/EmailRedirect';
import { shallow, dive } from 'enzyme';
import { withAuth } from '../../../components/Authorization/Authorization';

let wrapper;
let authedAPI;
let unverifiedAPI;
let unauthedAPI;
let WrappedComponent;
let TestComponent;

beforeAll(function (){
    authedAPI = {
        auth: {
            currentUser: {
                emailVerified: true,
            },
            onAuthStateChanged: jest.fn(),
        },
    };
    unverifiedAPI = {
        auth: {
            currentUser: {
                emailVerified: false,
            },
            onAuthStateChanged: jest.fn(),
        },
    };
    unauthedAPI = {
        auth: {
            currentUser: false,
            onAuthStateChanged: jest.fn()
        },
    };
    TestComponent = () => {return (<h1> Test </h1>)};
});

beforeEach(() => {
    WrappedComponent = withAuth(TestComponent);
});

test('Renders Component if logged in and verified', () => {
    wrapper = shallow(<WrappedComponent api={authedAPI}/>);
    expect(wrapper.find(TestComponent).length).toBe(1);
});

test('Renders email redirect if logged in and not email verified', () => {
    wrapper = shallow(<WrappedComponent api={unverifiedAPI}/> );
    expect(wrapper.find(EmailRedirect).length).toBe(1);
});

test('Renders log in page if not logged in', () => {
    wrapper = shallow(<WrappedComponent api={unauthedAPI}/>);
    expect(wrapper.find(Login).length).toBe(1);
});
