import React, { useState, useEffect } from 'react';

import Card from '../../shared/components/UI/Card';
import Input from '../../shared/components/FormElements/Input';
import { useForm } from './../../shared/hooks/useForm.js';
// import Select from '../../shared/components/FormElements/Select';
import './Login.css';
import {
	VAL_REQUIRED,
	VAL_EMAIL,
	VAL_LETTERS,
	VAL_MIN_LENGTH,
} from '../../shared/utilities/validation';

const SignUp = () => {
	const [formState, inputHendler, setFormData] = useForm(
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
	const [signInUpState, setSignInUpState] = useState(false);

	const signInUpHendler = () => {
		if (signInUpState) {
			setFormData(
				{
					...formState.inputs,
					repeatPassword: undefined,
					firstName: undefined,
					lastName: undefined,
					nickName: undefined,
					phoneNumber: undefined,
					gender: undefined,
					birthDay: undefined,
				},
				false
			);
		} else {
			setFormData(
				{
					...formState.inputs,
					repeatPassword: {
						value: '',
						isValid: false,
					},
					firstName: {
						value: '',
						isValid: false,
					},
					lastName: {
						value: '',
						isValid: false,
					},
					nickName: {
						value: '',
						isValid: false,
					},
					phoneNumber: {
						value: '',
						isValid: false,
					},
					gender: {
						value: '',
						isValid: false,
					},
					birthDay: {
						value: '',
						isValid: false,
					},
				},
				false
			);
		}
		setSignInUpState(!signInUpState);
	};

	const submitFormHendler = event => {
		event.preventDefault();
		console.log(formState);
	};

	useEffect(() => {
		if (signInUpState) {
			const pass1 = formState.inputs.password.value;
			const pass2 = formState.inputs.repeatPassword.value;

			if (pass1 !== pass2) {
				console.log('your passwords are not equal');
			} else {
				console.log('everything is ok');
			}
		}
	}, [formState.inputs, signInUpState]);

	return (
		<Card className="login">
			<h2>{signInUpState === true ? 'Registration' : 'Login'}</h2>
			<form onSubmit={submitFormHendler}>
				<Input
					id="email"
					type="input"
					label="Email"
					validations={[VAL_EMAIL()]}
					onInput={inputHendler}
					errorMessage="Input a valid email"
					className="form-control"
				/>

				{signInUpState === false ? (
					<Input
						id="password"
						type="password"
						label="Password"
						validations={[VAL_REQUIRED()]}
						onInput={inputHendler}
						errorMessage="Password is required"
						className="form-control"
					/>
				) : (
					<React.Fragment>
						<Input
							id="password"
							type="password"
							label="Password"
							validations={[VAL_MIN_LENGTH(8)]}
							onInput={inputHendler}
							errorMessage="Password should contain at least 8 characters"
							className="form-control"
						/>
						<Input
							id="repeatPassword"
							type="password"
							label="Repeat Password"
							validations={[VAL_REQUIRED()]}
							onInput={inputHendler}
							errorMessage="Passwords are no equal"
							className="form-control"
						/>
						<Input
							id="firstName"
							type="input"
							label="Your First Name"
							validations={[VAL_LETTERS()]}
							onInput={inputHendler}
							errorMessage="Input a valid First Name"
							className="form-control"
						/>
						<Input
							id="lastName"
							type="input"
							label="Your Last Name"
							validations={[VAL_LETTERS()]}
							onInput={inputHendler}
							errorMessage="Input a valid Last Name"
							className="form-control"
						/>
						<Input
							id="nickName"
							type="input"
							label="Your Nickname"
							validations={[VAL_REQUIRED()]}
							onInput={inputHendler}
							errorMessage="Input a valid Nickname"
							className="form-control"
						/>
						<Input
							id="phoneNumber"
							type="phone"
							label="Enter Your Number"
							validations={''}
							onInput={inputHendler}
							errorMessage="Input a valid Number"
							className="form-control"
						/>
						<Input
							id="gender"
							type="input"
							label="Choose your gender"
							validations={''}
							onInput={inputHendler}
							errorMessage="Choose your gender"
							className="form-control"
						/>
						<Input
							id="birthDay"
							type="input"
							label="Enter Your Birthday"
							validations={''}
							onInput={inputHendler}
							errorMessage="Input your real birthday"
							className="form-control"
						/>
					</React.Fragment>
				)}
				<button type="submit" className="btn btn-primary float-right">
					{signInUpState === true ? 'Sign Up' : 'Sign In'}
				</button>
			</form>
			<button onClick={signInUpHendler} className="btn btn-primary">
				{signInUpState === false ? 'Switch to Sign Up' : 'Switch to Sign In'}
			</button>
		</Card>
	);
};

export default SignUp;
