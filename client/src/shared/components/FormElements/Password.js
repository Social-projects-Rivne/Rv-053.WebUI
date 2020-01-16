import React, { useState } from 'react';

import './Password.css';

const Password = props => {
	const [state, setState] = useState('password');
	const switchPassViewHendler = event => {
		if (event.type === 'mousedown') {
			setState('text');
		} else if (event.type === 'mouseup' || 'mouseleave') {
			setState('password');
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
				type={state}
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
