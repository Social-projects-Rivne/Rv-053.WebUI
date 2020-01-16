import React, { useReducer } from 'react';

import Password from './Password';
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
			};
	}
};

const Input = props => {
	//DO TO: how to chek if need typeSwitch
	const initialState = {
		value: props.initValue || '',
		isValid: true,
		isClicked: false,
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	const blurHendler = () => {
		dispatch({ type: 'CLICK' });
	};

	const typingHendler = event => {
		dispatch({ type: 'TYPING', value: event.target.value });
	};

	let inputEl = null;
	if (props.type === 'input') {
		inputEl = (
			<input
				id={props.id}
				value={state.value}
				onBlur={blurHendler}
				onChange={typingHendler}
			/>
		);
	} else if (props.type === 'textarea') {
		inputEl = (
			<textarea
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
				id={props.id}
				value={state.value}
				onBlur={blurHendler}
				onChange={typingHendler}
			/>
		);
	}

	return (
		<div className="form-input">
			<label htmlFor={props.id}>{props.label}</label>
			{inputEl}
			{<p>input fields validation mesege</p>}
			{console.log({ ...state })}
		</div>
	);
};

export default Input;
