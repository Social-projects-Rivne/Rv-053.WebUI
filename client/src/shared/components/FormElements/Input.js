import React, { useReducer, useEffect, useCallback } from 'react';
import Selector from '../FormElements/Select';

import Password from './InputChildrens/Password';
import Phone from './InputChildrens/Phone';
import { validate } from '../../utilities/validation';
import RollingAnimation from '../UI/Animations/RollingAnimation';
import ShakingAnimation from '../UI/Animations/ShakingAnimation';
import './Input.css';

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return { state };
    case 'CLICK':
      return {
        ...state,
        isClicked: true
      };
    case 'TYPING':
      return {
        ...state,
        value: action.value,
        isValid: action.validations
          ? validate(action.value, action.validations)
          : action.isValid || false //add validation phore phone here
      };
  }
};

const Input = props => {
  const initialState = {
    value: props.initValue || '',
    isValid: props.initValid || false,
    isClicked: false
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const blurHandler = () => {
    dispatch({ type: 'CLICK' });
  };

  const typingHandler = event => {
    dispatch({
      type: 'TYPING',
      value: event.target.value,
      validations: props.validations
    });
  };
  const inputPhoneHandler = useCallback((value, isValid) => {
    dispatch({
      type: 'TYPING',
      value: value,
      isValid: isValid
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
        className={props.className + ` ${!state.isValid && state.isClicked && 'is-invalid'}`}
        id={props.id}
        value={state.value}
        onBlur={blurHandler}
        onChange={typingHandler}
        onClick={typingHandler}
        required
      />
    );
  } else if (props.type === 'number') {
    inputEl = (
      <input
        className={props.className + ` ${!state.isValid && state.isClicked && 'is-invalid'}`}
        id={props.id}
        rows={props.rows || 3}
        value={state.value}
        onBlur={blurHandler}
        onChange={typingHandler}
        onClick={typingHandler}
        type={props.type}
        autoComplete="off"
        required
        min={props.min}
        max={props.max}
      />
    );
  } else if (props.type === 'date') {
    inputEl = (
      <input
        id={props.id}
        rows={props.rows || 3}
        value={state.value}
        onBlur={blurHandler}
        onChange={typingHandler}
        onClick={typingHandler}
        autoComplete="off"
        required
      />
    );
  } else if (props.type === 'textarea') {
    inputEl = (
      <textarea
        className={props.className + ` ${!state.isValid && state.isClicked && 'is-invalid'}`}
        id={props.id}
        rows={props.rows || 3}
        value={state.value}
        onBlur={blurHandler}
        onChange={typingHandler}
        onClick={typingHandler}
        autoComplete="off"
        required
      />
    );
  } else if (props.type === 'password') {
    inputEl = (
      <Password
        className={props.className + ` ${!state.isValid && state.isClicked && 'is-invalid'}`}
        id={props.id}
        value={state.value}
        onBlur={blurHandler}
        onChange={typingHandler}
        onClick={typingHandler}
        isValid={state.isValid}
        isClicked={state.isClicked}
      />
    );
  } else if (props.type === 'phone') {
    inputEl = (
      <Phone
        className={props.className + ` ${!state.isValid && state.isClicked && 'is-invalid'}`}
        id={props.id}
        value={state.value}
        onBlur={blurHandler}
        onChange={inputPhoneHandler}
        onClick={typingHandler}
        isValid={state.isValid}
        isClicked={state.isClicked}
      />
    );
  } else if (props.type === 'location') {
    inputEl = (
      <input
        className={props.className + ` ${!state.isValid && state.isClicked && 'is-invalid'}`}
        id={props.id}
        value={state.value}
        onBlur={blurHandler}
        onChange={typingHandler}
        autoComplete="off"
        required
      />
    );
  } else if (props.type === 'select') {
    inputEl = (
      <Selector
        className={props.className + ` ${!state.isValid && state.isClicked && 'is-invalid'}`}
        id={props.id}
        value={state.value}
        onBlur={blurHandler}
        onChange={typingHandler}
      />
    );
  } else if (props.type === 'radio') {
    inputEl = (
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        name={props.name}
        onBlur={blurHandler}
        checked={props.checked}
      />
    );
  }
  console.log(inputEl);
  return (
    <>
      <ShakingAnimation triger={!state.isValid && state.isClicked} timout={100}>
        <div className="input__form">
          {inputEl}

          <label htmlFor={props.id} className="input__label-name">
            <span
              className={
                'input__label-content ' +
                (!state.isValid && state.isClicked ? 'input__invalid' : '')
              }
            >
              {props.label}
            </span>
          </label>
        </div>
      </ShakingAnimation>
      <RollingAnimation
        triger={!state.isValid && state.isClicked}
        timout={400}
        unmountOnExit
        mountOnEnter
      >
        <div className="input__invalid-feedback">{props.errorMessage}</div>
      </RollingAnimation>
    </>
  );
};

export default Input;
