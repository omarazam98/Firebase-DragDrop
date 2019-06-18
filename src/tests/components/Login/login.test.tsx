import React from 'react';
import ReactDOM from 'react-dom';
import { Login } from '../../../components/Login/Login';
import { shallow } from 'enzyme';

let wrapper;
let fakeEvent;
let historyMock;
let fakeAPI;

beforeAll(function (){
    fakeEvent = { preventDefault: () => {} };
    historyMock = { push: jest.fn() };
    fakeAPI = {
        auth: {
            login: {
                signIn: (email, password) => {
                    return new Promise((resolve, reject) => {
                        if (email === '' || password === '') {
                            reject('Empty fields');
                        }
                        const userCredential = {
                            user: {
                                name: 'sample user',
                                emailVerified: email === 'testemail@test.com',
                            }
                        }
                        resolve(userCredential);
                    });
                }
            },
            firebaseAuth: {
                setPersistence: jest.fn().mockResolvedValue(undefined),
            }
        }
    };
})
const validState = {
    email: 'testemail@test.com',
    password: 'abcdef',
};
const invalidState = {
    email: 'bademail@test.com',
    password: 'fedcba',
};

const emptyState = {

}
beforeEach(() => {
    wrapper = shallow(<Login />);
});

test('has a valid snapshot', () => {
    expect(wrapper).toMatchSnapshot();
});

test('redirects to dashboard after submit if email verified', () => {
    const historyWrapper = shallow(<Login history={historyMock} api={fakeAPI}/>)
    historyWrapper.setState(validState);
    historyWrapper.instance().handleSubmit(fakeEvent).then(()=>{
        expect(historyMock.push.mock.calls[0]).toEqual([ '/dashboard' ]);
    })
});

test('redirects to email verify after submit if email not verified', () => {
    const historyMock = { push: jest.fn() };
    const historyWrapper = shallow(<Login history={historyMock} api={fakeAPI}/>)
    historyWrapper.setState(invalidState);
    historyWrapper.instance().handleSubmit(fakeEvent).then(()=>{
        expect(historyMock.push.mock.calls[0]).toEqual([ '/emailverificationrequired' ]);
    })
});
//failed log in
test('failed log in with empty fields', (done) => {
    const apiWrapper = shallow(<Login api={fakeAPI}/>);
    jest.spyOn(apiWrapper.instance(), 'handleSubmit');
    apiWrapper.instance().handleSubmit(fakeEvent).then(() => {
        expect(apiWrapper.state('error')).toBe('Empty fields');
        done();
    });
});
