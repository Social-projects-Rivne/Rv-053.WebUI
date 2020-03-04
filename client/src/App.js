import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/useAuth';
import Routes from './shared/components/services/Routes';
import { useSearch } from './shared/hooks/useSearch';
import { EventContext } from './shared/context/events-context';
import './App.css';

const App = () => {
  const { accessToken, login, logout, tokenExpirationDate, inRefreshProcess } = useAuth();
  const { events, setEvents } = useSearch();

  return (
    <EventContext.Provider value={{ events: events, setEvents: setEvents }}>
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
    </EventContext.Provider>
  );
};
export default App;
