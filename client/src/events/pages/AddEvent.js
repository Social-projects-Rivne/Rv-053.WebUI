import React, { useState } from "react";
import StepOne from "../components/multistep/stepOne";
import StepTwo from "../components/multistep/stepTwo";
import StepThree from "../components/multistep/stepThree";
// import Confirm from "./Confirm";
// import Success from "./Success";

export const AddEvent = () => {
    const [form, setForm] = useState({
      step: 1,
      title: "",
      category: "",
      description: ""
    });
  
    // Proceed to next step
    const nextStep = () => {
      const { step } = form;
      setForm({
        step: step + 1
      });
    };
  
    // Go back to prev step
    const prevStep = () => {
      const { step } = form;
      setForm({
        step: step - 1
      });
    };
  
    // Handle fields change
    const handleChange = e => {
      setForm({
        [e.target.name]: e.target.value
      });
    };
    // Trouble there
  
    const { step } = form;
    const { title, category, description } = form;
    const values = { title, category, description };
  

  switch (step) {
    case 1:
      return (
        <div className="addEvent">
          <h3>Create your own event</h3>
        <StepOne
          nextStep={nextStep}
        />
        </div>
      );
    case 2:
      return (
        <div className="addEvent">
          <h3>Choose the location</h3>
        <StepTwo
          nextStep={nextStep}
          prevStep={prevStep}
        />
        </div>
      );
    case 3:
      return (
        <div className="addEvent">
          <h3>Add some details</h3>
        <StepThree 
        nextStep={nextStep} 
        prevStep={prevStep}  />
        </div>
      );
  
  }
};

export default AddEvent;
