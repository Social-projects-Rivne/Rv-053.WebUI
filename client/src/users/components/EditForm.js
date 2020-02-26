import React from 'react';

import { VAL_REQUIRED } from './../../shared/utilities/validation';
import Input from './../../shared/components/FormElements/Input';
import Card from './../../shared/components/UI/Card';
import Button from './../../shared/components/UI/Button';
import './EditForm.css';

const EditForm = props => {
  return (
    <Card className="card_wrapper">
      <h2 className="update-title">Update Profile</h2>
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
        <div className="input_wrapper-number mb-4">
          <Input
            id="birth_day"
            type="number"
            label="Day"
            onInput={props.inputHandler}
            initValid="true"
            validations={[VAL_REQUIRED()]}
            initValue={props.user.birthday[0] || null}
            min="0"
            max="31"
          />
          <Input
            id="birth_month"
            type="number"
            label="Month"
            onInput={props.inputHandler}
            initValue={props.user.birthday[1] || null}
            validations={[VAL_REQUIRED()]}
            min="1"
            max="12"
          />
          <Input
            id="birth_year"
            type="number"
            label="Year"
            onInput={props.inputHandler}
            initValue={props.user.birthday[2] || null}
            validations={[VAL_REQUIRED()]}
            min="1960"
            max="2015"
          />
        </div>
        <div className="radio-wrapper mb-4">
          <Input
            type="radio"
            name="sex"
            id="sex"
            value="Female"
            onInput={props.inputHandler}
            validations={[]}
            checked={props.user.sex == 'Female' ? true : null}
            label="Woman"
            initValid="true"
          />
          <Input
            type="radio"
            name="sex"
            id="sex"
            value="Male"
            onInput={props.inputHandler}
            validations={[]}
            checked={props.user.sex == 'Male' ? true : null}
            label="Man"
            initValid="true"
          />
        </div>
        <Button type="submit">UPDATE</Button>
      </form>
    </Card>
  );
};

export default EditForm;
