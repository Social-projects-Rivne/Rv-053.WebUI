import React, { useState } from "react";
import { useForm } from "../../shared/hooks/useForm";

import StepOne from "../components/multistep/stepOne";
import StepTwo from "../components/multistep/stepTwo";
import StepThree from "../components/multistep/stepThree";

const AddEvent = () => {
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      select: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      },
      location: {
        value: "",
        isValid: false
      },
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
  const [formStep, setFormStep] = useState({
    step: 1
  });

  const nextStep = () => {
    const { formStep } = step;
    setFormStep({
      step: step + 1
    });
  };
  const prevStep = () => {
    const { formStep } = step;
    setFormStep({
      step: step - 1
    });
  };

  const submitFormHandler = async event => {
    // Submit button handler
    event.preventDefault();
  };

  const { step } = formStep;
  const { firstName, lastName, email, occupation, city, bio } = formState;
  const values = { firstName, lastName, email, occupation, city, bio };

  switch (step) {
    // case 1:
    //   return (
    //     <div className="addEvent container">
    //       <div className="row">
    //         <h3>Create your own event</h3>
    //         <StepOne
    //           nextStep={nextStep}
    //           inputHandler={inputHandler}
    //           submitFormHandler={submitFormHandler}
    //         />
    //       </div>
    //     </div>
    //   );
    // case 2:
    //   return (
    //     <div className="addEvent container">
    //       <div className="row">
    //         <h3>Choose the location</h3>
    //         <StepTwo
    //           nextStep={nextStep}
    //           prevStep={prevStep}
    //           inputHandler={inputHandler}
    //         />
    //       </div>
    //     </div>
    //   );
    case 1:
      return (
        <div className="addEvent container">
          <div className="row">
            <h3>Add some details</h3>
            <StepThree
              submitHandler={submitFormHandler}
              inputHandler={inputHandler}
            />
          </div>
        </div>
      );
  }
};

export default AddEvent;
