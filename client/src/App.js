import React from 'react';

import Header from './shared/components/Header/Header';
import SignUp from './users/pages/SignUp';
import './App.css';
//import './App.css';
import Carousel from './events/components/carousel';
import EventsList from './events/pages/EventsList';


function App() {
	return (
		<React.Fragment>
      <Header />
			<SignUp />
			<Carousel />
			<EventsList />

		</React.Fragment>
	
		
	);
}

export default App;
