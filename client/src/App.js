import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/useAuth';
import Routes from './shared/components/services/Routes';
import './App.css';
import { useSearch } from './shared/hooks/useSearch';
import { EventContext } from './shared/context/events-context';
import DateRangesContextProvider from './shared/components/Filter/DateRange/DateRangesContext';
import CategoryContextProvider from './shared/components/Filter/Category/CategoryContext';

const App = () => {
  const {
    accessToken,
    login,
    logout,
    tokenExpirationDate,
    inRefreshProcess
  } = useAuth();
  const { events, setEvents } = useSearch();

  return (
    <DateRangesContextProvider>
      <CategoryContextProvider>
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
      </CategoryContextProvider>
    </DateRangesContextProvider>
  );
};
export default App;
