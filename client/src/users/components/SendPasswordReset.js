import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VAL_EMAIL } from '../../shared/utilities/validation';

const SendPasswordReset = props => {
  return (
    <>
      <h2 className="text-center">Reset your password</h2>
      <form>
        <p>
          Enter your user account's verified email address and we will send you a password reset
          link
        </p>
        <Input
          id="email"
          type="input"
          label="Email"
          validations={[VAL_EMAIL()]}
          onInput={props.inputHandler}
          errorMessage="Input a valid email"
        />
      </form>
      <button className="my__button mb-4 mt-4" onClick={props.submitFormHandler}>
        Send password reset email
      </button>
    </>
  );
};

export default SendPasswordReset;
