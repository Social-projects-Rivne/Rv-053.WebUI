import React, { useState, useEffect } from 'react';

import CategoryItem from './CategoryItem';
import './Categories.css';

const Categories = () => {
  const img_url = 'http://localhost:5001/uploads/covers/';
  const categories = [
    {
      name: 'Music',
      background: img_url + 'music.jpg',
      icon: 'icon-headphones'
    },
    {
      name: 'Sport & Fitness',
      background: img_url + 'sport.jpg',
      icon: 'icon-futbol-o'
    },
    {
      name: 'Outdoors & Adventure',
      background: img_url + 'adventure.jpg',
      icon: 'icon-bicycle'
    },
    {
      name: 'Technology',
      background: img_url + 'tech.jpg',
      icon: 'icon-cogs'
    },
    {
      name: 'Films',
      background: img_url + 'films.jpg',
      icon: 'icon-film'
    },
    {
      name: 'Health & Wellness',
      background: img_url + 'health.jpg',
      icon: ''
    },
    {
      name: 'Education',
      background: img_url + 'education.jpg',
      icon: 'icon-graduation-cap'
    },
    {
      name: 'Travel',
      background: img_url + 'travel.jpg',
      icon: 'icon-globe'
    },
    {
      name: 'Fashion & Beauty',
      background: img_url + 'fashion.jpg',
      icon: 'icon-shopping-bag'
    },
    {
      name: 'Nature',
      background: img_url + 'nature.jpg',
      icon: 'icon-envira'
    },
    {
      name: 'Art',
      background: img_url + 'art.jpg',
      icon: 'icon-paint-brush'
    },
    {
      id: 3,
      name: 'Hobbies & Crafts',
      background: img_url + 'crafts.jpg',
      icon: 'icon-cut'
    }
  ];
  return (
    <section className="categories">
      <div className="my__container">
        <div className="categories-title">
          Discover <span>us</span> - Discover <span>Yourself</span>
        </div>
        <div className="categories-items">
          {categories.map(category => (
            <CategoryItem
              key={category.name}
              name={category.name}
              background={category.background}
              icon={category.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
