import React from "react";

import Map from "../../../shared/components/Map/MapBox";
import "../../pages/AddEvent.css";

const StepTwo = props => {
  const cont = e => {
    e.preventDefault();
    props.nextStep();
  };

  const back = e => {
    e.preventDefault();
    props.prevStep();
  };

  return (
    <div className="col-sm-12">
      <Map id="map" className="container" />
      <div className="addBtn">
        <button className="btn btn-outline-success" onClick={back}>
          Back
        </button>
        <button className="btn btn-outline-success" onClick={cont}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
