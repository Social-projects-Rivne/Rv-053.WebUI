import React from 'react';

import Header from './shared/components/Header/Header';
// import Login from './users/pages/Login';
import SignUp from './users/pages/SignUp';
import './App.css';


function App() {
	return (	
		<React.Fragment>
      <Header />
			{/* <Login /> */}
	  	<SignUp/>
		</React.Fragment>
	);
}

export default App; 