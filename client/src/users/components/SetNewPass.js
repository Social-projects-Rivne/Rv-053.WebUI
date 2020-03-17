import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VAL_REQUIRED, VAL_PASSWORD } from '../../shared/utilities/validation';

const SetNewPass = props => {
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
          errorMessage="Password is required"
        />
        <Input
          id="password2"
          type="password"
          label="Repeat new password"
          validations={[VAL_PASSWORD()]}
          onInput={props.inputHandler}
          errorMessage="Password is required"
        />
        <button className="my__button float-right mt-4" type="submit">
          Confirm
        </button>
      </form>
    </>
  );
};

export default SetNewPass;
