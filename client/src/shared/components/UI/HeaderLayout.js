import React from 'react';

import Header from '../Header/Header';
import AdminHeader from '../Header/AdminHeader';

const HeaderLayout = props => {
  return (
    <>
      {props.isAdmin ? <AdminHeader /> : <Header />}
      {props.innerComponent || props.children}
    </>
  );
};
export default HeaderLayout;
