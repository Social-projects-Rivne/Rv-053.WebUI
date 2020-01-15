import React from 'react';

import Card from '../../shared/components/UI/Card';
import Input from '../../shared/components/FormElements/Input';
import './Login.css';

const Login = () => {
	return (
		<Card className="login">
			<h2>Login</h2>
			<form>
				<Input id="loginEmail" type="input" label="Email" validations={''} />
				<Input
					id="loginPassword"
					type="password"
					label="Password"
					validations={''}
				/>
			</form>
		</Card>
	);
};

export default Login;
