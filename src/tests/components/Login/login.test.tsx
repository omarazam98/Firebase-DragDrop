import React from 'react';
import ReactDOM from 'react-dom';
import { Login } from '../../../components/Login/Login';
import { shallow } from 'enzyme';

let wrapper;

const fakeAPI = {
    api: {
        auth: {
            login: {
                signIn: (state) => {
                    return new Promise((resolve, reject) => {
                        const userCredential = {
                            user: {
                                name: 'sample user',
                                emailVerified: state==='testemail@test.com',
                            }
                        }
                        resolve(userCredential);
                    });
                }
            }
        }
    }
};

const validState = {
    email: 'testemail@test.com',
    password: 'abcdef',
};
const invalidState = {
    email: 'bademail@test.com',
    password: 'fedcba',
};
beforeEach(() => {
    const wrapper = shallow(<Login />);
});

test('has a valid snapshot', () => {
    expect(wrapper).toMatchSnapshot();
});

test('redirects to dashboard after submit if email verified', () => {
    const fakeEvent = { preventDefault: () => {} };
    const historyMock = { push: jest.fn() };
    const historyWrapper = shallow(<Login history={historyMock} api={fakeAPI}/>)
    historyWrapper.setState(validState);
    historyWrapper.instance().submit(fakeEvent).then(()=>{
        expect(historyMock.push.mock.calls[0]).toEqual([ '/dashboard' ]);
    })
});
test('redirecs to email verify after submit if email not verified', () => {
    const fakeEvent = { preventDefault: () => {} };
    const historyMock = { push: jest.fn() };
    const historyWrapper = shallow(<Login history={historyMock} api={fakeAPI}/>)
    historyWrapper.setState(invalidState);
    historyWrapper.instance().submit(fakeEvent).then(()=>{
        expect(historyMock.push.mock.calls[0]).toEqual([ '/emailverificationrequired' ]);
    })
});
