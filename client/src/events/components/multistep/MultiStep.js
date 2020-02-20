import React, { useState } from "react";

import "./MultiStep.css";
import { useForm } from "../../../shared/hooks/useForm";

export default function MultiStep(props) {
  const [formState, inputHandler] = useForm(
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

  

  const getButtonsState = (indx, length) => {
    if (indx > 0 && indx < length - 1) {
      return {
        showPreviousBtn: true,
        showNextBtn: true,
        showSubmit: false
      };
    } else if (indx === 0) {
      return {
        showPreviousBtn: false,
        showNextBtn: true,
        showSubmit: false
      };
    } else {
      return {
        showPreviousBtn: true,
        showNextBtn: false,
        showSubmit: true
      };
    }
  };

  
  const [compState, setComp] = useState(0);
  const [buttonsState, setButtons] = useState(
    getButtonsState(0, props.steps.length)
  );

  function setStepState(indx) {
    setComp(indx < props.steps.length ? indx : compState);
    setButtons(getButtonsState(indx, props.steps.length));
  }

  const next = () => setStepState(compState + 1);

  const previous = () =>
    setStepState(compState > 0 ? compState - 1 : compState);




  return (

      <div className="container">
        {props.steps[compState].component}
        <div
          className="addBtn"
          style={props.showNavigation ? {} : { display: "none" }}
        >

          <button
            className="btn btn-outline-success"
            style={buttonsState.showPreviousBtn ? {} : { display: "none" }}
            onClick={previous}
          >
            Previous
          </button>

          <button
            className="btn btn-outline-success"
            style={buttonsState.showNextBtn ? {} : { display: "none" }}
            onClick={next}
          >
            Next
          </button>
          <button
            className="btn btn-outline-success"
            style={buttonsState.showSubmit ? {} : { display: "none" }}
          >
            Create Event
          </button>
        </div>
      </div>
    
  );
}

MultiStep.defaultProps = {
  showNavigation: true
};
