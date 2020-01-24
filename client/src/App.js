import React from 'react';

import Header from './shared/components/Header/Header';
import SignUp from './users/pages/SignUp';
import './App.css';

function App() {
	return (
		<React.Fragment>
			<Header />
			<SignUp />
		</React.Fragment>
	);
}

export default App;
