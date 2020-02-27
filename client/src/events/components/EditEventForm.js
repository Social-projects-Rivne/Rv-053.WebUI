import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Selector from '../../shared/components/FormElements/Select';
import { VAL_MIN_LENGTH, VAL_REQUIRED } from '../../shared/utilities/validation';

const EditEventForm = props => {
  return (
    <form onSubmit={props.onSubmitFormHandler} className="addEvent">
      <div className="form-group">
        <Input
          id="title"
          type="input"
          label="Name event"
          validations={[VAL_REQUIRED()]}
          onInput={props.onInputHandler}
          errorMessage="The field is required"
        />
      </div>
      <div>
        <Selector
          type="select"
          id="select"
          label="Choose category"
          onInput={props.onInputHandler}
          validations={[VAL_REQUIRED()]}
          errorMessage="The field is required"
        />
      </div>
      <Input
        id="description"
        type="textarea"
        label="Write description"
        onInput={props.onInputHandler}
        validations={[VAL_MIN_LENGTH(5)]}
        errorMessage="Write at least 5 characters!"
      />
      <Input
        className="form-control"
        id="location"
        type="location"
        onInput={props.onInputHandler}
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
        onInput={props.onInputHandler}
        validations={[VAL_REQUIRED()]}
        errorMessage="The field is required"
      />
      <Input
        id="age"
        type="number"
        label="The min age of participants"
        step="1"
        min="0"
        placeholder="18..."
        onInput={props.onInputHandler}
        validations={[VAL_REQUIRED()]}
        errorMessage="The field is required"
      />
      <Input
        id="amount"
        type="number"
        label="The max amount of participants"
        step="1"
        min="0"
        placeholder="10"
        onInput={props.onInputHandler}
        validations={[VAL_REQUIRED()]}
        errorMessage="The field is required"
      />
      <button className="btn btn-outline-primary" type="submit">
        Add Event
      </button>
    </form>
  );
};

export default EditEventForm;
