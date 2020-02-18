import React, { useReducer, useEffect } from 'react';

import rawCountries from './PhoneCountriesData';
import './Phone.css';
import Transition from 'react-transition-group/Transition';

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
    phoneValue: '+380'
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const counties = rawCountries.map(country => ({
    name: country[0],
    regions: country[1],
    iso2: country[2],
    dialCode: country[3],
    format: country[4] || undefined,
    priority: country[5] || 0,
    hasAreaCodes: country[6] ? true : false
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

  const countryPickHandler = country => {
    dispatch({ type: 'PICK', pickedCountry: country });
  };

  const inputPhoneHandler = event => {
    const targetValLength = event.target.value.replace(/\D/g, '').length;
    const targetValFree = event.target.value.replace(state.prefix, '');
    if (targetValLength > 15 || targetValLength < state.prefix.length - 1) return;
    const valueRegExp = /^[0-9\b\W]+$/;
    if (targetValFree === '' || valueRegExp.test(targetValFree)) {
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

  const selecItem = (
    <ul style={{ padding: '0' }}>
      {counties.map(country => {
        return (
          <li
            key={country.iso2}
            className="dropdown-item cursor-pointer"
            onClick={() => countryPickHandler(country)}
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
    <div className={`input-group ${!props.isValid && props.isClicked && 'is-invalid'}`}>
      <div
        className="input-group-prepend"
        onClick={dropdownHandler}
        onBlur={dropdownHandler}
        tabIndex="-1"
      >
        <span className="input-group-text cursor-pointer">
          <div className={`flag d-inline-block ${state.pickedCountry.iso2} mr-2`}></div>
          <div className="arrow"></div>
        </span>
      </div>
      <Transition
        in={state.dropdownShow}
        timeout={{ enter: 0, exit: 300 }}
        mountOnEnter
        unmountOnExit
      >
        {transition => {
          const cssClasses = [
            'dropdown-menu',
            'show',
            transition === 'entering'
              ? 'dropdown-menu-hide'
              : transition === 'entered'
              ? 'dropdown-menu-show'
              : transition === 'exiting'
              ? 'dropdown-menu-hide'
              : null
          ];
          return (
            <div className={cssClasses.join(' ')} onMouseLeave={dropdownHandler}>
              {selecItem}
            </div>
          );
        }}
      </Transition>
      <input
        className={props.className}
        id={props.id}
        value={state.phoneValue}
        onBlur={props.onBlur}
        onChange={inputPhoneHandler}
        onKeyPress={inputKeyDownHandler}
      />
    </div>
  );
};

export default Phone;
