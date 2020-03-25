import React from 'react';

import CategoryItem from './CategoryItem';
import { api_server_url } from '../../shared/utilities/globalVariables';
import { NavLink } from 'react-router-dom';
import './Categories.css';
import CategoryContextProvider from '../../shared/components/Filter/Category/CategoryContext';

const Categories = () => {
  const img_url = `${api_server_url}/uploads/covers/`;
  const categories = [
    {
      id: 1,
      name: 'Music',
      background: img_url + 'music.jpg',
      icon: 'icon-headphones'
    },
    {
      id: 2,
      name: 'Sport & Fitness',
      background: img_url + 'sport.jpg',
      icon: 'icon-futbol-o'
    },
    {
      id: 3,
      name: 'Outdoors & Adventure',
      background: img_url + 'adventure.jpg',
      icon: 'icon-bicycle'
    },
    {
      id: 4,
      name: 'Technology',
      background: img_url + 'tech.jpg',
      icon: 'icon-cogs'
    },
    {
      id: 5,
      name: 'Films',
      background: img_url + 'films.jpg',
      icon: 'icon-film'
    },
    {
      id: 6,
      name: 'Health & Wellness',
      background: img_url + 'health.jpg',
      icon: 'icon-stethoscope'
    },
    {
      id: 7,
      name: 'Education',
      background: img_url + 'education.jpg',
      icon: 'icon-graduation-cap'
    },
    {
      id: 8,
      name: 'Travel',
      background: img_url + 'travel.jpg',
      icon: 'icon-globe'
    },
    {
      id: 9,
      name: 'Fashion & Beauty',
      background: img_url + 'fashion.jpg',
      icon: 'icon-shopping-bag'
    },
    {
      id: 10,
      name: 'Art',
      background: img_url + 'art.jpg',
      icon: 'icon-paint-brush'
    },
    {
      id: 11,
      name: 'Hobbies & Crafts',
      background: img_url + 'crafts.jpg',
      icon: 'icon-cut'
    },
    {
      id: 12,
      name: 'Others',
      background: img_url + 'others.jpg',
      icon: 'icon-puzzle-piece'
    }
  ];
  return (
    <CategoryContextProvider>
      <section className='categories'>
        <div className='my__container'>
          <div className='categories-title'>
            Discover <span>us</span> - Discover <span>Yourself</span>
          </div>
          <div className='categories-items'>
            {categories.map(category => (
              <CategoryItem
                key={category.name}
                id={category.id}
                name={category.name}
                background={category.background}
                icon={category.icon}
                // onClick={console.log(category.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </CategoryContextProvider>
  );
};

export default Categories;
