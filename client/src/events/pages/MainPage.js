import React from 'react';

import Carousel from './../components/Carousel';
import SoonEvents from './../components/SoonEvents';
import Categories from './../components/Categories';
import './MainPage.css';

const MainPage = () => {
  return (
    <>
      <Carousel />
      {/* <SoonEvents /> */}
      <Categories />
    </>
  );
};

export default MainPage;
