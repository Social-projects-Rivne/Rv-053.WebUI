import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { AuthContext } from './../../context/auth-context';
import SignUpIn from './../../../users/pages/SignUp';
import AdminPanelPage from './../../../admin/AdminPanelPage';
import Users from './../../../admin/Users/Users';
import Event from './../../../admin/Events/Event';
import Logs from './../../../admin/Logs/Logs';
import EventsList from './../../../events/pages/EventsList';
import EventDetails from './../../../events/pages/EventDetails';
import AddEvent from './../../../events/pages/AddEvent';
import Notificator from './../../components/UI/Notificator';

const Routes = () => {
  //   const auth = useContext(AuthContext);

  //   let routes;

  //   if (auth.isLoggedIn) {
  //     routes = (
  //       <Switch>
  //         <Route component={EventsList} path="/" exact />
  //         <Route component={Notificator} path="/redirect" />
  //         <Route component={AddEvent} path="/addevent" />
  //         <Route component={EventDetails} path="/event/details" />
  //         <Route component={EventDetails} path="/profile/my" />
  //         <Route component={AdminPanelPage} path="/adminpanelpage" exact />
  //         <Route component={Users} path="/adminpanelpage/users" />
  //         <Route component={Logs} path="/adminpanelpage/logs" />
  //         <Route component={Event} path="/adminpanelpage/events" />
  //         <Redirect to="/" />
  //       </Switch>
  //     );
  //   } else {
  //     routes = (
  //       <Switch>
  //         <Route component={SignUpIn} path="/auth" />
  //         <Route component={Notificator} path="/redirect" />
  //         <Route component={EventsList} path="/events" />
  //         <Route component={EventDetails} path="/event/details" />
  //         <Redirect to="/auth" />
  //       </Switch>
  //     );
  //   }

  return (
    <React.Fragment>
      {/* {console.log('accToken: ' + auth.token)} */}
      <AuthContext.Consumer>
        {context =>
          context.token ? (
            <Switch>
              {console.log(context.token)}
              <Route component={EventsList} path="/" exact />
              <Route component={Notificator} path="/redirect" />
              <Route component={AddEvent} path="/addevent" />
              <Route component={EventDetails} path="/event/details" />
              <Route component={EventDetails} path="/profile/my" />
              <Route component={AdminPanelPage} path="/adminpanelpage" exact />
              <Route component={Users} path="/adminpanelpage/users" />
              <Route component={Logs} path="/adminpanelpage/logs" />
              <Route component={Event} path="/adminpanelpage/events" />
              <Redirect to="/" />
            </Switch>
          ) : (
            <Switch>
              <Route component={SignUpIn} path="/auth" />
              <Route component={Notificator} path="/redirect" />
              <Route component={EventsList} path="/events" />
              <Route component={EventDetails} path="/event/details" />
              <Redirect to="/auth" />
            </Switch>
          )
        }
      </AuthContext.Consumer>
    </React.Fragment>
  );
};
export default Routes;
