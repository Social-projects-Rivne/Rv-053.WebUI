import React, { useState } from 'react';

import './Password.css';

const Password = props => {
	const [state, setState] = useState({ typeSwitch: 'password' });
	const switchPassViewHendler = event => {
		console.log(event.type);
		if (event.type === 'mousedown') {
			setState({ typeSwitch: 'text' });
		} else if (event.type === 'mouseup' || 'mouseleave') {
			setState({ typeSwitch: 'password' });
		}
	};

	return (
		<div style={{ display: 'table', width: '100%' }}>
			<input
				style={{ display: 'table-cell', width: '100%' }}
				id={props.id}
				value={props.value}
				onBlur={props.onBlur}
				onChange={props.onChange}
				type={state.typeSwitch}
			/>
			<span
				style={{
					position: 'relative',
					display: 'table-cell',
					width: '6%',
					minWidth: '30px',
				}}
				onMouseDown={switchPassViewHendler}
				onMouseUp={switchPassViewHendler}
				onMouseLeave={switchPassViewHendler}
			>
				<img src="" alt=""></img>
			</span>
		</div>
	);
};

export default Password;
