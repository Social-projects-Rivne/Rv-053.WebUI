import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VAL_PASSWORD } from '../../shared/utilities/validation';

const SetNewPassword = props => {
  return (
    <>
      <h2 className="text-center">Change Password</h2>
      <form onSubmit={props.submitFormHandler}>
        <Input
          id="password1"
          type="password"
          label="New password"
          validations={[VAL_PASSWORD()]}
          onInput={props.inputHandler}
          errorMessage="password must have at least one capital letter, one number and 6 characters"
        />
        <Input
          id="password2"
          type="password"
          label="Repeat new password"
          validations={[VAL_PASSWORD()]}
          onInput={props.inputHandler}
        />
        <button className="my__button float-right mt-4" type="submit">
          Confirm
        </button>
      </form>
    </>
  );
};

export default SetNewPassword;
