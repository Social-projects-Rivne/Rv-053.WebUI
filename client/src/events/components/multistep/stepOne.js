import React, { useReducer, useEffect } from "react";
// import DatePicker from "react-datepicker";

import Input from "../../../shared/components/FormElements/Input";
import Selector from "../../../shared/components/FormElements/Select";
import { useForm } from "../../../shared/hooks/useForm";
import Card from "../../../shared/components/UI/Card";
import "../../pages/AddEvent.css";

import {
  VAL_MIN_LENGTH,
  VAL_REQUIRED
} from "../../../shared/utilities/validation";

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

const StepOne = props => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      select: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      },
      location: {
        value: "",
        isValid: false
      },
      price: {
        value: "",
        isValid: false
      },
      age: {
        value: "",
        isValid: false
      },
      amount: {
        value: "",
        isValid: false
      }
    },

    false
  );
  const cont = e => {
    e.preventDefault();
    props.nextStep();
  };
  return (
    <div className="form-group">
      <Input
        id="title"
        type="input"
        label="Name event"
        validations={[VAL_REQUIRED()]}
        onInput={inputHandler}
        errorMessage="The field is required"
        className="form-control"
      />

      <Selector
        type="select"
        id="select"
        label="Choose category"
        onInput={inputHandler}
        validations={[VAL_REQUIRED()]}
        errorMessage="The field is required"
        className="form-control"
      />

      <Input
        id="description"
        type="textarea"
        label="Write description"
        onInput={inputHandler}
        validations={[VAL_MIN_LENGTH(5)]}
        errorMessage="Write at least 5 characters!"
        className="form-control"
      />
      <div className="addBtn">
      <button className="btn btn-outline-success" onClick={cont}>
        Next
      </button>
      </div>
    </div>
  );
};

export default StepOne;
