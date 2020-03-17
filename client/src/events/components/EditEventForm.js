import React, { useRef } from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VAL_MIN_LENGTH, VAL_REQUIRED } from '../../shared/utilities/validation';
import './EditEventForm.css';

const EditEventForm = props => {
  const fileInputRef = useRef(null);
  return (
    <form onSubmit={props.onSubmitFormHandler} className="text-center">
      <div className="list__events-item-img edit-event__change-cover-container">
        <img
          src={
            typeof props.eventData.cover.value === 'object'
              ? URL.createObjectURL(props.eventData.cover.value)
              : props.eventData.cover.value
          }
          alt={props.eventData.cover.value}
          className="list__events-item-img"
        ></img>
        <span
          className="edit-event__change-cover-btn"
          onClick={() => (fileInputRef.current !== null ? fileInputRef.current.click() : null)}
        > 
          change cover
        </span>
      </div>
      <Input
        id="cover"
        type="file"
        refer={fileInputRef}
        validations={[]}
        onInput={props.onInputHandler}
        initValue={props.eventData.cover.value}
        initValid={true}
        errorMessage="Enter the name of event"
      />
      <Input
        id="title"
        type="input"
        label="Name"
        validations={[VAL_REQUIRED()]}
        onInput={props.onInputHandler}
        initValue={props.eventData.title.value}
        initValid={true}
        errorMessage="Enter the name of event"
      />
      <Input
        id="description"
        type="textarea"
        label="Description"
        onInput={props.onInputHandler}
        validations={[VAL_MIN_LENGTH(5)]}
        initValue={props.eventData.description.value}
        initValid={true}
        errorMessage="Write at least 5 characters!"
      />
      <div className="row justify-content-between">
        <div className="col-lg-4">
          {' '}
          <Input
            id="price"
            type="input"
            label="Price"
            onInput={props.onInputHandler}
            validations={[]}
            errorMessage="The field is required"
            initValue={props.eventData.price.value}
            initValid={true}
          />
        </div>
        <div className="col-lg-4">
          <Input
            id="age"
            type="number"
            label="Age limit"
            step="1"
            min="0"
            onInput={props.onInputHandler}
            validations={[]}
            errorMessage="The field is required"
            initValue={props.eventData.age.value}
            initValid={true}
          />
        </div>
        <div className="col-lg-4">
          <Input
            id="amount"
            type="number"
            label="Places amount"
            step="1"
            min="0"
            onInput={props.onInputHandler}
            validations={[VAL_REQUIRED()]}
            errorMessage="The field is required"
            initValue={props.eventData.amount.value}
            initValid={true}
          />
        </div>
      </div>

      <button className="my__button mt-4" type="submit">
        Update
      </button>
    </form>
  );
};

export default EditEventForm;
