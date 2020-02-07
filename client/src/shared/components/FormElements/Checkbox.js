import React from 'react';
import './Checkbox.css';

const Switch = ( {isOn, handleChange, label, onColor, value, id, name}) => {
  
    return (
      <div className="react-switch-div">
        <input
          checked={isOn}
          onChange={handleChange}
          className = "react-switch-checkbox"
          id={id}
          type="checkbox"
          value = {value}
          name={name}

        />
        <label
  style={{ background: isOn && onColor }}
  className="react-switch-label"
  htmlFor={id}
>
          <span className={`react-switch-button`} />
        </label>
        <p>{label}</p>
      </div>
      
    );
  };
  

export default Switch;