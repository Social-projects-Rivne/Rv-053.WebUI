// import React, { useContext } from 'react';
// import { NavLink } from 'react-router-dom';
// import { AuthContext } from '../../context/auth-context';

// import './Header.css';

// const Header = () => {
//   const auth = useContext(AuthContext);
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
//       <a className="navbar-brand" href="/">
//         {' '}
//         <span>E</span>eeeevent
//       </a>
//       <button
//         className="navbar-toggler"
//         type="button"
//         data-toggle="collapse"
//         data-target="#navbarNav"
//         aria-controls="navbarNav"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>
//       <div className="collapse navbar-collapse" id="navbarNav">
//         <ul className="navbar-nav">
//           <li className="nav-item active">
//             <NavLink className="nav-link" to="/">
//               Home
//             </NavLink>
//           </li>
//           {auth.isLoggedIn && (
//             <li className="nav-item active">
//               <NavLink className="nav-link" to="/addevent">
//                 Add event
//               </NavLink>
//             </li>
//           )}
//           <li className="nav-item active">
//             <NavLink className="nav-link" to="/">
//               Calendar
//             </NavLink>
//           </li>
//           {auth.isLoggedIn && (
//             <li className="nav-item active">
//               <NavLink className="nav-link" to="/profile/my">
//                 Profile
//               </NavLink>
//             </li>
//           )}
//           {!auth.isLoggedIn && (
//             <li className="nav-item active">
//               <NavLink className="nav-link" to="/auth">
//                 <button className="btn btn-outline-success btn-block">Sign In</button>
//               </NavLink>
//             </li>
//           )}
//           {auth.isLoggedIn && (
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/">
//                 <button className="btn btn-outline-success btn-block" onClick={auth.logout}>
//                   Signout
//                 </button>
//               </NavLink>
//             </li>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Header;

import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

import './Header.css';
import Logo from '../UI/Logo';
import Button from '../UI/Button';

const Header = () => {
  const auth = useContext(AuthContext);
  return (
    <header class="header">
      <div class="my__container">
        <div class="header__inner">
          <div class="header__logo">
            <Logo />
          </div>
          <form class="form__search_event">
            <input type="text" class="header__search" placeholder="Search event.." />
            <button class="header__submit"></button>
          </form>
          <div class="header__nav">
            <button class="header__calendar" onClick={() => console.log('hello')}></button>
            <button class="header__cities" onClick={() => console.log('hello')}>
              Kyiv
            </button>
            {auth.isLoggedIn && (
              <NavLink className="header__nav-link" to="/profile/my">
                Profile
              </NavLink>
            )}
            {!auth.isLoggedIn && (
              <NavLink className="header__nav-link" to="/auth">
                Sign In
              </NavLink>
            )}
            {auth.isLoggedIn && (
              <NavLink className="header__nav-link" to="/" onClick={auth.logout}>
                Signout
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
