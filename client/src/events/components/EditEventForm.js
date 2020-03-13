import React, { useRef, useState, useCallback } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Switch from '../../shared/components/UI/Switch';
import DisappearingAnimation from '../../shared/components/UI/Animations/DisappearingAnimation';
import { VAL_MIN_LENGTH, VAL_REQUIRED, VAL_NUMBERS } from '../../shared/utilities/validation';
import './EditEventForm.css';
import Selector from '../../shared/components/FormElements/Select';

const EditEventForm = props => {
  const fileInputRef = useRef(null);
  const [priceFlag, setPriceFlag] = useState(props.eventData.price.value ? true : false);
  const [ageLimitFlag, setAgeLimitFlag] = useState(props.eventData.age.value ? true : false);
  const [placesLimitFlag, setPlacesLimitFlag] = useState(
    props.eventData.amount.value ? true : false
  );

  const priceSwitchHandler = state => {
    setPriceFlag(state);
    if (priceFlag) {
      InputHandler('price', '', true);
    }
  };
  const ageLimitSwitchHandler = state => {
    setAgeLimitFlag(state);
    if (ageLimitFlag) {
      InputHandler('age', 0, true);
    }
  };
  const placesLimitSwitchHandler = state => {
    setPlacesLimitFlag(state);
    if (placesLimitFlag) {
      InputHandler('amount', 0, true);
    }
  };
  const InputHandler = useCallback((id, value, isValid) => {
    props.onInputHandler(id, value, isValid);
  }, []);

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
      <div className="row">
        <div className="col-lg-5 d-flex">
          <div className="col-2">
            <p className="switch__label">Cost:</p>
          </div>
          <div className="col-4 switch__block">
            <div className="d-inline-block">
              <Switch
                id="price_switch"
                titleOn="PAID"
                titleOff="FREE"
                onSwitch={priceSwitchHandler}
                initSwitch={priceFlag}
              />
            </div>
          </div>
          <div className="col-6">
            <DisappearingAnimation triger={priceFlag} timeout={400} mountOnEnter unmountOnExit>
              <Input
                id="price"
                type="number"
                label="Price"
                onInput={InputHandler}
                validations={[VAL_NUMBERS()]}
                errorMessage="Enter a valid price"
                initValue={props.eventData.price.value}
                initValid={true}
              />
            </DisappearingAnimation>
          </div>
        </div>
        <div className="col-lg-7 d-flex">
          <div className="col-4">
            <p className="switch__label">Places count:</p>
          </div>
          <div className="col-3 switch__block">
            <Switch
              id="amount_switch"
              titleOn="LIMIT"
              titleOff="ANY"
              onSwitch={placesLimitSwitchHandler}
              initSwitch={placesLimitFlag}
            />
          </div>
          <div className="col-5 input__block">
            <DisappearingAnimation
              triger={placesLimitFlag}
              timeout={400}
              mountOnEnter
              unmountOnExit
            >
              <Input
                id="amount"
                type="number"
                label="Amount"
                step="1"
                onInput={InputHandler}
                validations={[VAL_NUMBERS(1)]}
                errorMessage="Enter correct limit"
                initValue={props.eventData.amount.value}
                initValid={true}
              />
            </DisappearingAnimation>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-5 d-flex">
          <div className="col-2">
            <p className="switch__label">Age:</p>
          </div>
          <div className="col-4 switch__block">
            <Switch
              id="age_switch"
              titleOn="LIMIT"
              titleOff="ANY"
              onSwitch={ageLimitSwitchHandler}
              initSwitch={ageLimitFlag}
            />
          </div>
          <div className="col-6 inputfield__block">
            <DisappearingAnimation triger={ageLimitFlag} timeout={400} mountOnEnter unmountOnExit>
              <Input
                id="age"
                type="number"
                label="Minimal age"
                step="1"
                onInput={InputHandler}
                validations={[VAL_NUMBERS(0, 120)]}
                errorMessage="Enter correct age"
                initValue={props.eventData.age.value}
                initValid={true}
              />
            </DisappearingAnimation>
          </div>
        </div>
        <div className="col-lg-7 d-flex">
          <div className="col-6"></div>
          <div className="col-6"></div>
        </div>
      </div>

      <button className="my__button mt-4" type="submit">
        Update
      </button>
    </form>
  );
};

export default EditEventForm;
