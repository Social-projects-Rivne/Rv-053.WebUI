import React, { useState } from "react";
// import DatePicker from "react-datepicker";

import Input from "../../../shared/components/FormElements/Input";
import Selector from "../../../shared/components/FormElements/Select";
import { useForm } from "../../../shared/hooks/useForm";

import Map from "../../../shared/components/Map/MapBox";
import {
  VAL_MIN_LENGTH,
  VAL_REQUIRED
} from "../../../shared/utilities/validation";

const StepTwo = props => {
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
  const back = e => {
    e.preventDefault();
    props.prevStep();
  };

  const submitFormHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <div className="form-group">
      <Map id="map" />
      <div className="addBtn">
      <button className="btn btn-outline-success" onClick={back}>
        Back
      </button>
      <button className="btn btn-outline-success" onClick={cont}>
        Next
      </button>
      </div>
    </div>
  );
};

export default StepTwo;
