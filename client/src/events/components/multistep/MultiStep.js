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

  const getNavStyles = (indx, length) => {
    let styles = [];
    for (let i = 0; i < length; i++) {
      if (i < indx) {
        styles.push("done");
      } else if (i === indx) {
        styles.push("doing");
      } else {
        styles.push("todo");
      }
    }
    return styles;
  };

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

  const [stylesState, setStyles] = useState(
    getNavStyles(0, props.steps.length)
  );
  const [compState, setComp] = useState(0);
  const [buttonsState, setButtons] = useState(
    getButtonsState(0, props.steps.length)
  );

  function setStepState(indx) {
    setStyles(getNavStyles(indx, props.steps.length));
    setComp(indx < props.steps.length ? indx : compState);
    setButtons(getButtonsState(indx, props.steps.length));
  }

  const next = () => setStepState(compState + 1);

  const previous = () =>
    setStepState(compState > 0 ? compState - 1 : compState);

  const handleKeyDown = evt =>
    evt.which === 13 ? next(props.steps.length) : {};

  const handleOnClick = evt => {
    if (
      evt.currentTarget.value === props.steps.length - 1 &&
      compState === props.steps.length - 1
    ) {
      setStepState(props.steps.length);
    } else {
      setStepState(evt.currentTarget.value);
    }
  };

  const renderSteps = () =>
    props.steps.map((s, i) => (
      <li
        className={"progtrckr-" + stylesState[i]}
        onClick={handleOnClick}
        key={i}
        value={i}
      >
        <em>{i + 1}</em>
        <span>{props.steps[i].name}</span>
      </li>
    ));
  const submitFormHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form onSubmit={submitFormHandler}>
      <div className="container" onKeyDown={handleKeyDown}>
        <ol className="progtrckr">{renderSteps()}</ol>
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
    </form>
  );
}

MultiStep.defaultProps = {
  showNavigation: true
};
