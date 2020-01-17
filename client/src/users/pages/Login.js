import React, { useReducer, useCallback } from 'react';

import Card from '../../shared/components/UI/Card';
import Input from '../../shared/components/FormElements/Input';
import './Login.css';
import { VAL_EMAIL, VAL_REQUIRED } from '../../shared/utilities/validation';

const reducer = (state, action) => {
	switch (action.type) {
		default:
			return state;
		case 'INPUT_CHANGED':
			return {
				...state,
				[action.inputId]: { value: action.value, isValid: action.isValid },
			};
	}
};

const Login = () => {
	const initState = {
		email: { value: '', isValid: false },
		password: { value: '', isValid: false },
	};
	const [state, dispatch] = useReducer(reducer, initState);

	const inputHendler = useCallback((id, value, isValid) => {
		dispatch({
			type: 'INPUT_CHANGED',
			inputId: id,
			value: value,
			isValid: isValid,
		});
	}, []);

	const submitFormHendler = event => {
		event.preventDefault();
		console.log(state);
	};

	return (
		<Card className="login">
			<h2 className="text-center">Sign in</h2>
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
				<Input
					id="password"
					type="password"
					label="Password"
					validations={[VAL_REQUIRED()]}
					onInput={inputHendler}
					errorMessage="Password is required"
					className="form-control"
				/>
				<button className="btn btn-outline-primary" type="submit">
					Sign in
				</button>
			</form>
		</Card>
	);
};

export default Login;
