import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { AuthContext } from './../../context/auth-context';
import SignUpIn from './../../../users/pages/SignUp';
import AdminPanelPage from '../../../admin/pages/AdminPanelPage';
import Users from '../../../admin/components/Users/Users';
import Event from '../../../admin/components/Events/Event';
import Logs from '../../../admin/components/Logs/Logs';
import EventsList from './../../../events/pages/EventsList';
import EventDetails from './../../../events/pages/EventDetails';
import AddEvent from './../../../events/pages/AddEvent';
import Notificator from './../../components/UI/Notificator';
import HeaderLayout from '../UI/HeaderLayout';
import UserProfile from '../../../users/pages/UserProfile';

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
            <Route path="/profile/my">
              <HeaderLayout innerComponent={<UserProfile />} />
            </Route>
            <Route path="/redirect">
              <HeaderLayout innerComponent={<Notificator />} />
            </Route>
            {/* next routes for admin panel */}
            <Route path="/adminpanelpage" exact>
              <HeaderLayout innerComponent={<AdminPanelPage />} isAdmin />
            </Route>
            <Route path="/adminpanelpage/users">
              <HeaderLayout innerComponent={<Users />} isAdmin />
            </Route>
            <Route path="/adminpanelpage/events">
              <HeaderLayout innerComponent={<Event />} isAdmin />
            </Route>
            <Route path="/adminpanelpage/logs">
              <HeaderLayout innerComponent={<Logs />} isAdmin />
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
              <HeaderLayout innerComponent={<Notificator className="box" />} />
            </Route>
            <Redirect to="/auth" />
          </Switch>
        )
      }
    </AuthContext.Consumer>
  );
};
export default Routes;
