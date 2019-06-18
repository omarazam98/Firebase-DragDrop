import React, { Component } from 'react';
import '../../styles/SignUp.css';
import { withAPI } from '@winwin/api-firebase';
import { withRouter } from 'react-router-dom';

interface FormField {
    value: string,
    touched: boolean,
    errors: string,
}
interface SignUpState {
    name: FormField;
    phoneNumber: FormField;
    class: FormField;
    email: FormField;
    passwordOne: FormField;
    passwordTwo: FormField;
}

const INITIAL_STATE: SignUpState = {
    name: {
        value: '',
        touched: false,
        errors: '',
    },
    phoneNumber: {
        value: '',
        touched: false,
        errors: '',
    },
    class: {
        value: '',
        touched: false,
        errors: '',
    },
    email: {
        value: '',
        touched: false,
        errors: '',
    },
    passwordOne: {
        value: '',
        touched: false,
        errors: '',
    },
    passwordTwo: {
        value: '',
        touched: false,
        errors: '',
    },
};

export class SignUp extends Component<any, SignUpState> {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
        this.handleChange = this.handleChange.bind(this);
        this.validateInputs = this.validateInputs.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.hasErrors = this.hasErrors.bind(this);
        this.updateField = this.updateField.bind(this);
    }

    handleChange(e) {
        e.persist()
        if (Object.keys(this.state).includes(e.target.name)) {
            this.updateField(e.target.name, e.target.value, e.target.checkValidity())
        }
    };

    updateField(name, value, valid) {
        this.setState(function (prevState, props) {
            return {
                [name]: {
                    ...prevState[name],
                    value
                }
            } as Pick<SignUpState, keyof SignUpState>
        }, () => {
            this.validateInputs(name, value, valid)
        });
    }

    validateInputs(name, value, valid) {
        if (value === '') {
            this.setState(function (prevState, props) {
                return {
                    [name]: {
                        ...prevState[name],
                        errors: 'field cannot be empty'
                    }
                } as Pick<SignUpState, keyof SignUpState>
            });
        } else if (name === 'passwordTwo' && this.state.passwordOne.value !== this.state.passwordTwo.value) {
            this.setState(function (prevState, props) {
                return {
                    passwordTwo: {
                        ...prevState.passwordTwo,
                        errors: 'passwords must match'
                    }
                } as Pick<SignUpState, keyof SignUpState>
            });
        } else if (!valid) {
            this.setState(function (prevState, props) {
                return {
                    [name]: {
                        ...prevState[name],
                        errors: 'invalid format'
                    }
                } as Pick<SignUpState, keyof SignUpState>
            });
        } else {
            this.setState(function (prevState, props) {
                return {
                    [name]: {
                        ...prevState[name],
                        errors: ''
                    }
                } as Pick<SignUpState, keyof SignUpState>
            });
        };
    };

    handleSubmit(e) {
        e.preventDefault();
        return this.props.api.auth.signup.createUserWithEmailAndPassword(this.state.email.value, this.state.passwordOne.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    if (user) {
                        user.sendEmailVerification();
                        this.props.history.push('/email'); //redirects to a new page saying that an email has been sent, and the account needs to be verified
                        user.updateProfile({displayName: this.state.name.value}).then(() => { //after creating the user in firebase auth, this also starts a user profile in the DB that will add the extra info (name, phonenumber, student or senior)
                            this.props.api.data.users.create({
                                email: user.email,
                                phoneNumber: this.state.phoneNumber.value,
                                name: user.displayName,
                                class: this.state.class.value
                            }, user.uid);
                        });
                    }
                }).catch(function (error) { //these error messages are coming from firestore and include anything we aren't already catching
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode == 'auth/weak-password') {
                        alert('The password is too weak.');
                    } else {
                        alert(errorMessage);
                    }
                });
    }

    hasErrors(): boolean {
        for (const key in this.state) {
            if (this.state[key].errors || this.state[key].value === '') {
                return true;
            }
        }
        return false;
    };

    /*
        handleBlur is essentially an onUnFocus method so that errors aren't rendered right away, just after the user goes away from the input box
     */
    handleBlur(e) { //
        e.persist();
        if (Object.keys(this.state).includes(e.target.name)) {
            this.setState(function (prevState, props) {
                return {
                    [e.target.name]: {
                        ...prevState[e.target.name],
                        touched: true
                    }
                } as Pick<SignUpState, keyof SignUpState>
            });
        }

    }

    render() {
        console.log(this.state);
        const disableButton = this.hasErrors();
        return (
            <div>
                <h1> Sign Up Page </h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name: </label> <br/>
                    <input name="name" id="name" onBlur={this.handleBlur} value={this.state.name.value}
                           onChange={this.handleChange} type="text" placeholder="Full Name"/> {this.state.name.touched &&
                <span> {this.state.name.errors} </span>} <br/>

                    <input type="radio" name="class" value="senior" checked={this.state.class.value === "senior"}
                           onChange={this.handleChange}/>Senior
                    <input type="radio" name="class" value="student" checked={this.state.class.value === "student"}
                           onChange={this.handleChange}/>Student <br/>

                    <label htmlFor="email">Email: </label> <br/>
                    <input name="email" id="email" onBlur={this.handleBlur} value={this.state.email.value}
                           onChange={this.handleChange} type="email"
                           placeholder="Email Address"/> {this.state.email.touched &&
                <span> {this.state.email.errors} </span>}<br/>

                    <label htmlFor="phoneNumber">Phone Number: </label><br/>
                    <input name="phoneNumber" id='phoneNumber' onBlur={this.handleBlur} onChange={this.handleChange}
                           type="tel" placeholder="Phone Number"
                           pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>{this.state.phoneNumber.touched &&
                <span> {this.state.phoneNumber.errors} </span>}<br/>

                    <label htmlFor="passwordOne">Password: </label><br/>
                    <input name="passwordOne" id="passwordOne" onBlur={this.handleBlur}
                           value={this.state.passwordOne.value} onChange={this.handleChange} type="password"
                           placeholder="Password"/>{this.state.passwordOne.touched &&
                <span> {this.state.passwordOne.errors} </span>} <br/>

                    <label htmlFor="passwordTwo">Confirm Password: </label> <br/>
                    <input name="passwordTwo" id="passwordTwo" onBlur={this.handleBlur}
                           value={this.state.passwordTwo.value} onChange={this.handleChange} type="password"
                           placeholder="Confirm Password"/>{this.state.passwordTwo.touched &&
                <span> {this.state.passwordTwo.errors} </span>} <br/>

                    <input disabled={disableButton} id={'submitButton'} type="submit"
                           value={'Sign Up'}></input>
                </form>
            </div>
        );
    };
}

export default withAPI(withRouter(SignUp))
