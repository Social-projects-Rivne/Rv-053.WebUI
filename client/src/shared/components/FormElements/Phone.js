import React, { useReducer, useEffect } from 'react';

import rawCountries from './PhoneCountriesData';
import './Phone.css';

const reducer = (state, action) => {
	switch (action.type) {
		default:
			return state;
		case 'DROPDOWN':
			return {
				...state,
				dropdownShow: !state.dropdownShow,
			};
		case 'PICK':
			return {
				...state,
				pickedCountry: action.pickedCountry,
				dropdownShow: !state.dropdownShow,
				prefix: '+' + action.pickedCountry.dialCode,
				value: '',
			};
		case 'INPUT_PHONE':
			return {
				...state,
				value: action.value.replace(state.prefix, ''),
			};
		case 'INITVALUE':
			return {
				...state,
				prefix: '+' + state.pickedCountry.dialCode,
			};
	}
};

const Phone = props => {
	const initialState = {
		pickedCountry: {
			name: 'Ukraine',
			regions: ['europe', 'ex-ussr'],
			iso2: 'ua',
			dialCode: '380',
			format: '+... (..) ... .. ..',
			priority: 0,
			hasAreaCodes: false,
		},
		dropdownShow: false,
		value: props.initValue || '',
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const counties = rawCountries.map(country => ({
		name: country[0],
		regions: country[1],
		iso2: country[2],
		dialCode: country[3],
		format: country[4] || undefined,
		priority: country[5] || 0,
		hasAreaCodes: country[6] ? true : false,
	}));

	useEffect(() => {
		dispatch({ type: 'INITVALUE' });
	}, []);

	const dropdownHendler = () => {
		dispatch({ type: 'DROPDOWN' });
	};

	const inputKeyDownHendler = event => {
		// console.log(event.charCode);
		if (event.charCode < 48 || event.charCode > 57) {
			event.preventDefault();
			//allow type numbers only
		}
	};

	const countryPickHendler = country => {
		dispatch({ type: 'PICK', pickedCountry: country });
	};

	const inputPhoneHendler = event => {
		if (event.target.value.replace(/\D/g, '').length > 15) return;
		const valueRegExp = /^[0-9\b]+$/;
		// console.log(event.target.value);
		if (
			event.target.value.replace(state.prefix, '') === '' ||
			valueRegExp.test(event.target.value.replace(state.prefix, ''))
		) {
			dispatch({
				type: 'INPUT_PHONE',
				value: event.target.value.replace(state.prefix, ''),
			});
		}
		//temporary, need better approach to send data to parent
		// props.onChange(event);
	};

	const { prefix, value } = state;
	const { onChange } = props;
	useEffect(() => {
		const phone = prefix + value;
		onChange(phone);
	}, [prefix, value, onChange]);

	const selecItem = (
		<ul style={{ padding: '0' }}>
			{counties.map(country => {
				return (
					<li
						key={country.iso2}
						className="dropdown-item cursor-pointer"
						onClick={() => countryPickHendler(country)}
					>
						<div className={`flag d-inline-block ${country.iso2} mr-2`}></div>
						<span className="d-inline-block mr-2">{country.name}</span>
						<span className="text-muted">+{country.dialCode}</span>
					</li>
				);
			})}
		</ul>
	);

	return (
		<div
			className={`input-group ${!props.isValid &&
				props.isClicked &&
				'is-invalid'}`}
		>
			<div className="input-group-prepend" onClick={dropdownHendler}>
				<span className="input-group-text cursor-pointer">
					<div
						className={`flag d-inline-block ${state.pickedCountry.iso2} mr-2`}
					></div>
					<div className="arrow"></div>
				</span>
			</div>
			{state.dropdownShow ? (
				<div className="dropdown-menu show">{selecItem}</div>
			) : null}
			<input
				className={props.className}
				id={props.id}
				value={state.prefix + state.value}
				onBlur={props.onBlur}
				onChange={inputPhoneHendler}
				onKeyPress={inputKeyDownHendler}
			/>
		</div>
	);
};

export default Phone;
