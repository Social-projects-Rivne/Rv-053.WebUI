import React, { useState, useEffect } from 'react';

import './NumberCounter.css';

const NumberCounter = props => {
  const [number, setNumber] = useState(props.value || 0);
  const step = props.step || 1;
  const minNumber = props.min !== undefined ? props.min : -Infinity;
  const maxNumber = props.max !== undefined ? props.max : Infinity;

  const handleNumber = action => {
    if (action === '+') {
      if (number < maxNumber) {
        setNumber(number + step);
      }
    } else {
      if (number > minNumber) {
        setNumber(number - step);
      }
    }
  };

  const { onChange } = props;
  useEffect(() => {
    if (onChange) onChange(number);
  }, [onChange, number]);

  return (
    <div>
      <span className="counter__btn" onClick={() => handleNumber('+')}>
        ▲
      </span>
      <p className="counter__digits">{number}</p>
      <span className="counter__btn" onClick={() => handleNumber('-')}>
        ▼
      </span>
    </div>
  );
};

export default NumberCounter;
