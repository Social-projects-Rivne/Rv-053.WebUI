import React from 'react';

import './Card.css';

const Card = props => {
  return (
    <div className={`card ${props.className}`}>
      {props.needImage ? (
        <img src={props.imgPath} className="card-img-top" alt="..." />
      ) : null}
      <div className="card-body">{props.children}</div>
    </div>
  );
};

export default Card;
