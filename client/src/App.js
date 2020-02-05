import React, { useState, useCallback } from 'react';

import Header from './shared/components/Header/Header';
import SignUpIn from './users/pages/SignUp';
import AdminPanelPage from './admin/AdminPanelPage';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Users from './admin/Users/Users';
import Event from './admin/Events/Event';
import Logs from './admin/Logs/Logs';
import Carousel from './events/components/Carousel';
import EventsList from './events/pages/EventsList';
import { AuthContext } from './shared/context/auth-context';
import EventDetails from './events/pages/EventDetails';
import AddEvent from './events/pages/AddEvent';
import Notificator from './shared/components/UI/Notificator';

function App() {
  const [token, setToken] = useState(null);

  const login = useCallback(token => {
    setToken(token);
    console.log(token);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <Route component={Header} path="/" />
        <Route component={SignUpIn} path="/auth" />
        <Route component={Notificator} path="/redirect" />
        <Route component={Carousel} path="/events" />
        <Route component={EventsList} path="/events" />
        <Route component={AddEvent} path="/addevent" />
        <Route component={EventDetails} path="/event/details" />
        <Route component={AdminPanelPage} path="/adminpanelpage" />
        <section className="container">
          <Route component={Users} exact path="/adminpanelpage/" />
          <Route component={Event} path="/adminpanelpage/events" />
          <Route component={Logs} path="/adminpanelpage/logs" />
        </section>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
export default App;
