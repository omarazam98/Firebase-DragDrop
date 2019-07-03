import React, { Component } from 'react';
import '../../styles/SignUp.css';
import { withAPI } from '@winwin/api-firebase';
import { withRouter } from 'react-router-dom';

interface FormField {
  value: string;
  touched: boolean;
  errors: string;
}
interface SignUpState {
  name: FormField;
  phoneNumber: FormField;
  class: FormField;
  email: FormField;
  passwordOne: FormField;
  passwordTwo: FormField;
  formError: Error | undefined;
}

const INITIAL_STATE: SignUpState = {
  name: {
    value: '',
    touched: false,
    errors: 'field cannot be empty',
  },
  phoneNumber: {
    value: '',
    touched: false,
    errors: 'field cannot be empty',
  },
  class: {
    value: '',
    touched: false,
    errors: 'value must be selected',
  },
  email: {
    value: '',
    touched: false,
    errors: 'field cannot be empty',
  },
  passwordOne: {
    value: '',
    touched: false,
    errors: 'field cannot be empty',
  },
  passwordTwo: {
    value: '',
    touched: false,
    errors: 'field cannot be empty',
  },
  formError: undefined,
};

export class SignUp extends Component<any, SignUpState> {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.handleChange = this.handleChange.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.hasErrors = this.hasErrors.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  handleChange(e) {
    e.persist();
    if (Object.keys(this.state).includes(e.target.name)) {
      this.updateField(e.target.name, e.target.value, e.target.checkValidity());
    }
  }

  updateField(name, value, valid) {
    this.setState(
      (prevState, props) => {
        return {
          [name]: {
            ...prevState[name],
            value,
          },
        } as Pick<SignUpState, keyof SignUpState>;
      },
      () => {
        this.validateInputs(name, value, valid);
      },
    );
  }

