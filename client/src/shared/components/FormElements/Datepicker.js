import React, { useEffect, useReducer } from 'react';
import Datetime from 'react-datetime';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: true
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true
      };
    default:
      return state;
  }
};

const Datepicker = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
    isTouched: false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, onInput, isValid]);

  const changeHandler = event => {
    const date = event.unix() || new Date();
    dispatch({ type: 'CHANGE', val: event.unix() });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };

  return (
    <div
      className={`form-group ${!inputState.isValid &&
        inputState.isTouched &&
        'form-control--invalid'} `}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <Datetime
        onChange={changeHandler}
        onBlur={touchHandler}
        inputProps={{ placeholder: 'Date', id: 'date' }}
        closeOnSelect={true}
        closeOnTab={true}
        disableCloseOnClickOutside={true}
      />

      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};
export default Datepicker;
