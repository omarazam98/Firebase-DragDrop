import React from 'react';
import ReactDOM from 'react-dom';
import { SignUp } from '../../../components/SignUp/SignUp';
import {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

let wrapper;

const fakeAPI = {
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
};

const mockState = {
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
    },
};

beforeEach(() => {
    wrapper = shallow(
        <SignUp/>);
});

test('has a valid snapshot', () => {
    expect(wrapper).toMatchSnapshot();
});

test('redirects to login after submit', () => {
    const fakeEvent = { preventDefault: () => {} };
    const historyMock = { push: jest.fn() };
    const firebaseMock = { }
    const historyWrapper = shallow(<SignUp history={historyMock} api={fakeAPI}/>)
    historyWrapper.setState(mockState);
    historyWrapper.instance().handleSubmit(fakeEvent).then(()=>{
        expect(historyMock.push.mock.calls[0]).toEqual([ '/email' ]);
    })
});

