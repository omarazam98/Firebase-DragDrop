import React, { Component } from 'react';
import './SignUp.css';
import { fireauth, firestore} from '../firebase/firebase'

interface SignUpState {
    name: string,
    phoneNumber: string;
    email: string;
    passwordOne: string;
    passwordTwo: string;
    touched: {
        name: boolean,
        email: boolean,
        phoneNumber: boolean,
        passwordOne: boolean,
        passwordTwo: boolean,
    },
    error: Error | null;
    errors: {
        name: string,
        email: string,
        phoneNumber: string,
        passwordOne: string,
        passwordTwo: string,
    };
}

const INITIAL_STATE : SignUpState = {
    name: '',
    phoneNumber: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    touched: {
        name: false,
        email: false,
        phoneNumber: false,
        passwordOne: false,
        passwordTwo: false,
    },
    errors: {
        name: '',
        email: '',
        phoneNumber: '',
        passwordOne: '',
        passwordTwo: '',
    },
};

class SignUp extends Component<any, SignUpState> {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    onChange = e => {
        const isInvalid = this.state.passwordOne !== this.state.passwordTwo|| this.state.passwordOne === '' || this.state.email === '' || this.state.phoneNumber === '';
        if(e.target.value === ''){
            this.setState({ errors: {...this.state.errors, [e.target.name]: 'field cannot be empty' }} as Pick<SignUpState, keyof SignUpState>);
        }else if (e.target.checkValidity()){
            this.setState({ errors: {...this.state.errors, [e.target.name]: '' }} as Pick<SignUpState, keyof SignUpState>);
        }else{
            this.setState({ errors: {...this.state.errors, [e.target.name]: 'invalid' }} as Pick<SignUpState, keyof SignUpState>);
        };

        if (Object.keys(this.state).includes(e.target.name)) {
            this.setState({ [e.target.name]: e.target.value } as Pick<SignUpState, keyof SignUpState>);
        };
    };

    submit = e => {
        fireauth.createUserWithEmailAndPassword(this.state.email, this.state.passwordOne).then((userCredential) => {
            const user = userCredential.user;
            if (user){
                user.updateProfile({ displayName: this.state.name }).then(()=>{
                    console.log(user.uid);
                    firestore.collection('users').doc(user.uid).set({email: user.email, phoneNumber: this.state.phoneNumber, name: user.displayName});
                });
            }
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
        });;
        e.preventDefault();
    }

    validate = (email, phoneNumber, passwordOne, passwordTwo) => {
        const isInvalid = passwordOne !== passwordTwo|| passwordOne === '' || email === '' || phoneNumber === '';
        let hasErrors = false;
        for (const key in this.state.errors){
          if (this.state.errors[key]){
              hasErrors = true;
          }
        };
        return (hasErrors || isInvalid);
    };

    handleBlur = e => {
        if (Object.keys(this.state).includes(e.target.name)) {
            this.setState({...this.state, touched : { ...this.state.touched, [e.target.name]: true }});
        };
    };

    render(){
        const isEnabled = !this.validate(this.state.email, this.state.phoneNumber, this.state.passwordOne, this.state.passwordTwo);
        return(
            <div>
                <h1> Sign Up Page </h1>
                <form onSubmit={this.submit}>
                    <label htmlFor="name">Name: </label> <br/>
                    <input name="name" id="name" onBlur = {this.handleBlur} value={this.state.name} onChange={this.onChange} type="text" placeholder="Full Name"/> {this.state.touched.name && <span> {this.state.errors.name} </span> }<br/>
                    <label htmlFor="email">Email: </label> <br/>
                    <input name="email" id="email" onBlur = {this.handleBlur} value={this.state.email} onChange={this.onChange} type="email" placeholder="Email Address"/> {this.state.touched.email && <span> {this.state.errors.email} </span> }<br/>
                    <label htmlFor="phoneNumber">Phone Number: </label><br/>
                    <input name="phoneNumber" id='phoneNumber' onBlur={this.handleBlur} value={this.state.phoneNumber}  onChange={this.onChange}  type="tel" placeholder="Phone Number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>{this.state.touched.phoneNumber && <span> {this.state.errors.phoneNumber} </span> }<br/>
                    <label htmlFor="passwordOne">Password: </label><br/>
                    <input name="passwordOne" id="passwordOne" onBlur={this.handleBlur} value={this.state.passwordOne} onChange={this.onChange} type="password" placeholder="Password" />{this.state.touched.passwordOne && <span> {this.state.errors.passwordOne} </span> } <br/>
                    <label htmlFor="passwordTwo">Confirm Password: </label><br/>
                    <input name="passwordTwo" id="passwordTwo"onBlur={this.handleBlur} value={this.state.passwordTwo} onChange={this.onChange} type="password" placeholder="Confirm Password" />{ this.state.touched.passwordTwo && <span> {this.state.errors.passwordTwo} </span> }<br/>
                    <button disabled={!isEnabled} type="submit">Sign Up</button>
                {this.state.error && <p>{this.state.error.message}</p>}
        </form>
            </div>
        );
    };
}
export default SignUp;
