import React, { useState } from "react";
import { useForm } from "../../../shared/hooks/useForm";
import { VAL_REQUIRED } from "../../../shared/utilities/validation";

import Input from "../../../shared/components/FormElements/Input";
import Price from "../../../shared/components/FormElements/Price";
import Number from "../../../shared/components/FormElements/Number";
import Switch from "../../../shared/components/FormElements/Checkbox";

const StepThree = props => {
  const [priceCheckbox, setPriceCheckbox] = useState(false);
  const [ageChechbox, setAgeChechbox] = useState(false);
  const [amountCheckbox, setAmount] = useState(false);

  const back = e => {
    e.preventDefault();
    props.prevStep();
  };

  return (
    <div className="form-group">
      <div className="row">
        <div className="col-md-9">
          <Price
            id="price"
            type="number"
            label="Price"
            step="1"
            min="0"
            placeholder="0,00 hrn"
            onInput={props.inputHandler}
            validations={[VAL_REQUIRED()]}
            errorMessage="The field is required"
            className="form-control"
            disabled
          />
        </div>
        <div className="col-md-3">
          <Switch
            id="price"
            type="price"
            className="priceCh"
            isOn={priceCheckbox}
            label="Is your event paid?"
            handleChange={() => setPriceCheckbox(!priceCheckbox)}
            onColor="#16a085"
            name="price"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-9">
          <Input
            id="age"
            type="number"
            label="The min age of participants"
            step="1"
            min="0"
            placeholder="18..."
            onInput={props.inputHandler}
            validations={[VAL_REQUIRED()]}
            errorMessage="The field is required"
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <Switch
            id="age"
            className="ageCh"
            type="age"
            isOn={ageChechbox}
            label="Are there any age restrictions?"
            handleChange={() => setAgeChechbox(!ageChechbox)}
            name="age"
            onColor="#16a085"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-9">
          <Input
            id="amount"
            type="number"
            label="The max amount of participants"
            step="1"
            min="0"
            placeholder="10"
            onInput={props.inputHandler}
            validations={[VAL_REQUIRED()]}
            errorMessage="The field is required"
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <Switch
            id="amount"
            className="amountCh"
            type="amount"
            isOn={amountCheckbox}
            label="Are there 
          restrictions on the number of participants?"
            handleChange={() => setAmount(!amountCheckbox)}
            name="amount"
            onColor="#16a085"
          />
        </div>
      </div>

      {/* <Switch
        id="amount"
        className="amountCh"
        type="amount"
        isOn={amountCheckbox}
        label="Are there 
          restrictions on the number of participants?"
        handleChange={() => setAmount(!amountCheckbox)}
        name="amount"
        onColor="#16a085"
      />
      {amountCheckbox ? (
        <Number
          id="amount"
          type="number"
          label="The max amount of participants"
          step="1"
          min="0"
          placeholder="10"
          onInput={props.inputHandler}
          validations={[VAL_REQUIRED()]}
          errorMessage="The field is required"
          className="form-control"
        />
      ) : null} */}
      <div className="submitBtn">
        <button className="btn btn-outline-success" onClick={back}>
          Back
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={props.submitHandler}
        >
          Create form
        </button>
      </div>
    </div>
  );
};

export default StepThree;
