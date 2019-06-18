import React from 'react';
import ReactDOM from 'react-dom';
import { SignUp } from '../../../components/SignUp/SignUp';
import { EmailRedirect } from '../../../components/SignUp/EmailRedirect';

import {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

let wrapper;
let historyMock;
let mockEvent;
let mockAPI;
let mockValidState;

beforeAll(() => {
    mockEvent = { preventDefault: () => {} };
    mockValidState = {
        name: {
            value: 'Julia St-Jean',
            touched: true,
            errors: '',
        },
        phoneNumber: {
            value: '613-123-4567',
            touched: true,
            errors: '',
        },
        class: {
            value: 'student',
            touched: true,
            errors: '',
        },
        email: {
            value: 'sample@email.com',
            touched: true,
            errors: '',
        },
        passwordOne: {
            value: 'aaaaaa',
            touched: true,
            errors: '',
        },
        passwordTwo: {
            value: 'aaaaaa',
            touched: true,
            errors: '',
        }
    };
    mockAPI = {
        auth: {
            signup: {
                createUserWithEmailAndPassword: () => {
                    return new Promise((resolve, reject) => {
                        const userCredential = {
                            user: {
                                name: 'sample user',
                                sendEmailVerification: jest.fn(),
                            }
                        }
                        resolve(userCredential);
                    });
                }
            }
        }
    }
});

beforeEach(() => {
    historyMock = { push: jest.fn() };
    wrapper = shallow(
        <SignUp/>);
});

test('has a valid snapshot', () => {
    expect(wrapper).toMatchSnapshot();
});

test('redirects to email verification reminder page after submit', () => {
    const historyWrapper = shallow(<SignUp history={historyMock} api={mockAPI}/>)
    historyWrapper.setState(mockValidState);
    historyWrapper.instance().handleSubmit(mockEvent).then(()=>{
        expect(historyMock.push.mock.calls[0]).toEqual([ '/email' ]);
    })
});

test('Empty input values does not submit', () => {
    const apiWrapper = shallow(<SignUp api={mockAPI}/>)
    apiWrapper.instance().handleSubmit(mockEvent);
    expect(apiWrapper.state('formError').message).toBe('Invalid form inputs')
});
test('Email Redirect has a valid snapshot', () => {
    const emailWrapper = shallow(<EmailRedirect/>);
    expect(emailWrapper).toMatchSnapshot();
});

test('Email Redirect redirects to login after button click', () => {
    const emailWrapper = shallow(<EmailRedirect history={historyMock}/>);
    emailWrapper.find('button').simulate('click');
    expect(historyMock.push.mock.calls[0]).toEqual([ '/login' ]);
})
