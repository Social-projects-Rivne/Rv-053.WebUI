import React, { useReducer, useEffect, useCallback, useRef } from 'react';

import { validate } from '../../utilities/validation';
import Password from './InputChildrens/Password';
import Phone from './InputChildrens/Phone';
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
  const texareaLabelRef = useRef(null);
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
    if (event.target.type === 'file') {
      dispatch({
        type: 'TYPING',
        value: event.target.files[0],
        validations: props.validations
      });
    } else {
      dispatch({
        type: 'TYPING',
        value: event.target.value,
        validations: props.validations
      });
    }
  };

  const keyDownHandler = event => {
    event.target.style.height = 'inherit';
    event.target.style.height = `${event.target.scrollHeight}px`;
    event.target.style.height = `${Math.min(event.target.scrollHeight, 300)}px`;
    if (state.value.length < 1 || props.initValue < 1) {
      texareaLabelRef.current.style.bottom = '0px';
      texareaLabelRef.current.style.transition = 'all 0.3s ease';
    } else {
      texareaLabelRef.current.style.transition = 'none';
      texareaLabelRef.current.style.bottom = `${event.target.scrollHeight - 24}px`;
      texareaLabelRef.current.style.bottom = `${Math.min(event.target.scrollHeight, 300) - 24}px`;
    }
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
        value={state.value || props.initValue}
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
        rows={1}
        value={state.value}
        onBlur={blurHandler}
        onChange={event => {
          typingHandler(event);
          keyDownHandler(event);
        }}
        onClick={event => {
          typingHandler(event);
          keyDownHandler(event);
        }}
        onKeyDown={keyDownHandler}
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
  } else if (props.type === 'radio') {
    inputEl = (
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        name={props.name}
        onBlur={blurHandler}
        checked={props.checked}
        onChange={typingHandler}
      />
    );
  } else if (props.type === 'file') {
    inputEl = (
      <input
        ref={props.refer}
        type={props.type}
        id={props.id}
        value={props.value}
        name={props.name}
        onBlur={blurHandler}
        onChange={typingHandler}
      />
    );
  }

  return (
    <>
      <ShakingAnimation triger={!state.isValid && state.isClicked} timout={100}>
        <div className="input__form" style={{ display: props.type !== 'file' ? 'block' : 'none' }}>
          {inputEl}

          <label htmlFor={props.id} className="input__label-name">
            <span
              className={
                'input__label-content ' +
                (!state.isValid && state.isClicked ? 'input__invalid' : '')
              }
              ref={texareaLabelRef}
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
