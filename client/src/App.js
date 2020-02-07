import React from 'react';
import { BrowserRouter, useRouteMatch } from 'react-router-dom';

import Header from './shared/components/Header/Header';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/useAuth';
import Routes from './shared/components/services/Routes';
import './App.css';

const App = () => {
  const { accessToken, login, logout, tokenExpirationDate, inRefreshProcess } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!accessToken,
        token: accessToken,
        login,
        logout,
        tokenExpirationDate
      }}
    >
      <BrowserRouter>
        {!inRefreshProcess && (
          <>
            <Routes />
          </>
        )}
      </BrowserRouter>
    </AuthContext.Provider>
  );
};
export default App;
