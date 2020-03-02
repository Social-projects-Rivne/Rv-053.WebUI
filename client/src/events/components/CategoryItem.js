import React from 'react';

import './Categories.css';

const CategoryItem = props => {
  const bg = {
    backgroundImage: `url(${props.background})`
  };

  return (
    <div className="categories-item">
      <div className="categories-bg" style={bg}></div>
      <div className={'categories-icon ' + props.icon}> </div>
      <div className="categories-name">{props.name}</div>
    </div>
  );
};

export default CategoryItem;
