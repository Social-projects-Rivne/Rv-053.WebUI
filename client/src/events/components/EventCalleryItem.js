import React from 'react';

const EventCalleryItem = props => {
  const img = {
    backgroundImage: `url(${
      typeof props.img_url === 'object'
        ? URL.createObjectURL(props.img_url)
        : props.img_url
    })`
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
          <span style={{ minWidth: '5px' }}></span>
        )}
        <div
          className="list__images-item-description-text"
          style={{ flexGrow: '1' }}
        >
          {props.description} &nbsp;
        </div>
      </div>
    </div>
  );
};
export default EventCalleryItem;
