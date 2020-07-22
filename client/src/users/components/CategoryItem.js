import React from 'react';

const CategoryItem = props => {
  return (
    <button
      className={
        props.isAdded
          ? `profile_categories-item added + ${props.icon}`
          : `profile_categories-item + ${props.icon}`
      }
      onClick={props.click}
    >
      {' ' + props.title}
    </button>
  );
};

export default CategoryItem;
