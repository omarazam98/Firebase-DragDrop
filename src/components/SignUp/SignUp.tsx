import React, {Component} from 'react';
import './SignUp.css';
import {firestore} from '../../firebase/firebase';
import {withAPI} from '@winwin/api-firebase';
import {
    withRouter
} from 'react-router-dom'

interface SignUpState {
    name: {
        value: string,
        touched: boolean,
        errors: string,
    };
    phoneNumber: {
        value: string,
        touched: boolean,
        errors: string,
    };
    class: {
        value: string,
        touched: boolean,
        errors: string,
    };
    email: {
        value: string,
        touched: boolean,
        errors: string,
    };
    passwordOne: {
        value: string,
        touched: boolean,
        errors: string,
    };
    passwordTwo: {
        value: string,
        touched: boolean,
        errors: string,
    };
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
    }

    onChange = e => {
        e.persist()
        if (Object.keys(this.state).includes(e.target.name)) {
            this.setState(function (prevState, props) {
                return {
                    [e.target.name]: {
                        ...prevState[e.target.name],
                        value: e.target.value
                    }
                } as Pick<SignUpState, keyof SignUpState>
            }, () => {
                this.validateInputs(e);
            });
        }
        ;
    };

    validateInputs = e => {
        if (e.target.value === '') {
            this.setState(function (prevState, props) {
                return {
                    [e.target.name]: {
                        ...prevState[e.target.name],
                        errors: 'field cannot be empty'
                    }
                } as Pick<SignUpState, keyof SignUpState>
            });
        } else if (e.target.name === 'passwordTwo' && this.state.passwordOne.value !== this.state.passwordTwo.value) {
            this.setState(function (prevState, props) {
                return {
                    passwordTwo: {
                        ...prevState.passwordTwo,
                        errors: 'passwords must match'
                    }
                } as Pick<SignUpState, keyof SignUpState>
            });
        } else if (!e.target.checkValidity()) {
            this.setState(function (prevState, props) {
                return {
                    [e.target.name]: {
                        ...prevState[e.target.name],
                        errors: 'invalid format'
                    }
                } as Pick<SignUpState, keyof SignUpState>
            });
        } else {
            this.setState(function (prevState, props) {
                return {
                    [e.target.name]: {
                        ...prevState[e.target.name],
                        errors: ''
                    }
                } as Pick<SignUpState, keyof SignUpState>
            });
        }
        ;
    };

    submit = e => {
        e.preventDefault();
        return this.props.api.api.auth.signup.createUserWithEmailAndPassword(this.state.email.value, this.state.passwordOne.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    if (user) {
                        user.sendEmailVerification();
                        this.props.history.push('/email'); //redirects to a new page saying that an email has been sent, and the account needs to be verified
                        user.updateProfile({displayName: this.state.name.value}).then(() => { //after creating the user in firebase auth, this also starts a user profile in the DB that will add the extra info (name, phonenumber, student or senior)
                            this.props.api.api.data.users.create({
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

    hasErrors = (): boolean => {
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
    handleBlur = e => { //
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
        ;
    };

    render() {
        const disableButton = this.hasErrors();
        return (
            <div>
                <h1> Sign Up Page </h1>
                <form onSubmit={this.submit}>
                    <label htmlFor="name">Name: </label> <br/>
                    <input name="name" id="name" onBlur={this.handleBlur} value={this.state.name.value}
                           onChange={this.onChange} type="text" placeholder="Full Name"/> {this.state.name.touched &&
                <span> {this.state.name.errors} </span>} <br/>

                    <input type="radio" name="class" value="senior" checked={this.state.class.value === "senior"}
                           onChange={this.onChange}/>Senior
                    <input type="radio" name="class" value="student" checked={this.state.class.value === "student"}
                           onChange={this.onChange}/>Student <br/>

                    <label htmlFor="email">Email: </label> <br/>
                    <input name="email" id="email" onBlur={this.handleBlur} value={this.state.email.value}
                           onChange={this.onChange} type="email"
                           placeholder="Email Address"/> {this.state.email.touched &&
                <span> {this.state.email.errors} </span>}<br/>

                    <label htmlFor="phoneNumber">Phone Number: </label><br/>
                    <input name="phoneNumber" id='phoneNumber' onBlur={this.handleBlur} onChange={this.onChange}
                           type="tel" placeholder="Phone Number"
                           pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>{this.state.phoneNumber.touched &&
                <span> {this.state.phoneNumber.errors} </span>}<br/>

                    <label htmlFor="passwordOne">Password: </label><br/>
                    <input name="passwordOne" id="passwordOne" onBlur={this.handleBlur}
                           value={this.state.passwordOne.value} onChange={this.onChange} type="password"
                           placeholder="Password"/>{this.state.passwordOne.touched &&
                <span> {this.state.passwordOne.errors} </span>} <br/>

                    <label htmlFor="passwordTwo">Confirm Password: </label> <br/>
                    <input name="passwordTwo" id="passwordTwo" onBlur={this.handleBlur}
                           value={this.state.passwordTwo.value} onChange={this.onChange} type="password"
                           placeholder="Confirm Password"/>{this.state.passwordTwo.touched &&
                <span> {this.state.passwordTwo.errors} </span>} <br/>

                    <input disabled={disableButton} id={'submitButton'} type="submit"
                           value={'Sign Up'}></input>
                </form>
            </div>
        );
    };
};

export default withAPI(withRouter(SignUp))
