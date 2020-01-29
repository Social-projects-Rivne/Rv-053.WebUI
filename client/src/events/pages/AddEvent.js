import React from "react";
// import DatePicker from "react-datepicker";

import Card from "../../shared/components/UI/Card";
import Input from "../../shared/components/FormElements/Input";
import Selector from "../../shared/components/FormElements/Select";
import { useForm } from '../../shared/hooks/useForm';

import "./AddEvent.css";
import {
  VAL_MIN_LENGTH,
  VAL_REQUIRED
} from "../../shared/utilities/validation";


const AddEvent = () => {
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
    <Card className="addEvent">
      <h2>Create your own event</h2>
      <form onSubmit={submitFormHandler}>
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
        </div>
        <div>
          
          <Selector
            type="select"
            id="select"
            label="Choose category"
            onInput={inputHandler}
            validations={[VAL_REQUIRED()]}
            errorMessage="The field is required"
            className="form-control"
          />
        </div>
        <Input
          id="description"
          type="textarea"
          label="Write description"
          onInput={inputHandler}
          validations={[VAL_MIN_LENGTH(5)]}
          errorMessage="Write at least 5 characters!"
          className="form-control"
        />
        <Input
          className="form-control"
          id="location"
          type="location"
          onInput={inputHandler}
          label="Location"
          validations={[VAL_REQUIRED()]}
          errorMessage="The field is required"
        />
           <Input
          id="price"
          type="number"
          label="Price"
          step="1" 
          min="0" 
          placeholder="0,00 hrn"
          onInput={inputHandler}
          validations={[VAL_REQUIRED()]}
          errorMessage="The field is required"
          className="form-control"
        />
           <Input
          id="age"
          type="number"
          label="The min age of participants"
          step="1" 
          min="0" 
          placeholder="18..."
          onInput={inputHandler}
          validations={[VAL_REQUIRED()]}
          errorMessage="The field is required"
          className="form-control"
        />
           <Input
          id="amount"
          type="number"
          label="The max amount of participants"
          step="1" 
          min="0" 
          placeholder="10"
          onInput={inputHandler}
          validations={[VAL_REQUIRED()]}
          errorMessage="The field is required"
          className="form-control"
        />
        <button className="btn btn-outline-primary" type="submit" disabled={!formState.formValidity}>
          Add Event
        </button>
      </form>
    </Card>
  );
};

export default AddEvent;