import React from 'react';

import Header from './shared/components/Header/Header';
import SignUpIn from './users/pages/SignUp';
import AdminPanelPage from './admin/AdminPanelPage'
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Users from './admin/Users/Users'
import Event from './admin/Events/Event'
import Logs from './admin/Logs/Logs'
import Carousel from './events/components/carousel'
import EventsList from './events/pages/EventsList';
import AddEvent from './events/pages/AddEvent';

function App() {
	return (
		<BrowserRouter>
			<Route component={Header} path="/"/>
			<Route component={SignUpIn} path="/auth" />
			<Route component={Carousel} path='/events' />
			<Route component={EventsList} path='/events' />
			<Route component={AddEvent} path='/addevent' />
			<Route component={AdminPanelPage} path="/adminpanelpage" />
			<section className="container">
                <Route component={Users} exact path="/adminpanelpage/" />
                <Route component={Event} path="/adminpanelpage/events" />
                <Route component={Logs} path="/adminpanelpage/logs" />
            </section>
		</BrowserRouter>
	);
}

export default App;