  /*
   * checks all inputs for specific errors
   */
  validateInputs(name, value, valid) {
    if (value === '') {
      // field is empty (priority error)
      this.setState((prevState, props) => {
        // set the error state for this field
        return {
          [name]: {
            ...prevState[name],
            errors: 'field cannot be empty',
          },
        } as Pick<SignUpState, keyof SignUpState>;
        // This is to ensure the general name keys are proper format for state
      });
    } else if (
      name === 'passwordTwo' &&
      this.state.passwordOne.value !== this.state.passwordTwo.value
    ) {
      // passwords don't match
      this.setState((prevState, props) => {
        return {
          passwordTwo: {
            ...prevState.passwordTwo,
            errors: 'passwords must match',
          },
        } as Pick<SignUpState, keyof SignUpState>;
      });
    } else if (!valid) {
      this.setState((prevState, props) => {
        // this is the default validity check for html inputs
        return {
          [name]: {
            ...prevState[name],
            errors: 'invalid format',
          },
        } as Pick<SignUpState, keyof SignUpState>;
      });
    } else {
      this.setState((prevState) => {
        // if no other errors are found then clear the error field
        return {
          [name]: {
            ...prevState[name],
            errors: '',
          },
        } as Pick<SignUpState, keyof SignUpState>;
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.hasErrors()) {
      return this.props.api.auth.signup
        .createUserWithEmailAndPassword(
          this.state.email.value,
          this.state.passwordOne.value,
        )
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            user.sendEmailVerification({ url: 'http://localhost:3000' });
            // redirects to a new page saying that an email has been sent,
            // and the account needs to be verified
            this.props.history.push('/email');
            user
              .updateProfile({ displayName: this.state.name.value })
              .then(() => {
                // after creating the user in firebase auth, this also starts a user profile in
                // the DB that will add the extra info (name, phonenumber, student or senior)
                this.props.api.data.users.create(user.uid, {
                  email: user.email,
                  phoneNumber: this.state.phoneNumber.value,
                  name: user.displayName,
                  class: this.state.class.value,
                });
              });
          }
        })
        .catch((error) => {
          // these error messages are coming from firestore and include
          // anything we aren't already catching
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
        });
    }
    this.setState(() => {
      return { formError: new Error('Invalid form inputs') };
    });
    for (const key in this.state) {
      if (key === 'formError') continue;
      this.setState((prevState) => {
        return {
          [key]: {
            ...prevState[key],
            touched: true,
          },
        } as Pick<SignUpState, keyof SignUpState>;
      });
    }
  }

  hasErrors(): boolean {
    for (const key in this.state) {
      if (key === 'formError') continue;
      if (this.state[key].errors || this.state[key].value === '') {
        return true;
      }
    }
    return false;
  }

  /*
  handleBlur is essentially an onUnFocus method so that errors aren't
  rendered right away, just after the user goes away from the input box
  */
  handleBlur(e) {
    e.persist();
    if (Object.keys(this.state).includes(e.target.name)) {
      this.setState((prevState, props) => {
        return {
          [e.target.name]: {
            ...prevState[e.target.name],
            touched: true,
          },
        } as Pick<SignUpState, keyof SignUpState>;
      });
    }
  }

  handleFocus(e) {
    e.persist();
    if (
      Object.keys(this.state).includes(e.target.name) &&
      e.target.type !== 'radio'
    ) {
      this.setState((prevState, props) => {
        return {
          [e.target.name]: {
            ...prevState[e.target.name],
            touched: false,
          },
        } as Pick<SignUpState, keyof SignUpState>;
      });
    }
  }

  render() {
    return (
      <div>
        <h1> Sign Up </h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name: </label> <br />
          <input
            name="name"
            id="name"
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            value={this.state.name.value}
            onChange={this.handleChange}
            type="text"
            placeholder="Full Name"
          />{' '}
          {this.state.name.touched && <span> {this.state.name.errors} </span>}{' '}
          <br />
          <input
            type="radio"
            name="class"
            value="senior"
            checked={this.state.class.value === 'senior'}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
          />
          Senior
          <input
            type="radio"
            name="class"
            value="student"
            checked={this.state.class.value === 'student'}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
          />
          Student{' '}
          {this.state.class.touched && <span> {this.state.class.errors} </span>}
          <br />
          <label htmlFor="email">Email: </label> <br />
          <input
            name="email"
            id="email"
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            value={this.state.email.value}
            onChange={this.handleChange}
            type="email"
            placeholder="Email Address"
          />
          {this.state.email.touched && <span>{this.state.email.errors}</span>}
          <br />
          <label htmlFor="phoneNumber">Phone Number: </label>
          <br />
          <input
            name="phoneNumber"
            id="phoneNumber"
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            type="tel"
            placeholder="Phone Number"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          />{' '}
          {/*phone number needs to be XXX-XXX-XXXX*/}
          {this.state.phoneNumber.touched && (
            <span> {this.state.phoneNumber.errors} </span>
          )}
          <br />
          <label htmlFor="passwordOne">Password: </label>
          <br />
          <input
            name="passwordOne"
            id="passwordOne"
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            value={this.state.passwordOne.value}
            onChange={this.handleChange}
            type="password"
            placeholder="Password"
          />
          {this.state.passwordOne.touched && (
            <span> {this.state.passwordOne.errors} </span>
          )}{' '}
          <br />
          <label htmlFor="passwordTwo">Confirm Password: </label> <br />
          <input
            name="passwordTwo"
            id="passwordTwo"
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            value={this.state.passwordTwo.value}
            onChange={this.handleChange}
            type="password"
            placeholder="Confirm Password"
          />
          {this.state.passwordTwo.touched && (
            <span>{this.state.passwordTwo.errors}</span>
          )}{' '}
          <br />
          <input id={'submitButton'} type="submit" value={'Sign Up'} />{' '}
          <span>{this.state.formError && this.state.formError.message}</span>
        </form>
      </div>
    );
  }
}

export default withAPI(withRouter(SignUp));
