import React from 'react';

import Header from '../Header/Header';
import AdminHeader from '../Header/AdminHeader';
import Footer from '../Footer/Footer';

const PageLayout = props => {
  return (
    <>
      <div className="content">
        {props.isAdmin ? <AdminHeader /> : <Header />}
        {props.innerComponent || props.children}
      </div>
      <Footer />
    </>
  );
};
export default PageLayout;
