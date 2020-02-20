// import React from 'react';
// // import DatePicker from "react-datepicker";

// import Card from "../../shared/components/UI/Card";
// import { useForm } from "../../shared/hooks/useForm";
// import { steps } from "../components/multistep/steps";
// import MultiStep from "../components/multistep/MultiStep";

// import "./AddEvent.css";
// import {
//   VAL_MIN_LENGTH,
//   VAL_REQUIRED
// } from "../../shared/utilities/validation";

// const AddEvent = () => {
//   const [formState, inputHandler] = useForm(
//     {
//       title: {
//         value: "",
//         isValid: false
//       },
//       select: {
//         value: "",
//         isValid: false
//       },
//       description: {
//         value: "",
//         isValid: false
//       },
//       location: {
//         value: "",
//         isValid: false
//       },
//       price: {
//         value: "",
//         isValid: false
//       },
//       age: {
//         value: "",
//         isValid: false
//       },
//       amount: {
//         value: "",
//         isValid: false
//       }
//     },

//     false
//   );
//   // let styles = {
//   //   height:'800px'
//   // }

//   const submitFormHandler = event => {
//     event.preventDefault();
//     console.log(formState.inputs);
//   };
//   return (
//     <div className="addEvent">
//       <h2>Create your own event</h2>
//       <div className="containerAdd">
//         <form onSubmit={submitFormHandler}>
//           <div>
//             <MultiStep steps={steps} onInput={inputHandler} />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddEvent;

import React, { useState } from "react";
import StepOne from "../components/multistep/stepOne";
import StepTwo from "../components/multistep/stepTwo";
import StepThree from "../components/multistep/stepThree";
// import Confirm from "./Confirm";
// import Success from "./Success";

export const AddEvent = () => {
    const [form, setForm] = useState({
      step: 1,
      
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
    const { firstName, lastName, email, occupation, city, bio } = form;
    const values = { firstName, lastName, email, occupation, city, bio };
  

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

