import React, { useReducer } from 'react';

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
		case 'SWITCH_PASS_VIEW':
			return {
				...state,
				typeSwitch: action.typeSwitch,
			};
	}
};

const Input = props => {
	const initialState = {
		value: props.initValue || '',
		isValid: true,
		isClicked: false,
		typeSwitch: 'password',
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	const blurHendler = () => {
		dispatch({ type: 'CLICK' });
	};

	const typingHendler = event => {
		dispatch({ type: 'TYPING', value: event.target.value });
	};

	const switchPassViewHendler = event => {
		console.log(event.type);
		if (event.type === 'mousedown') {
			dispatch({ type: 'SWITCH_PASS_VIEW', typeSwitch: 'text' });
		} else if (event.type === 'mouseup') {
			dispatch({ type: 'SWITCH_PASS_VIEW', typeSwitch: 'password' });
		}
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
			<div style={{ display: 'table', width: '100%' }}>
				<input
					style={{ display: 'table-cell', width: '100%' }}
					id={props.id}
					value={state.value}
					onBlur={blurHendler}
					onChange={typingHendler}
					type={state.typeSwitch}
				/>
				<span
					style={{
						position: 'relative',
						display: 'table-cell',
						width: '8%',
						minWidth: '30px',
					}}
					onMouseDown={switchPassViewHendler}
					onMouseUp={switchPassViewHendler}
				>
					<img src=""></img>
				</span>
			</div>
		);
	}

	return (
		<div className="form-input">
			<label htmlFor={props.id}>{props.label}</label>
			{inputEl}
			{<p>input fields validation mesege</p>}
			{console.log({ ...state, props: props })}
		</div>
	);
};

export default Input;
