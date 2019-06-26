import React from 'react';
import ReactDOM from 'react-dom';
import { Login } from '../../../components/Login/Login';
import { shallow } from 'enzyme';

let wrapper;
let fakeEvent;
let historyMock;
let fakeAPI;
let testUsers;

beforeAll(function (){
    testUsers = {
        verified: {
            email: 'verifiedemail@test.com',
            password: 'verifiedPW'
        },
        unverified: {
            email: 'unverifiedemail@test.com',
            password: 'unverifiedPW'
        },
        invalid: {
            email: 'invalidemail@test.com',
            password: 'invalidPW'
        }
    }

    fakeEvent = { preventDefault: () => {} };
    historyMock = { push: jest.fn() };
    fakeAPI = {
        auth: {
            login: {
                setPersistence: jest.fn().mockResolvedValue(undefined),
                signIn: (email, password) => {
                    return new Promise((resolve, reject) => {
                        if (email === '' || password === '') {
                            reject('Empty fields');
                        }
                        if (email !== testUsers.verified.email && email !== testUsers.unverified.email){
                            reject('No registered user with that email')
                        }else {
                            if(email === testUsers.verified.email && password !== testUsers.verified.password){
                                reject("Wrong password")
                            }
                            const userCredential = {
                                user: {
                                    name: 'sample user',
                                    emailVerified: email === testUsers.verified.email,
                                }
                            }
                            resolve(userCredential);
                        }
                    });
                },
            },
            signOut: jest.fn(),
        }
    };
})

beforeEach(() => {
    wrapper = shallow(<Login />);
});

test('has a valid snapshot', () => {
    expect(wrapper).toMatchSnapshot();
});

test('redirects to dashboard after submit if email verified', () => {
    const historyWrapper = shallow(<Login history={historyMock} api={fakeAPI}/>)
    historyWrapper.setState({email: testUsers.verified.email, password: testUsers.verified.password});
    historyWrapper.instance().handleSubmit(fakeEvent).then(()=>{
        expect(historyMock.push.mock.calls[0]).toEqual([ '/dashboard' ]);
    })
});

test('redirects to email verify after submit if email not verified', () => {
    const historyMock = { push: jest.fn() };
    const historyWrapper = shallow(<Login history={historyMock} api={fakeAPI}/>)
    historyWrapper.setState({email: testUsers.unverified.email, password: testUsers.unverified.password});
    historyWrapper.instance().handleSubmit(fakeEvent).then(()=>{
        expect(historyMock.push.mock.calls[0]).toEqual([ '/email' ]);
    })
});

test('failed log in with empty fields', (done) => {
    const apiWrapper = shallow(<Login api={fakeAPI}/>);
    jest.spyOn(apiWrapper.instance(), 'handleSubmit');
    apiWrapper.instance().handleSubmit(fakeEvent).then(() => {
        expect(apiWrapper.state('error')).toBe('Empty fields');
        done();
    });
});

test('failed log in with non registered email', (done) => {
    const apiWrapper = shallow(<Login api={fakeAPI}/>);
    jest.spyOn(apiWrapper.instance(), 'handleSubmit');
    apiWrapper.setState({email: testUsers.invalid.email, password: testUsers.invalid.password});
    apiWrapper.instance().handleSubmit(fakeEvent).then(() => {
        expect(apiWrapper.state('error')).toBe('No registered user with that email');
        done();
    });
});

test('failed log in with bad password', (done) => {
    const apiWrapper = shallow(<Login api={fakeAPI}/>);
    jest.spyOn(apiWrapper.instance(), 'handleSubmit');
    apiWrapper.setState({email: testUsers.verified.email, password: 'incorrectpassword'});
    apiWrapper.instance().handleSubmit(fakeEvent).then(() => {
        expect(apiWrapper.state('error')).toBe('Wrong password');
        done();
    });
});
