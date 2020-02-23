import React from "react";
import "./Checkbox.css";

const Switch = ({ isOn, handleChange, label, onColor, value, id, name }) => {
  return (
    <div className="react-switch-div">
      <label
        style={{ background: isOn && onColor }}
        className="react-switch-label"
        htmlFor={id}
      >
        <span className={`react-switch-button`} />
      </label>
      <input
        checked={isOn}
        onChange={handleChange}
        className="react-switch-checkbox"
        id={id}
        type="checkbox"
        value={value}
        name={name}
      />
      <p>{label}</p>
    </div>
  );
};

export default Switch;
