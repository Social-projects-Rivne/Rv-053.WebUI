import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Categories.css';

const CategoryItem = props => {
  const bg = {
    backgroundImage: `url(${props.background})`
  };

  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const handleSelectedCategory = e => {
    e.preventDefault();
    setCategoryId(props.id);
    setCategoryName(props.name);
  };

  useEffect(() => {
    localStorage.setItem('myCategoryId', categoryId);
    localStorage.setItem('myCategoryName', categoryName);
  }, [categoryId, categoryName]);

  console.log(categoryId + '  ' + categoryName);
  return (
    <div className='categories-item' onFocus={handleSelectedCategory}>
      <NavLink
        style={{ textDecoration: 'none', color: 'inherit' }}
        to='/events'
      >
        <div className='categories-bg' style={bg}></div>
        <div className={'categories-icon ' + props.icon}> </div>
        <div className='categories-name'>{props.name}</div>
      </NavLink>
    </div>
  );
};

export default CategoryItem;
