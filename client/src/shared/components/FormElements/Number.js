import React, { useEffect, useReducer } from "react";



const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: true
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true
      };
    default:
      return state;
  }
};

const Number = props => {
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
    dispatch({ type: "CHANGE", val: event.target.value });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH"
    });
  };
  
  return (
    <div className="price-div">
      <label>Enter the price</label>
      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
        <input
          type="number"
          min={0}
          className="form-control"
          id="price"
          placeholder="0.00"
          onBlur={touchHandler}
          onChange={changeHandler}
          value={inputState.value}
          size="8"
        />
      </div>
    </div>
  );
};

export default Number;