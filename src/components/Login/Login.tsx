import React, { Component } from 'react';
import { withAPI } from '@winwin/api-firebase';

interface LoginState {
  email: string;
  password: string;
  persistAuth: boolean;
  error: Error | undefined;
}

const INITIAL_STATE: LoginState = {
  email: '',
  password: '',
  persistAuth: false,
  error: undefined,
};

export class Login extends Component<any, LoginState> {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // this will set the value of whatever input field has been changed

  handleChange(e) {
    e.persist();
    if (Object.keys(this.state).includes(e.target.name)) {
      // checkbox ix weird, it uses checked rather than value
      const value = e.target.type === 'checkbox' ?
        e.target.checked : e.target.value;
      this.setState((prevState, props) => {
        return {
          [e.target.name]: value,
        } as Pick<LoginState, keyof LoginState>;
        // we are using general keys (any input field can be passed)
        // so this ensures it follows the format of the LoginState
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    return this.props.api.auth.login.setPersistence(this.state.persistAuth ? 'local' : 'session')
      .then(() => {
        return this.props.api.auth.login.signIn(this.state.email, this.state.password)
          .then((userCredential) => {
            if (userCredential.user.emailVerified) {
              this.props.history.push('/dashboard');
            } else {
              this.props.history.push('/email');
            }
          }).catch((error) => {
            this.setState(() => {
              return { error };
            });
            alert(error.message);
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
            onChange={this.handleChange}/><br/>

          <input id={'submitButton'}
                 type="submit"
                 value={'Log In'}/>
        </form>
      </div>
    );
  }
}

export default withAPI(Login);
