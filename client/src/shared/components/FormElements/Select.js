import React, { useEffect, useReducer } from 'react';

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
        }
    default:
      return state;
  }
}

const Selector = props => {
  
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    isTouched: false
  });

  const { id, onInput } = props;
	const { value, isValid } = inputState;
	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, value, onInput, isValid]);

  const changeHandler = event => {
      dispatch({type: 'CHANGE', val: event.target.value})
  }

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    })
  }
  
  return <div className={`form-group ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'} `}>
    <label htmlFor={props.id}>{props.label}</label>
<select 
  id={props.id}
  type={props.type}
  placeholder={props.placeholder}
  onBlur={touchHandler}
  onChange={changeHandler}
  value={inputState.value}
  className="form-control"
>
  <option disabled label="--Select category--"></option>
  <option value ='music'>Music</option>
  <option value ='sport'>Sport</option>
  <option value ='fashion'>Fashion</option>
  <option value ='education'>Education</option>
  <option value ='entertaiment'>Entertaiment</option>
</select>
{!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
      </div>
}

export default Selector;
