import React from 'react';

const Button = props => {
  return (
    <button type={props.type} className={`my__button ${props.className}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
