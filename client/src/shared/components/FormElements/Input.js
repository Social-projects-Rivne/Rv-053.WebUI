import React, { useReducer, useEffect, useCallback, useRef, useLayoutEffect } from 'react';

import { validate } from '../../utilities/validation';
import Password from './InputChildrens/Password';
import Phone from './InputChildrens/Phone';
import RollingAnimation from '../UI/Animations/RollingAnimation';
import ShakingAnimation from '../UI/Animations/ShakingAnimation';
import './Input.css';

const TYPE_INPUT = 'input';
const TYPE_TEXTAREA = 'textarea';
const TYPE_NUMBER = 'number';
const TYPE_PASSWORD = 'password';
const TYPE_PHONE = 'phone';
const TYPE_RADIO = 'radio';
const TYPE_FILE = 'file';

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
          : action.isValid || false // TODO: add validation phore phone here
      };
  }
};

const Input = props => {
  const textareaRef = useRef(null);
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
    dispatch({
      type: 'TYPING',
      value: event.target.type === 'file' ? event.target.files[0] : event.target.value,
      validations: props.validations
    });
  };

  const textareaKeyDownHandler = useCallback(() => {
    if (!textareaRef.current) {
      return;
    }
    const textareaStyle = textareaRef.current.style;
    const textareaLabelStyle = texareaLabelRef.current.style;
    textareaStyle.height = 'inherit';
    textareaStyle.height = `${Math.min(textareaRef.current.scrollHeight, 300)}px`;
    if (state.value.length < 1 || props.initValue < 1) {
      textareaLabelStyle.bottom = '0px';
      textareaLabelStyle.transition = 'all 0.3s ease';
    } else {
      textareaLabelStyle.transition = 'none';
      textareaLabelStyle.bottom = `${textareaRef.current.scrollHeight - 24}px`;
      textareaLabelStyle.bottom = `${Math.min(textareaRef.current.scrollHeight, 300) - 24}px`;
    }
  }, [props.initValue, state.value.length]);

  useLayoutEffect(() => {
    textareaKeyDownHandler();
  }, [textareaKeyDownHandler]);

  const inputPhoneHandler = useCallback((value, isValid) => {
    dispatch({
      type: 'TYPING',
      value: value,
      isValid: isValid
      // TODO: validations: props.validations,
    });
  }, []);

  const { id, onInput } = props;
  const { value, isValid } = state;
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, onInput, isValid]);

  const inputElementsDictionary = {
    [TYPE_INPUT]: (
      <input
        className={props.className + ` ${!state.isValid && state.isClicked && 'is-invalid'}`}
        id={props.id}
        value={state.value || props.initValue}
        onBlur={blurHandler}
        onChange={typingHandler}
        onClick={typingHandler}
        required
      />
    ),
    [TYPE_NUMBER]: (
      <input
        className={props.className + ` ${!state.isValid && state.isClicked && 'is-invalid'}`}
        id={props.id}
        value={state.value}
        onBlur={blurHandler}
        onChange={typingHandler}
        onClick={typingHandler}
        type="number"
        autoComplete="off"
        required
        min={props.min}
        max={props.max}
      />
    ),
    [TYPE_TEXTAREA]: (
      <textarea
        className={props.className + ` ${!state.isValid && state.isClicked && 'is-invalid'}`}
        id={props.id}
        rows={1}
        ref={textareaRef}
        value={state.value}
        onBlur={blurHandler}
        onChange={typingHandler}
        onKeyDown={textareaKeyDownHandler}
        autoComplete="off"
        required
      />
    ),
    [TYPE_PASSWORD]: (
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
    ),
    [TYPE_PHONE]: (
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
    ),
    [TYPE_RADIO]: (
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        name={props.name}
        onBlur={blurHandler}
        checked={props.checked}
        onChange={typingHandler}
      />
    ),
    [TYPE_FILE]: (
      <input
        ref={props.refer}
        type={props.type}
        id={props.id}
        value={props.value}
        name={props.name}
        onBlur={blurHandler}
        onChange={typingHandler}
      />
    )
  };

  const inputElement = type => {
    return inputElementsDictionary[type];
  };

  return (
    <>
      <ShakingAnimation triger={!state.isValid && state.isClicked} timout={100}>
        <div className="input__form" style={{ display: props.type !== 'file' ? 'block' : 'none' }}>
          {inputElement(props.type)}
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
