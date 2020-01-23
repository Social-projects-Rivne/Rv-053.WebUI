import React, { useState } from 'react'

import Card from '../../shared/components/UI/Card';
import Input from '../../shared/components/FormElements/Input';
import { useForm } from './../../shared/hooks/useForm.js';
// import Select from '../../shared/components/FormElements/Select'
import { VAL_EMAIL, VAL_REQUIRED, VAL_MIN_LENGTH } from '../../shared/utilities/validation';
import './Login.css';


const SignUp = () => {
	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: '',
				isValid: false,
			},
			password: {
				value: '',
				isValid: false,
			},
		},
		false
	);


	const signInUpHandler = () => {
		if (signInUpState) {
			setFormData(
				{
					...formState.inputs,
					nickName: undefined,
					phone: undefined,
				},
				false
			);
		} else {
			setFormData(
				{
					...formState.inputs,
					nickName: {
						value: '',
						isValid: false,
					},
					phone: {
						value: '',
						isValid: false,
					}
				},
				false
			);
		}
		setSignInUpState(!signInUpState);
	};

	const [signInUpState, setSignInUpState] = useState(false);


	const submitFormHandler = event => {
		event.preventDefault();
		console.log(formState);
	};

    return (
        <Card className="Registration">
            <h2 className="text-center">{signInUpState === true ? "Registration" : "Login"}</h2>
			<form onSubmit={submitFormHandler}>
				<Input
					id="email"
					type="input"
					label="Email"
					validations={[VAL_EMAIL()]}
					onInput={inputHandler}
					errorMessage="Input a valid email"
					className="form-control"
				/>
				<Input
					id="password"
					type="password"
					label="Password"
					validations={[VAL_REQUIRED(), VAL_MIN_LENGTH(6)]}
					onInput={inputHandler}
					errorMessage="Password is required"
					className="form-control"
				/>
                { signInUpState === true ?
               
                <React.Fragment>
                <Input
					id="nickName"
					type="input"
					label="Your Nickname"
					validations={[VAL_MIN_LENGTH(5)]}
					onInput={inputHandler}
					errorMessage="Input a valid Nickname"
					className="form-control"
				/>
                <Input
					id="phone"
					type="phone"
					label="Phone"
					validations={[VAL_REQUIRED()]}
					onInput={inputHandler}
					errorMessage="Phone a valid Number"
					className="form-control"
				/>
                </React.Fragment>: null
                 }
				<button className="btn btn-outline-primary float-right" type="submit">{signInUpState === true ? "Sign Up" : "Sign In"}</button>
			</form>
    <button className="btn btn-outline-primary" onClick={signInUpHandler}>{signInUpState === false ? "Switch to Sign Up" : "Switch to Log In"}</button>
		</Card>
	);
};

export default SignUp;
