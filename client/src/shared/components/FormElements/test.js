import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import memoize from 'lodash.memoize';
import reduce from 'lodash.reduce';
import startsWith from 'lodash.startswith';
import classNames from 'classnames';

import CountryData from './CountryData.js';

class PhoneInput extends React.Component {
	static propTypes = {
		country: PropTypes.string,
		value: PropTypes.string,

		placeholder: PropTypes.string,
		searchPlaceholder: PropTypes.string,
		disabled: PropTypes.bool,

		containerClass: PropTypes.string,
		inputClass: PropTypes.string,
		buttonClass: PropTypes.string,
		dropdownClass: PropTypes.string,
		searchClass: PropTypes.string,

		autoFormat: PropTypes.bool,

		enableAreaCodes: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.arrayOf(PropTypes.string),
		]),

		disableCountryCode: PropTypes.bool,
		disableDropdown: PropTypes.bool,
		enableLongNumbers: PropTypes.bool,
		countryCodeEditable: PropTypes.bool,
		enableSearch: PropTypes.bool,
		disableSearchIcon: PropTypes.bool,

		regions: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.arrayOf(PropTypes.string),
		]),

		inputProps: PropTypes.object,
		localization: PropTypes.object,
		masks: PropTypes.object,
		areaCodes: PropTypes.object,

		preserveOrder: PropTypes.arrayOf(PropTypes.string),

		defaultMask: PropTypes.string,
		prefix: PropTypes.string,
		copyNumbersOnly: PropTypes.bool,
		renderStringAsFlag: PropTypes.string,
		autocompleteSearch: PropTypes.bool,
		jumpCursorToEnd: PropTypes.bool,

		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		onBlur: PropTypes.func,
		onClick: PropTypes.func,
		onKeyDown: PropTypes.func,
		isValid: PropTypes.func,
	};

	static defaultProps = {
		country: '',
		value: '',

		onlyCountries: [],
		preferredCountries: [],
		excludeCountries: [],

		placeholder: '1 (702) 123-4567',
		searchPlaceholder: 'search',
		flagsImagePath: './flags.png',
		disabled: false,

		containerStyle: {},
		inputStyle: {},
		buttonStyle: {},
		dropdownStyle: {},
		searchStyle: {},

		containerClass: 'react-tel-input',
		inputClass: '',
		buttonClass: '',
		dropdownClass: '',
		searchClass: '',

		autoFormat: true,
		enableAreaCodes: false,
		isValid: (inputNumber, onlyCountries) => true,
		disableCountryCode: false,
		disableDropdown: false,
		enableLongNumbers: false,
		countryCodeEditable: true,
		enableSearch: false,
		disableSearchIcon: false,

		regions: '',

		inputProps: {},
		localization: {},
		masks: {},
		areaCodes: {},

		preserveOrder: [],

		defaultMask: '... ... ... ... ..', // prefix+dialCode+' '+defaultMask
		prefix: '+',
		copyNumbersOnly: true,
		renderStringAsFlag: '',
		autocompleteSearch: false,
		jumpCursorToEnd: true,

		onEnterKeyPress: () => {},
	};

	constructor(props) {
		super(props);
		let { onlyCountries, preferredCountries } = new CountryData(
			props.enableAreaCodes,
			props.regions,
			props.onlyCountries,
			props.preferredCountries,
			props.excludeCountries,
			props.preserveOrder,
			props.localization,
			props.masks,
			props.areaCodes,
			props.prefix
		);

		let countryGuess;
		if (inputNumber.length > 1) {
			// Country detect by value field
			countryGuess =
				this.guessSelectedCountry(
					inputNumber.substring(0, 6),
					onlyCountries,
					props.country
				) || 0;
		} else if (props.country) {
			// Default country
			countryGuess = onlyCountries.find(o => o.iso2 == props.country) || 0;
		} else {
			// Empty params
			countryGuess = 0;
		}

		const dialCode =
			inputNumber.length < 2 &&
			countryGuess &&
			!startsWith(inputNumber.replace(/\D/g, ''), countryGuess.dialCode)
				? countryGuess.dialCode
				: '';

		let formattedNumber;
		formattedNumber =
			inputNumber === '' && countryGuess === 0
				? ''
				: this.formatNumber(
						(props.disableCountryCode ? '' : dialCode) +
							inputNumber.replace(/\D/g, ''),
						countryGuess.name ? countryGuess.format : undefined
				  );

		const highlightCountryIndex = onlyCountries.findIndex(
			o => o == countryGuess
		);

		this.state = {
			formattedNumber,
			onlyCountries,
			preferredCountries,
			country: props.country,
			selectedCountry: countryGuess,
			highlightCountryIndex,
			queryString: '',
			showDropdown: false,
			freezeSelection: false,
			debouncedQueryStingSearcher: debounce(this.searchCountry, 250),
			searchValue: '',
		};
	}

	componentDidMount() {
		if (document.addEventListener) {
			document.addEventListener('mousedown', this.handleClickOutside);
		}
	}

	componentWillUnmount() {
		if (document.removeEventListener) {
			document.removeEventListener('mousedown', this.handleClickOutside);
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.country && nextProps.country !== this.state.country) {
			this.updateCountry(nextProps.country);
		} else if (nextProps.value !== this.state.formattedNumber) {
			this.updateFormattedNumber(nextProps.value);
		}
	}

	getProbableCandidate = memoize(queryString => {
		if (!queryString || queryString.length === 0) {
			return null;
		}
		// don't include the preferred countries in search
		const probableCountries = this.state.onlyCountries.filter(country => {
			return startsWith(country.name.toLowerCase(), queryString.toLowerCase());
		}, this);
		return probableCountries[0];
	});

	guessSelectedCountry = memoize((inputNumber, onlyCountries, country) => {
		const secondBestGuess = onlyCountries.find(o => o.iso2 == country);
		if (inputNumber.trim() === '') return secondBestGuess;

		const bestGuess = onlyCountries.reduce(
			(selectedCountry, country) => {
				if (startsWith(inputNumber, country.dialCode)) {
					if (country.dialCode.length > selectedCountry.dialCode.length) {
						return country;
					}
					if (
						country.dialCode.length === selectedCountry.dialCode.length &&
						country.priority < selectedCountry.priority
					) {
						return country;
					}
				}
				return selectedCountry;
			},
			{ dialCode: '', priority: 10001 },
			this
		);

		if (!bestGuess.name) return secondBestGuess;
		return bestGuess;
	});

	// Hooks for updated props
	updateCountry = country => {
		let newSelectedCountry;
		if (country.indexOf(0) >= '0' && country.indexOf(0) <= '9') {
			newSelectedCountry = this.state.onlyCountries.find(
				o => o.dialCode == +country
			);
		} else {
			newSelectedCountry = this.state.onlyCountries.find(
				o => o.iso2 == country
			);
		}
		if (newSelectedCountry && newSelectedCountry.dialCode) {
			this.setState({
				country: country,
				selectedCountry: newSelectedCountry,
				formattedNumber: this.props.disableCountryCode
					? ''
					: this.props.prefix + newSelectedCountry.dialCode,
			});
		}
	};

	updateFormattedNumber(value) {
		const { onlyCountries, country } = this.state;
		let newSelectedCountry;
		let inputNumber = value;
		let formattedNumber = value;

		// if inputNumber does not start with this.props.prefix, then use default country's dialing prefix,
		// otherwise use logic for finding country based on country prefix.
		if (!startsWith(inputNumber, this.props.prefix)) {
			newSelectedCountry =
				this.state.selectedCountry ||
				onlyCountries.find(o => o.iso2 == country);
			const dialCode =
				newSelectedCountry &&
				!startsWith(inputNumber.replace(/\D/g, ''), newSelectedCountry.dialCode)
					? newSelectedCountry.dialCode
					: '';
			formattedNumber = this.formatNumber(
				(this.props.disableCountryCode ? '' : dialCode) +
					inputNumber.replace(/\D/g, ''),
				newSelectedCountry
					? newSelectedCountry.format || this.getDefaultMask(newSelectedCountry)
					: undefined
			);
		} else {
			inputNumber = inputNumber.replace(/\D/g, '');
			newSelectedCountry =
				this.guessSelectedCountry(
					inputNumber.substring(0, 6),
					onlyCountries,
					country
				) || this.state.selectedCountry;
			formattedNumber = newSelectedCountry
				? this.formatNumber(
						inputNumber,
						newSelectedCountry.format || this.getDefaultMask(newSelectedCountry)
				  )
				: inputNumber;
		}

		this.setState({ selectedCountry: newSelectedCountry, formattedNumber });
	}

	getDefaultMask = country =>
		this.props.prefix +
		''.padEnd(country.dialCode.length, '.') +
		' ' +
		this.props.defaultMask;

	// View methods
	scrollTo = (country, middle) => {
		if (!country) return;
		const container = this.dropdownRef;
		if (!container || !document.body) return;

		const containerHeight = container.offsetHeight;
		const containerOffset = container.getBoundingClientRect();
		const containerTop = containerOffset.top + document.body.scrollTop;
		const containerBottom = containerTop + containerHeight;

		const element = country;
		const elementOffset = element.getBoundingClientRect();

		const elementHeight = element.offsetHeight;
		const elementTop = elementOffset.top + document.body.scrollTop;
		const elementBottom = elementTop + elementHeight;

		let newScrollTop = elementTop - containerTop + container.scrollTop;
		const middleOffset = containerHeight / 2 - elementHeight / 2;

		if (
			this.props.enableSearch
				? elementTop < containerTop + 32
				: elementTop < containerTop
		) {
			// scroll up
			if (middle) {
				newScrollTop -= middleOffset;
			}
			container.scrollTop = newScrollTop;
		} else if (elementBottom > containerBottom) {
			// scroll down
			if (middle) {
				newScrollTop += middleOffset;
			}
			const heightDifference = containerHeight - elementHeight;
			container.scrollTop = newScrollTop - heightDifference;
		}
	};

	formatNumber = (text, patternArg) => {
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

	// return country data from state
	getCountryData = () => {
		if (!this.state.selectedCountry) return {};
		return {
			name: this.state.selectedCountry.name || '',
			dialCode: this.state.selectedCountry.dialCode || '',
			countryCode: this.state.selectedCountry.iso2 || '',
			format: this.state.selectedCountry.format || '',
		};
	};

	handleInput = e => {
		let formattedNumber = this.props.disableCountryCode
			? ''
			: this.props.prefix;
		let newSelectedCountry = this.state.selectedCountry;
		let freezeSelection = this.state.freezeSelection;

		if (!this.props.countryCodeEditable) {
			const mainCode = newSelectedCountry.hasAreaCodes
				? this.state.onlyCountries.find(
						o => o.iso2 === newSelectedCountry.iso2 && o.mainCode
				  ).dialCode
				: newSelectedCountry.dialCode;

			const updatedInput = this.props.prefix + mainCode;
			if (e.target.value.slice(0, updatedInput.length) !== updatedInput) return;
		}

		// Does not exceed 15 digit phone number limit
		if (e.target.value.replace(/\D/g, '').length > 15) return;

		let caretPosition = e.target.selectionStart;
		const oldFormattedText = this.state.formattedNumber;
		const diff = formattedNumber.length - oldFormattedText.length;

		this.setState(
			{
				formattedNumber: formattedNumber,
				freezeSelection: freezeSelection,
				selectedCountry: newSelectedCountry,
			},
			() => {
				if (diff > 0) {
					caretPosition = caretPosition - diff;
				}

				const lastChar = formattedNumber.charAt(formattedNumber.length - 1);

				if (lastChar == ')') {
					this.numberInputRef.setSelectionRange(
						formattedNumber.length - 1,
						formattedNumber.length - 1
					);
				} else if (
					caretPosition > 0 &&
					oldFormattedText.length >= formattedNumber.length
				) {
					this.numberInputRef.setSelectionRange(caretPosition, caretPosition);
				}

				if (this.props.onChange)
					this.props.onChange(
						this.state.formattedNumber,
						this.getCountryData(),
						e
					);
			}
		);
	};

	handleInputClick = e => {
		this.setState({ showDropdown: false });
		if (this.props.onClick) this.props.onClick(e, this.getCountryData());
	};

	getCountryDropdownList = () => {
		const {
			preferredCountries,
			highlightCountryIndex,
			showDropdown,
			searchValue,
		} = this.state;
		const {
			enableSearch,
			disableSearchIcon,
			searchClass,
			searchStyle,
			searchPlaceholder,
			autocompleteSearch,
		} = this.props;

		const searchedCountries = this.getSearchFilteredCountries();

		let countryDropdownList = searchedCountries.map((country, index) => {
			const itemClasses = classNames({
				country: true,
				preferred: country.iso2 === 'us' || country.iso2 === 'gb',
				active: country.iso2 === 'us',
				highlight: highlightCountryIndex === index,
			});

			const inputFlagClasses = `flag ${country.iso2}`;

			return (
				<li
					ref={el => (this[`flag_no_${index}`] = el)}
					key={`flag_no_${index}`}
					data-flag-key={`flag_no_${index}`}
					className={itemClasses}
					data-dial-code="1"
					tabIndex="0"
					data-country-code={country.iso2}
					onClick={() => this.handleFlagItemClick(country)}
				>
					<div className={inputFlagClasses} />
					<span className="country-name">
						{this.getDropdownCountryName(country)}
					</span>
					<span className="dial-code">
						{country.format
							? this.formatNumber(country.dialCode, country.format)
							: this.props.prefix + country.dialCode}
					</span>
				</li>
			);
		});

		const dashedLi = <li key={'dashes'} className="divider" />;
		// let's insert a dashed line in between preffered countries and the rest
		preferredCountries.length > 0 &&
			(!enableSearch || (enableSearch && !searchValue.trim())) &&
			countryDropdownList.splice(preferredCountries.length, 0, dashedLi);

		const dropDownClasses = classNames({
			[this.props.dropdownClass]: true,
			'country-list': true,
			hide: !showDropdown,
		});

		return (
			<ul
				ref={el => (this.dropdownRef = el)}
				className={dropDownClasses}
				style={this.props.dropdownStyle}
			>
				{enableSearch && (
					<li
						className={classNames({
							search: true,
							[searchClass]: searchClass,
						})}
					>
						{!disableSearchIcon && (
							<span
								className={classNames({
									'search-emoji': true,
									[`${searchClass}-emoji`]: searchClass,
								})}
								role="img"
								aria-label="Magnifying glass"
							>
								&#128270;
							</span>
						)}
						<input
							className={classNames({
								'search-box': true,
								[`${searchClass}-box`]: searchClass,
							})}
							style={searchStyle}
							id="search-box"
							type="search"
							placeholder={searchPlaceholder}
							autoFocus={true}
							autoComplete={autocompleteSearch ? 'on' : 'off'}
							value={searchValue}
							onChange={this.handleSearchChange}
						/>
					</li>
				)}
				{countryDropdownList.length > 0 ? (
					countryDropdownList
				) : (
					<li className="no-entries-message">
						<span>No entries to show.</span>
					</li>
				)}
			</ul>
		);
	};

	render() {
		const {
			onlyCountries,
			selectedCountry,
			showDropdown,
			formattedNumber,
		} = this.state;
		const { disableDropdown, renderStringAsFlag } = this.props;

		const arrowClasses = classNames({ arrow: true, up: showDropdown });
		const inputClasses = classNames({
			[this.props.inputClass]: true,
			'form-control': true,
			'invalid-number': !this.props.isValid(
				formattedNumber.replace(/\D/g, ''),
				onlyCountries
			),
			open: showDropdown,
		});
		const selectedFlagClasses = classNames({
			'selected-flag': true,
			open: showDropdown,
		});
		const flagViewClasses = classNames({
			[this.props.buttonClass]: true,
			'flag-dropdown': true,
			open: showDropdown,
		});
		const inputFlagClasses = `flag ${selectedCountry && selectedCountry.iso2}`;

		return (
			<div
				className={this.props.containerClass}
				style={this.props.style || this.props.containerStyle}
				onKeyDown={this.handleKeydown}
			>
				<input
					className={inputClasses}
					id="phone-form-control"
					style={this.props.inputStyle}
					onChange={this.handleInput}
					onClick={this.handleInputClick}
					onDoubleClick={this.handleDoubleClick}
					onFocus={this.handleInputFocus}
					onBlur={this.handleInputBlur}
					onCopy={this.handleInputCopy}
					value={formattedNumber}
					ref={el => (this.numberInputRef = el)}
					onKeyDown={this.handleInputKeyDown}
					placeholder={this.props.placeholder}
					disabled={this.props.disabled}
					type="tel"
					{...this.props.inputProps}
				/>

				<div
					className={flagViewClasses}
					id="flag-dropdown"
					style={this.props.buttonStyle}
					ref={el => (this.dropdownContainerRef = el)}
					tabIndex="0"
					role="button"
				>
					{renderStringAsFlag ? (
						<div className={selectedFlagClasses}>{renderStringAsFlag}</div>
					) : (
						<div
							onClick={
								disableDropdown ? undefined : this.handleFlagDropdownClick
							}
							className={selectedFlagClasses}
							title={
								selectedCountry
									? `${selectedCountry.name}: + ${selectedCountry.dialCode}`
									: ''
							}
						>
							<div className={inputFlagClasses}>
								{!disableDropdown && <div className={arrowClasses}></div>}
							</div>
						</div>
					)}

					{showDropdown && this.getCountryDropdownList()}
				</div>
			</div>
		);
	}
}

export default PhoneInput;
