import React, { useReducer, useEffect } from 'react';
import reduce from 'lodash.reduce';

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
				value: 'sssss',
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

	const formatNumber = (text, patternArg) => {
		const { disableCountryCode, enableLongNumbers, autoFormat } = this.props;

		let pattern;
		if (disableCountryCode && patternArg) {
			pattern = patternArg.split(' ');
			pattern.shift();
			pattern = pattern.join(' ');
		} else {
			pattern = patternArg;
		}

		if (!text || text.length === 0) {
			return disableCountryCode ? '' : this.props.prefix;
		}

		// for all strings with length less than 3, just return it (1, 2 etc.)
		// also return the same text if the selected country has no fixed format
		if ((text && text.length < 2) || !pattern || !autoFormat) {
			return disableCountryCode ? text : this.props.prefix + text;
		}

		const formattedObject = reduce(
			pattern,
			(acc, character) => {
				if (acc.remainingText.length === 0) {
					return acc;
				}

				if (character !== '.') {
					return {
						formattedText: acc.formattedText + character,
						remainingText: acc.remainingText,
					};
				}

				const [head, ...tail] = acc.remainingText;

				return {
					formattedText: acc.formattedText + head,
					remainingText: tail,
				};
			},
			{
				formattedText: '',
				remainingText: text.split(''),
			}
		);

		let formattedNumber;
		if (enableLongNumbers) {
			formattedNumber =
				formattedObject.formattedText + formattedObject.remainingText.join('');
		} else {
			formattedNumber = formattedObject.formattedText;
		}

		// Always close brackets
		if (formattedNumber.includes('(') && !formattedNumber.includes(')'))
			formattedNumber += ')';
		return formattedNumber;
	};

	useEffect(() => {
		dispatch({ type: 'INITVALUE' });
	}, []);

	const dropdownHendler = () => {
		dispatch({ type: 'DROPDOWN' });
	};

	const countryPickHendler = country => {
		dispatch({ type: 'PICK', pickedCountry: country });
	};

	const inputPhoneHendler = event => {
		if (event.target.value.replace(/\D/g, '').length > 15) return;
		dispatch({ type: 'INPUT_PHONE', value: event.target.value });
	};

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
			/>
		</div>
	);
};

export default Phone;
