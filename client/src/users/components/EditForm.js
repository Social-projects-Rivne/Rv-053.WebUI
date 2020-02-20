import React, { useState } from 'react';

import { VAL_REQUIRED } from './../../shared/utilities/validation';
import Input from './../../shared/components/FormElements/Input';
import './EditForm.css';

const EditForm = props => {
  const [sexState, setSexState] = useState(props.user.sex);
  const changeSexHandler = () => {
    if (sexState == 'Man') setSexState('Woman');
    else setSexState('Man');
    console.log(sexState);
  };
  console.log(sexState);
  return (
    <form onSubmit={props.submitFormHandler}>
      <Input
        id="firstname"
        type="input"
        label="First Name"
        onInput={props.inputHandler}
        errorMessage="Input a valid first name"
        validations={[VAL_REQUIRED()]}
        initValue={props.user.first_name}
        initValid="true"
      />
      <Input
        id="lastname"
        type="input"
        label="Last Name"
        onInput={props.inputHandler}
        errorMessage="Input a valid last name"
        validations={[VAL_REQUIRED()]}
        initValue={props.user.last_name}
        initValid="true"
      />
      <Input
        id="birth_day"
        type="number"
        label="Birth Day"
        onInput={props.inputHandler}
        initValid="true"
        validations={[VAL_REQUIRED()]}
        initValue={props.user.birthday[2] || null}
        min="0"
        max="31"
      />
      <Input
        id="birth_month"
        type="number"
        label="Birth Month"
        onInput={props.inputHandler}
        initValue={props.user.birthday[1] || null}
        validations={[VAL_REQUIRED()]}
        min="1"
        max="12"
      />
      <Input
        id="birth_year"
        type="number"
        label="Birth Year"
        onInput={props.inputHandler}
        initValue={props.user.birthday[0] || null}
        validations={[VAL_REQUIRED()]}
        min="1960"
        max="2015"
      />
      <button className="button_block" type="submit">
        UPDATE
      </button>
    </form>
  );
};

export default EditForm;
