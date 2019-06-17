import React, { Component } from 'react';
import { withAPI } from '@winwin/api-firebase';
import { withRouter } from 'react-router-dom';


interface LoginState {
    email: string;
    password: string;
    persistAuth: boolean;
}

const INITIAL_STATE: LoginState = {
    email: '',
    password: '',
    persistAuth: false,
};

export class Login extends Component<any, LoginState> {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        e.persist()
        if (Object.keys(this.state).includes(e.target.name)) {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
            this.setState(function (prevState, props) {
                return {
                    [e.target.name]: value
                } as Pick<LoginState, keyof LoginState>
            });
        }
        ;
    };

    handleSubmit(e) {
        e.preventDefault();
        return this.props.api.api.auth.firebaseAuth.setPersistence(this.state.persistAuth ? 'local' : 'session').then(() => {
            return this.props.api.api.auth.login.signIn(this.state.email, this.state.password)
                .then((userCredential) => {
                    if (userCredential.user.emailVerified) {
                        this.props.history.push('/dashboard');
                    } else {
                        this.props.history.push('/emailverificationrequired');
                    }
                }).catch((error) => {
                    alert(error.message)
                });
        });
    }


    render() {
        return (
            <div>
                <h1> Login Page </h1>
                <form onSubmit={this.handleSubmit}>

                    <label htmlFor="email">Email: </label> <br/>
                    <input name="email" id="email"
                           value={this.state.email}
                           onChange={this.handleChange}
                           type="email"
                           placeholder="Email Address"/><br/>

                    <label htmlFor="password">Password: </label><br/>
                    <input name="password"
                           id="password"
                           value={this.state.password}
                           onChange={this.handleChange}
                           type="password"
                           placeholder="Password"/><br/>
                    Stay Logged In?
                    <input
                        name="persistAuth"
                        type="checkbox"
                        onChange={this.handleChange} /><br/>

                    <input id={'submitButton'}
                           type="submit"
                           value={'Log In'}></input>
                </form>
            </div>
        );
    };
}

export default withAPI(withRouter(Login))
