import React, { useEffect, useReducer } from 'react';

import './Price.css';

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

const Price = (props) =>{
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
  console.log(inputState.value)
    return(  
  <div className="form-group">
        <label>Price</label>
    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
      <input 
      type="number" 
      min={0} 
      className="form-control currency-amount" 
      id="price" 
      placeholder="0.00" 
      onBlur={touchHandler}
      onChange={changeHandler}
      value={inputState.value}
      size="8"/>
      <div className="input-group-addon currency-addon">
      
        <select 
        onBlur={touchHandler}
        onChange={changeHandler}
        value={inputState.value}
        className="currency-selector">
          <option data-symbol="$" data-placeholder="0.00" defaultValue>USD</option>
          <option data-symbol="€" data-placeholder="0.00">EUR</option>
           <option data-symbol="₴" data-placeholder="0.00">HRN</option>   
        </select>
      </div>
    </div>
    </div>
  


    )
}


export default Price;