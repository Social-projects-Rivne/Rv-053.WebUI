import React from 'react';

import Carousel from './../components/Carousel';
import JoinUs from './../components/JoinUs';
import Categories from './../components/Categories';
import './MainPage.css';

const MainPage = () => {
  return (
    <>
      <Carousel />
      {/* <JoinUs /> */}
      <Categories />
    </>
  );
};

export default MainPage;
