import React from 'react';

import Header from './shared/components/Header/Header';
import Login from './users/pages/Login';

import './App.css';

function App() {
	return (
		<React.Fragment>
			<Header />
			<Login />
		</React.Fragment>
	);
}

export default App;
