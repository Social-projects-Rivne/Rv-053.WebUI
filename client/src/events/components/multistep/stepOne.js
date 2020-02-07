import React from "react";
// import DatePicker from "react-datepicker";

import Input from '../../../shared/components/FormElements/Input';
import Selector from "../../../shared/components/FormElements/Select";
import { useForm } from '../../../shared/hooks/useForm';

import {
  VAL_MIN_LENGTH,
  VAL_REQUIRED
} from "../../../shared/utilities/validation";


const StepOne = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      select: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      location: {
        value: '',
        isValid: false
      },
      price: {
        value: '',
        isValid: false
      },
      age:{
        value: '',
        isValid: false
      },
      amount:{
        value: '',
        isValid: false
      }

    },
    
    false
  );
  const submitFormHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  return (
    
    <form onSubmit={submitFormHandler} >
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
 </div>
 </form>
  );
};

export default StepOne;