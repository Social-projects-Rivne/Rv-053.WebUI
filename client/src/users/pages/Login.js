import React, { useReducer, useCallback } from 'react';

import Card from '../../shared/components/UI/Card';
import Input from '../../shared/components/FormElements/Input';
import './Login.css';

const reducer = (state, action) => {
	switch (action.type) {
		default:
			return state;
		case 'INPUT_CHANGED':
			return {
				...state,
				[action.inputId]: { value: action.value },
			};
	}
};

const Login = () => {
	const initState = {
		email: { value: '' },
		password: { value: '' },
	};
	const [state, dispatch] = useReducer(reducer, initState);

	const inputHendler = useCallback((id, value) => {
		dispatch({ type: 'INPUT_CHANGED', value: value, inputId: id });
	}, []);

	const submitFormHendler = event => {
		event.preventDefault();
		console.log(state);
	};

	return (
		<Card className="login">
			<h2>Login</h2>
			<form onSubmit={submitFormHendler}>
				<Input
					id="email"
					type="input"
					label="Email"
					validations={''}
					onInput={inputHendler}
					errorMessage="Input a valid email"
				/>
				<Input
					id="password"
					type="password"
					label="Password"
					validations={''}
					onInput={inputHendler}
					errorMessage="Password is required"
				/>
				<button type="submit">Sign in</button>
			</form>
		</Card>
	);
};

export default Login;
