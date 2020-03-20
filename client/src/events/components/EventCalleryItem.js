import React from 'react';

const EventCalleryItem = props => {
  const img = {
    backgroundImage: `url(${props.img_url})`
  };
  return (
    <div className={props.className} onClick={() => props.onClick(props)}>
      <div style={img} className="list__images-item-img"></div>
      <div
        className="list__images-item-description"
        style={{ display: 'flex' }}
      >
        {props.additional ? (
          props.additional
        ) : (
          <span style={{ minWidth: '20px' }}></span>
        )}
        <div style={{ flexGrow: '1' }}>{props.description} &nbsp;</div>
      </div>
    </div>
  );
};
export default EventCalleryItem;
