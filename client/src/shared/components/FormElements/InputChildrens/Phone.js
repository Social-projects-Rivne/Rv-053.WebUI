import React, { useReducer, useEffect, useState } from 'react';

import rawCountries from './PhoneCountriesData';
import Selector from '../Select';
import './Phone.css';

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
    case 'DROPDOWN':
      return {
        ...state,
        dropdownShow: action.dropdownShow
      };
    case 'PICK':
      return {
        ...state,
        pickedCountry: action.pickedCountry,
        dropdownShow: false,
        prefix: '+' + action.pickedCountry.dialCode,
        value: '',
        phoneValue: '+' + action.pickedCountry.dialCode
      };
    case 'INPUT_PHONE':
      return {
        ...state,
        value: action.value,
        phoneValue: state.prefix + action.value.replace(state.prefix, '')
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
      hasAreaCodes: false
    },
    dropdownShow: false,
    value: props.initValue || '',
    prefix: '+380',
    phoneValue: ''
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [firstTimeLoadFlag, setFirstTimeLoadFlag] = useState(true);

  const countriesArr = rawCountries.map(country => ({
    name: country[0],
    regions: country[1],
    iso2: country[2],
    dialCode: country[3],
    format: country[4] || undefined,
    priority: country[5] || 0,
    hasAreaCodes: country[6] ? true : false
  }));

  const filterCountriesByRegion = (countriesArr, region) => {
    return countriesArr.filter(country => {
      return country.regions.some(element => {
        return element === region;
      });
    });
  };

  const filteredCountries = filterCountriesByRegion(countriesArr, 'europe');

  const countryItemsDropdownArray = filteredCountries.map(country => ({
    icon: 'flag ' + country.iso2,
    title: country.name,
    info: '+' + country.dialCode,
    country: country
  }));

  const dropdownHandler = event => {
    if (event.type === 'click') {
      dispatch({ type: 'DROPDOWN', dropdownShow: !state.dropdownShow });
    }
    if (event.type === 'mouseleave' || event.type === 'blur') {
      dispatch({ type: 'DROPDOWN', dropdownShow: false });
    }
  };

  const inputKeyDownHandler = event => {
    if (event.charCode < 48 || event.charCode > 57) {
      event.preventDefault();
    }
  };

  const firstTimeLoadSetPrefix = () => {
    if (firstTimeLoadFlag) {
      setFirstTimeLoadFlag(false);
      dispatch({ type: 'PICK', pickedCountry: initialState.pickedCountry });
    }
  };

  const countryPickHandler = country => {
    setFirstTimeLoadFlag(false);
    dispatch({ type: 'PICK', pickedCountry: country.country });
  };

  const inputPhoneHandler = event => {
    const targetValueLength = event.target.value.replace(/\D/g, '').length;
    const targetValueWithoutPrefix = event.target.value.replace(state.prefix, '');
    if (targetValueLength > 15 || targetValueLength < state.prefix.length - 1) return;
    const valueRegExp = /^[0-9\b\W]+$/;
    if (targetValueWithoutPrefix === '' || valueRegExp.test(targetValueWithoutPrefix)) {
      let phoneVal = null;
      if (state.pickedCountry.format) {
        const mask = state.pickedCountry.format.replace('+', '');
        let i = 0;
        const val = event.target.value.replace(/[\W]/g, '');
        phoneVal = mask.replace(/./g, a => {
          return /[.\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });
      } else {
        phoneVal = event.target.value.replace(state.prefix, '');
      }
      dispatch({
        type: 'INPUT_PHONE',
        value: phoneVal.replace(state.prefix.replace('+', ''), '')
      });
    }
  };

  const { prefix, value, phoneValue } = state;
  const { onChange } = props;
  useEffect(() => {
    if (!value) {
      onChange('', false);
    } else if (value) {
      onChange(phoneValue, true);
    }
  }, [prefix, value, onChange, phoneValue]);

  return (
    <>
      <div
        className="input__input-group-append"
        onClick={dropdownHandler}
        onBlur={dropdownHandler}
        tabIndex="-1"
      >
        <span className="phone__flag-container">
          <div className={'mb-1 ' + (state.dropdownShow ? 'arrow-up' : 'arrow-down')}></div>
          <div className={`flag d-inline-block ${state.pickedCountry.iso2} ml-2`}></div>
        </span>
      </div>
      <Selector
        triger={state.dropdownShow}
        items={countryItemsDropdownArray}
        onChange={countryPickHandler}
      />
      <input
        className={props.className}
        id={props.id}
        value={state.phoneValue}
        onBlur={props.onBlur}
        onChange={inputPhoneHandler}
        onKeyPress={inputKeyDownHandler}
        onClick={firstTimeLoadSetPrefix}
        autoComplete="off"
        required
      />
    </>
  );
};

export default Phone;
