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

const StepTwo = () => {
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

  const submitFormHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return <Map id="map" />;
};

export default StepTwo;
