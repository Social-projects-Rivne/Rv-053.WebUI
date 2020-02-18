import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { AuthContext } from './../../context/auth-context';
import SignUpIn from './../../../users/pages/SignUp';
import AdminPanelPage from '../../../admin/pages/AdminPanelPage';
import EventsList from './../../../events/pages/EventsList';
import EventDetails from './../../../events/pages/EventDetails';
import AddEvent from './../../../events/pages/AddEvent';
import Notificator from './../../components/UI/Notificator';
import HeaderLayout from '../UI/HeaderLayout';
import UserProfile from '../../../users/pages/UserProfile';
import EmailConfirmation from './EmailConfirmation';

const Routes = () => {
  return (
    <AuthContext.Consumer>
      {context =>
        context.token ? (
          <Switch>
            <Route path="/" exact>
              <HeaderLayout innerComponent={<EventsList />} />
            </Route>
            <Route path="/event/details">
              <HeaderLayout innerComponent={<EventDetails />} />
            </Route>
            <Route path="/addevent">
              <HeaderLayout innerComponent={<AddEvent />} />
            </Route>
            <Route path="/profile/:id">
              <HeaderLayout innerComponent={<UserProfile />} />
            </Route>
            <Route path="/redirect">
              <HeaderLayout innerComponent={<Notificator />} />
            </Route>
            <Route path="/confirmemail/:token">
              <HeaderLayout innerComponent={<EmailConfirmation />} />
            </Route>
            {/* next routes for admin panel */}
            <Route path="/adminpanelpage" exact>
              <HeaderLayout innerComponent={<AdminPanelPage />} isAdmin />
            </Route>
            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact>
              <HeaderLayout innerComponent={<EventsList />} />
            </Route>
            <Route path="/event/details">
              <HeaderLayout innerComponent={<EventDetails />} />
            </Route>
            <Route path="/auth">
              <HeaderLayout innerComponent={<SignUpIn />} />
            </Route>
            <Route path="/redirect">
              <HeaderLayout innerComponent={<Notificator />} />
            </Route>
            <Route path="/confirmemail/:token">
              <HeaderLayout innerComponent={<EmailConfirmation />} />
            </Route>
            <Redirect to="/auth" />
          </Switch>
        )
      }
    </AuthContext.Consumer>
  );
};
export default Routes;
