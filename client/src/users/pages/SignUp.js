import React, { useReducer, useCallback, useState, useEffect } from 'react'

import Card from '../../shared/components/UI/Card';
import Input from '../../shared/components/FormElements/Input';
// import Select from '../../shared/components/FormElements/Select';
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


const SignUp = () => {

    const initState = {
		email: { value: '' },
        password: { value: '' },
        repeatPassword: { value: '' },
        firstName: { value: '' },
        lastName: { value: '' },
        nickName: { value: '' },
        phoneNumber: { value: '' },
        gender: { value: '' },
		birthDay: { value: '' },
	};

    const [state, dispatch] = useReducer(reducer, initState);
    const [signInUpState, setSignInUpState] = useState(true);

	const inputHendler = useCallback((id, value) => {
		dispatch({ type: 'INPUT_CHANGED', value: value, inputId: id });
    }, []);
    
    const signInUpHendler = () => {
        setSignInUpState(!signInUpState);
    };

	const submitFormHendler = event => {
		event.preventDefault();
		console.log(state);

	};

	const checkPasswords = () => {
		const pass1 = state.password.value;
		const pass2 = state.repeatPassword.value;
		
		if (pass1 !== pass2) {
			console.log('your passwords are not equal')
		}
		else {
			console.log('everything is ok')
		}
	}

	useEffect(() => {
		checkPasswords();

	}, [state.password.value, state.repeatPassword.value]);

    
    return (
        <Card className="login">
            <h2>{signInUpState === true ? "Registration" : "Login"}</h2>
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
                { signInUpState === true ?
               
                <React.Fragment>
                <Input
					id="repeatPassword"
					type="password"
					label="Repeat Password"
					validations={''}
					onInput={inputHendler}
					errorMessage="Password is required"
				/>
                <Input
					id="firstName"
					type="input"
					label="Your First Name"
					validations={''}
					onInput={inputHendler}
					errorMessage="Input a valid First Name"
				/>
                <Input
					id="lastName"
					type="input"
					label="Your Last Name"
					validations={''}
					onInput={inputHendler}
					errorMessage="Input a valid Last Name"
				/>
                <Input
					id="nickName"
					type="input"
					label="Your Nickname"
					validations={''}
					onInput={inputHendler}
					errorMessage="Input a valid Nickname"
				/>
                <Input
					id="phoneNumber"
					type="input"
					label="Enter Your Number"
					validations={''}
					onInput={inputHendler}
					errorMessage="Input a valid Number"
				/>
                <Input
					id="gender"
					type="input"
					label="Choose your gender"
					validations={''}
					onInput={inputHendler}
					errorMessage="Choose your gender"
				/>
                <Input
					id="birthDay"
					type="input"
					label="Enter Your Birthday"
					validations={''}
					onInput={inputHendler}
					errorMessage="Input your real birthday"
				/>
                </React.Fragment>: null
                 }
				<button type="submit">{signInUpState === true ? "Sign Up" : "Sign In"}</button>
			</form>
    <button onClick={signInUpHendler}>{signInUpState === false ? "Sign Up" : "Sign In"}</button>
		</Card>
    )
}


export default SignUp;