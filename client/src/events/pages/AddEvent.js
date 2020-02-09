import React from 'react';
// import DatePicker from "react-datepicker";

import Card from "../../shared/components/UI/Card";
import { useForm } from "../../shared/hooks/useForm";
import { steps } from "../components/multistep/steps";
import MultiStep from "../components/multistep/MultiStep";

import "./AddEvent.css";
import {
  VAL_MIN_LENGTH,
  VAL_REQUIRED
} from "../../shared/utilities/validation";

const AddEvent = () => {
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
  // let styles = {
  //   height:'800px'
  // }

  const submitFormHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  return (
    <Card className="addEvent">
      <h2>Create your own event</h2>
      <div className="containerAdd">
        <form onSubmit={submitFormHandler}>
          <div>
            <MultiStep steps={steps} onInput={inputHandler} />
          </div>
        </form>
      </div>
    </Card>
  );
};

export default AddEvent;
