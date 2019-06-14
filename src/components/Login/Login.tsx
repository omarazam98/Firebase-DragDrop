import React, {Component} from 'react';
import {withAPI} from '@winwin/api-firebase';
import {
    withRouter
} from 'react-router-dom';

interface LoginState {
    email: string;
    password: string;
}

const INITIAL_STATE: LoginState = {
    email: '',
    password: '',
};

export class Login extends Component<any, LoginState> {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    onChange = e => {
        e.persist()
        if (Object.keys(this.state).includes(e.target.name)) {
            this.setState(function (prevState, props) {
                return {
                    [e.target.name]: e.target.value
                } as Pick<LoginState, keyof LoginState>
            });
        }
        ;
    };

    submit = e => {
        e.preventDefault();
        this.props.api.api.auth.login.signIn(this.state.email, this.state.password)
            .then((userCredential)=>{
                if(userCredential.user.emailVerified){
                    this.props.history.push('/dashboard');
                }else{
                    this.props.history.push('/emailverificationrequired');
                }
            }).catch((error)=>{
            alert(error.message)
        });
    }


    render() {
        console.log(this.state);
        return (
            <div>
                <h1> Login Page </h1>
                <form onSubmit={this.submit}>

                    <label htmlFor="email">Email: </label> <br/>
                    <input name="email" id="email" value={this.state.email}
                           onChange={this.onChange} type="email"
                           placeholder="Email Address"/><br/>

                    <label htmlFor="password">Password: </label><br/>
                    <input name="password" id="password"
                           value={this.state.password} onChange={this.onChange} type="password"
                           placeholder="Password"/><br/>

                    <input id={'submitButton'} type="submit"
                           value={'Log In'}></input>
                </form>
            </div>
        );
    };
}

export default withAPI(withRouter(Login))
