import React, { useEffect } from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VAL_MIN_LENGTH, VAL_REQUIRED } from '../../shared/utilities/validation';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { api_server_url } from '../../shared/utilities/globalVariables';

const EditEventForm = props => {
  const eventID = useParams().id;

  const fetchEventData = async () => {
    try {
      const res = await axios.get(api_server_url + '/api/events/' + eventID);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  return (
    <form onSubmit={props.onSubmitFormHandler} className="addEvent">
      <Input
        id="title"
        type="input"
        label="Name"
        validations={[VAL_REQUIRED()]}
        onInput={props.onInputHandler}
        errorMessage="The field is required"
      />
      <Input
        id="description"
        type="textarea"
        label="Description"
        onInput={props.onInputHandler}
        validations={[VAL_MIN_LENGTH(5)]}
        errorMessage="Write at least 5 characters!"
      />
      <Input
        id="price"
        type="input"
        label="Price"
        onInput={props.onInputHandler}
        validations={[VAL_REQUIRED()]}
        errorMessage="The field is required"
      />
      <Input
        id="age"
        type="number"
        label="Age limit"
        step="1"
        min="0"
        onInput={props.onInputHandler}
        validations={[VAL_REQUIRED()]}
        errorMessage="The field is required"
      />
      <Input
        id="amount"
        type="number"
        label="Places amount"
        step="1"
        min="0"
        onInput={props.onInputHandler}
        validations={[VAL_REQUIRED()]}
        errorMessage="The field is required"
      />
      <button className="my__button mb-4 mt-4" type="submit">
        Add Event
      </button>
    </form>
  );
};

export default EditEventForm;
