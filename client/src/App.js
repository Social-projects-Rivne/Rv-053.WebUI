import React from 'react';

import Header from './shared/components/Header/Header';
import SignUpIn from './users/pages/SignUp';
import AdminPanelPage from './admin/AdminPanelPage';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Users from './admin/Users/Users';
import Event from './admin/Events/Event';
import Logs from './admin/Logs/Logs';
import EventsList from './events/pages/EventsList';
import { AuthContext } from './shared/context/auth-context';
import EventDetails from './events/pages/EventDetails';
import AddEvent from './events/pages/AddEvent';
import Notificator from './shared/components/UI/Notificator';
import { useAuth } from './shared/hooks/useAuth';

function App() {
  const { accessToken, login, logout, tokenExpirationDate } = useAuth();

  let routes;

  if (accessToken) {
    routes = (
      <Switch>
        <Route component={Notificator} path="/redirect" />
        <Route component={EventsList} path="/events" />
        <Route component={AddEvent} path="/addevent" />
        <Route component={EventDetails} path="/event/details" />
        <Route component={AdminPanelPage} path="/adminpanelpage" />
        <Redirect to="/events" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route component={SignUpIn} path="/auth" />
        <Route component={Notificator} path="/redirect" />
        <Route component={EventsList} path="/events" />
        <Route component={EventDetails} path="/event/details" />
        <Redirect to="/auth" />
      </Switch>
    );
  }

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
        <Header />
        {routes}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
export default App;
