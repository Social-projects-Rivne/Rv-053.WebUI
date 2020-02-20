import React, { useState } from "react";
import { useForm } from "../../../shared/hooks/useForm";
import { VAL_REQUIRED } from "../../../shared/utilities/validation";

// import DatePicker from "react-datepicker";

import Input from "../../../shared/components/FormElements/Input";
import Price from "../../../shared/components/FormElements/Price";
import Number from "../../../shared/components/FormElements/Number";
import Switch from "../../../shared/components/FormElements/Checkbox";

const StepThree = props => {
  const [formState, inputHandler] = useForm(
    {
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
  const [priceChechbox, setPriceChechbox] = useState(false);
  const [ageChechbox, setAgeChechbox] = useState(false);
  const [amountCheckbox, setAmount] = useState(false);

  const cont = e => {
    e.preventDefault();
    props.nextStep();
  };
  const back = e => {
    e.preventDefault();
    props.prevStep();
  };

  return (
    <div className="form-group">
      <Switch
        id="price"
        type="price"
        className="priceCh"
        isOn={priceChechbox}
        label="Is your event paid?"
        handleChange={() => {
          setPriceChechbox(!priceChechbox);
          console.log(priceChechbox, ageChechbox, amountCheckbox);
        }}
        onColor="#16a085"
        name="price"
      />
      {priceChechbox ? (
        <Price
          id="price"
          type="number"
          label="Price"
          step="1"
          min="0"
          placeholder="0,00 hrn"
          onInput={inputHandler}
          validations={[VAL_REQUIRED()]}
          errorMessage="The field is required"
          className="price-div"
        />
      ) : null}
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
      {ageChechbox ? (
        <Number
          id="age"
          type="number"
          label="The min age of participants"
          step="1"
          min="0"
          placeholder="18..."
          onInput={inputHandler}
          validations={[VAL_REQUIRED()]}
          errorMessage="The field is required"
          className="price-div"
        />
      ) : null}
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
      {amountCheckbox ? (
        <Number
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
      ) : null}
      <div className="addBtn">
        <button className="btn btn-outline-success" onClick={back}>
          Back
        </button>
        <button className="btn btn-outline-success" onClick={cont}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StepThree;
