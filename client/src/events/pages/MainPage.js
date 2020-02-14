import React from 'react';

import Header from './../../shared/components/Header/Header';
import Carousel from './../../events/components/Carousel';
import Footer from './../../shared/components/Footer/Footer';
import './MainPage.css';

const MainPage = () => {
  return (
    <div className="wrapper">
      <div className="content">
        {/* <Header /> */}
        <Carousel />
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
