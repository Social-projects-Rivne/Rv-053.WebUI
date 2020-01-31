import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

import './Header.css';

const Header = () => {
  const auth = useContext(AuthContext);
  return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="/"> <span>E</span>eeeevent</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item active">
            <NavLink className="nav-link" to="/">Home</NavLink> 
        </li>
        <li className="nav-item active">
            <NavLink className="nav-link" to="/events">All events</NavLink>
        </li>
        <li className="nav-item active">
           <NavLink className="nav-link" to="/">Calendar</NavLink>
        </li>
        <li className="nav-item active">
            {!auth.isLoggedIn && (
                <NavLink className="nav-link" to="/auth">
                  <button className="btn btn-outline-success btn-block">
                    Sign In
                  </button>
                </NavLink>
            )}
        </li>
        <li className="nav-item">
           {auth.isLoggedIn && (
                <NavLink className="nav-link" to="/profile/:userId">
                  My profile
                </NavLink>
            )}
        </li>
        <li className="nav-item">
           {auth.isLoggedIn && (
                <NavLink className="nav-link" to="/">
                  <button
                    className="btn btn-outline-success btn-block"
                    onClick={auth.logout}
                  >
                    Logout
                  </button>
                </NavLink>
            )}
        </li>
          </ul>
        </div>
    </nav>
  );
};

// <nav className="navbar navbar-expand-lg navbar-light bg-light">
//   <a className="navbar-brand" href="#">Navbar</a>
//   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon"></span>
//   </button>
//   <div className="collapse navbar-collapse" id="navbarNav">
//     <ul className="navbar-nav">
//       <li className="nav-item active">
//         <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link" href="#">Features</a>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link" href="#">Pricing</a>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
//       </li>
//     </ul>
//   </div>
// </nav>



export default Header;
