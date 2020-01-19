import React, { useReducer, useEffect, useCallback } from 'react';

import Password from './InputChildrens/Password';
import Phone from './InputChildrens/Phone';
import { validate } from '../../utilities/validation';
import './Input.css';

const reducer = (state, action) => {
	switch (action.type) {
		default:
			throw new Error('Check if you dispatch the right type of action!');
		case 'CLICK':
			return {
				...state,
				isClicked: true,
			};
		case 'TYPING':
			return {
				...state,
				value: action.value,
				isValid: action.validations
					? validate(action.value, action.validations)
					: action.isValid || false, //add validation phore phone here
			};
	}
};

const Input = props => {
	const initialState = {
		value: props.initValue || '',
		isValid: props.initValid || false,
		isClicked: false,
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	const blurHendler = () => {
		dispatch({ type: 'CLICK' });
	};

	const typingHendler = event => {
		dispatch({
			type: 'TYPING',
			value: event.target.value,
			validations: props.validations,
		});
	};

	const inputPhoneHendler = useCallback((value, isValid) => {
		dispatch({
			type: 'TYPING',
			value: value,
			isValid: isValid,
			// validations: props.validations,
		});
	}, []);

	const { id, onInput } = props;
	const { value, isValid } = state;
	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, value, onInput, isValid]);

	let inputEl = null;
	if (props.type === 'input') {
		inputEl = (
			<input
				className={
					props.className +
					` ${!state.isValid && state.isClicked && 'is-invalid'}`
				}
				id={props.id}
				value={state.value}
				onBlur={blurHendler}
				onChange={typingHendler}
			/>
		);
	} else if (props.type === 'textarea') {
		inputEl = (
			<textarea
				className={
					props.className +
					` ${!state.isValid && state.isClicked && 'is-invalid'}`
				}
				id={props.id}
				rows={props.rows || 3}
				value={state.value}
				onBlur={blurHendler}
				onChange={typingHendler}
			/>
		);
	} else if (props.type === 'password') {
		inputEl = (
			<Password
				className={
					props.className +
					` ${!state.isValid && state.isClicked && 'is-invalid'}`
				}
				id={props.id}
				value={state.value}
				onBlur={blurHendler}
				onChange={typingHendler}
				isValid={state.isValid}
				isClicked={state.isClicked}
			/>
		);
	} else if (props.type === 'phone') {
		inputEl = (
			<Phone
				className={
					props.className +
					` ${!state.isValid && state.isClicked && 'is-invalid'}`
				}
				id={props.id}
				value={state.value}
				onBlur={blurHendler}
				onChange={inputPhoneHendler}
				isValid={state.isValid}
				isClicked={state.isClicked}
			/>
		);
	}

	return (
		<div className="form-group">
			<label htmlFor={props.id}>{props.label}</label>
			{inputEl}
			{!state.isValid && state.isClicked && (
				<div className="invalid-feedback">{props.errorMessage}</div>
			)}
		</div>
	);
};

export default Input;