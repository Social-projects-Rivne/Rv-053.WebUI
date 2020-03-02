import React from 'react';
// import Datetime from 'react-datetime';

import Input from '../../shared/components/FormElements/Input';
import Selector from '../../shared/components/FormElements/Select';
import Datepicker from '../../shared/components/FormElements/Datepicker';
import { useForm } from '../../shared/hooks/useForm';
import ImageUpload from '../components/ImageUpload';

import './AddEvent.css';
import { VAL_MIN_LENGTH, VAL_REQUIRED } from '../../shared/utilities/validation';

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
      // address: {
      //   value: '',
      //   isValid: false
      // },
      // country: {
      //   value: '',
      //   isValid: false
      // },
      // price: {
      //   value: '',
      //   isValid: false
      // },
      age: {
        value: '',
        isValid: false
      },
      amount: {
        value: '',
        isValid: false
      },
      date: {
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
    <div className="addEvent container">
      <h2 className="create__event">Create event</h2>
      <form onSubmit={submitFormHandler} className="addEvent">
        <div className="form-group">
          <Input
            id="title"
            type="input"
            label="Tittle"
            validations={[VAL_REQUIRED()]}
            onInput={inputHandler}
            errorMessage="The field is required"
            className="form-control"
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <Selector
              type="select"
              id="select"
              label="Category"
              onInput={inputHandler}
              validations={[VAL_REQUIRED()]}
              errorMessage="The field is required"
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <Datepicker
              type="select"
              id="date"
              label="Date"
              onInput={inputHandler}
              validations={[VAL_REQUIRED()]}
              errorMessage="The field is required"
              className="form-control"
            />
          </div>
        </div>
        <Input
          id="description"
          type="textarea"
          label="Description"
          onInput={inputHandler}
          validations={[VAL_MIN_LENGTH(5)]}
          errorMessage="Write at least 5 characters!"
          className="form-control"
        />
        <ImageUpload />
        <div className="row">
          <div className="col-md-6">
            <Input
              className="form-control"
              id="address"
              type="input"
              onInput={inputHandler}
              label="Address"
              validations={[VAL_REQUIRED()]}
              errorMessage="The field is required"
            />
          </div>
          <div className="col-md-6">
            <Input
              className="form-control col-md-6"
              id="country"
              type="input"
              onInput={inputHandler}
              label="Country"
              validations={[VAL_REQUIRED()]}
              errorMessage="The field is required"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
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
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
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
          </div>
          <div className="col-md-6">
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
          </div>
        </div>
        <div className="row">
          <button className="btn btn-outline-primary create__btn" type="submit">
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
