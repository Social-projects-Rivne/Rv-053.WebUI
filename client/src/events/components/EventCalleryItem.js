import React from 'react';

const EventCalleryItem = ({ image, className, description, onClick }) => {
  const img = {
    backgroundImage: `url(${image})`
  };
  return (
    <div className={className}>
      <div
        style={img}
        className="list__images-item-img"
        onClick={e => onClick(e)}
      ></div>
      <div className="list__images-item-description">{description} &nbsp;</div>
    </div>
  );
};
export default EventCalleryItem;
