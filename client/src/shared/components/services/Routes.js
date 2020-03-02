import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { AuthContext } from "./../../context/auth-context";
import SignUpIn from "./../../../users/pages/SignUp";
import AdminPanelPage from "../../../admin/pages/AdminPanelPage";
import EventDetails from "./../../../events/pages/EventDetails";
import AddEvent from "./../../../events/pages/AddEvent";
import Notificator from "./../../components/UI/Notificator";
import PageLayout from "../UI/PageLayout";
import UserProfile from "../../../users/pages/UserProfile";
import EmailConfirmation from "./EmailConfirmation";
import MainPage from "../../../events/pages/MainPage";
import EventsResult from "./../../../events/pages/EventsResult";
import EditProfile from "./../../../users/pages/EditProfile";

const Routes = () => {
  return (
    <AuthContext.Consumer>
      {context =>
        context.token ? (
          <Switch>
            <Route path='/' exact>
              <PageLayout innerComponent={<MainPage />} />
            </Route>
            <Route path='/events' exact>
              <PageLayout innerComponent={<EventsResult />} />
            </Route>
            <Route path="/event/:eventId">
              <PageLayout innerComponent={<EventDetails />} />
            </Route>
            <Route path='/addevent'>
              <PageLayout innerComponent={<AddEvent />} />
            </Route>
            <Route path='/profile/:id'>
              <PageLayout innerComponent={<UserProfile />} />
            </Route>
            <Route path='/editprofile'>
              <PageLayout innerComponent={<EditProfile />} />
            </Route>
            <Route path='/redirect'>
              <PageLayout innerComponent={<Notificator />} />
            </Route>
            <Route path='/confirmemail/:token'>
              <PageLayout innerComponent={<EmailConfirmation />} />
            </Route>
            <Route path='/adminpanelpage' exact>
              <PageLayout innerComponent={<AdminPanelPage />} isAdmin />
            </Route>
            <Redirect to='/' />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact>
              <PageLayout innerComponent={<MainPage />} />
            </Route>
            <Route path='/events' exact>
              <PageLayout innerComponent={<EventsResult />} />
            </Route>
            <Route path="/event/:eventId">
              <PageLayout innerComponent={<EventDetails />} />
            </Route>
            <Route path='/auth'>
              <PageLayout innerComponent={<SignUpIn />} />
            </Route>
            <Route path='/redirect'>
              <PageLayout innerComponent={<Notificator />} />
            </Route>
            <Route path='/confirmemail/:token'>
              <PageLayout innerComponent={<EmailConfirmation />} />
            </Route>
            <Redirect to='/auth' />
          </Switch>
        )
      }
    </AuthContext.Consumer>
  );
};
export default Routes;
