import React from 'react';

import Carousel from './../components/Carousel';
import JoinUs from './../components/JoinUs';
import SoonEvents from './../components/SoonEvents';
import Categories from './../components/Categories';
import './MainPage.css';

const MainPage = () => {
  return (
    <>
      <Carousel />
      {/* <JoinUs /> */}
      <SoonEvents />
      <Categories />
    </>
  );
};

export default MainPage;
