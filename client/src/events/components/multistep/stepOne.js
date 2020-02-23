import React, { useState } from "react";

import Datetime from "react-datetime";

import Input from "../../../shared/components/FormElements/Input";
import Selector from "../../../shared/components/FormElements/Select";

// import "../../pages/AddEvent.css";

import {
  VAL_MIN_LENGTH,
  VAL_REQUIRED
} from "../../../shared/utilities/validation";

const StepOne = props => {
  const [dateState, setDateState] = useState({
    date: new Date(),
    format: "DD/MM/YYYY"
  });
  const onChangeDate = newDate => {
    return setDateState({ date: newDate });
  };
  const cont = e => {
    e.preventDefault();
    props.nextStep();
  };
  const { date, format, mode, inputFormat } = dateState;
  return (
    <div className="form-group">
      <form onSubmit={props.submitFormHandler}>
        <Input
          id="title"
          type="input"
          label="Name event"
          validations={[VAL_REQUIRED()]}
          onInput={props.inputHandler}
          errorMessage="The field is required"
          className="form-control"
        />
        <Selector
          type="select"
          id="select"
          label="Choose category"
          onInput={props.inputHandler}
          validations={[VAL_REQUIRED()]}
          errorMessage="The field is required"
          className="form-control"
        />
        <Input
          id="description"
          type="textarea"
          label="Write description"
          onInput={props.inputHandler}
          validations={[VAL_MIN_LENGTH(5)]}
          errorMessage="Write at least 5 characters!"
          className="form-control"
        />
        {/* https://github.com/YouCanBookMe/react-datetime */}
        <Datetime
          className="form-group"
          input
          dateFormat={format}
          onChange={onChangeDate}
          inputProps={{ placeholder: "Select the date" }}
        />
        <div className="addBtn">
          <button
            // Нужно проверять валидацию и если все ОК - идем дальше
            type="submit"
            className="btn btn-outline-success"
            onClick={cont}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
