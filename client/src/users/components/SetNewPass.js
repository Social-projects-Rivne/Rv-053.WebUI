import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VAL_REQUIRED } from '../../shared/utilities/validation';

const SetNewPass = props => {
  return (
    <>
      <h2 className="text-center">Change Password</h2>
      <form onSubmit={props.submitFormHandler}>
        <Input
          id="password"
          type="password"
          label="New password"
          validations={[VAL_REQUIRED()]}
          onInput={props.inputHandler}
          errorMessage="Password is required"
        />
        <Input
          id="password"
          type="password"
          label="Repeat new password"
          validations={[VAL_REQUIRED()]}
          onInput={props.inputHandler}
          errorMessage="Password is required"
        />
        <button
          className="my__button float-right mt-4"
          type="submit"
          onClick={props.signInUpHandler}
        >
          Confirm
        </button>
      </form>
    </>
  );
};

export default SetNewPass;