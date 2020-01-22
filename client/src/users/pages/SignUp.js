import React, { useReducer, useCallback, useState } from 'react'

import Card from '../../shared/components/UI/Card';
import Input from '../../shared/components/FormElements/Input';
// import Select from '../../shared/components/FormElements/Select'
import { VAL_EMAIL, VAL_REQUIRED, VAL_MIN_LENGTH } from '../../shared/utilities/validation';
import './Login.css';

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


const SignUp = () => {

    const initState = {
		email: { value: '' },
        password: { value: '' },
        nickName: { value: '' },
        phone: { value: '' },
	};

    const [state, dispatch] = useReducer(reducer, initState);
	const [signInUpState, setSignInUpState] = useState(true);

	const inputHandler = useCallback((id, value, isValid) => {
		dispatch({ 
			type: 'INPUT_CHANGED', 
			value: value, 
			inputId: id, 
			isValid: isValid });
    }, []);
    
    const signInUpHandler = () => {
        setSignInUpState(!signInUpState);
    };

	const submitFormHandler = event => {
		event.preventDefault();
		console.log(state);

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
    )
}


export default SignUp;