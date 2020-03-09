// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import axios from 'axios';

// import { api_server_url } from './../../shared/utilities/globalVariables';
// import MySlider from '../../shared/components/UI/MySlider';
// import EventResultItem from './../pages/EventResultItem';
// import './SoonEvents.css';

// const SoonEvents = () => {
//   const [soonEventsState, setSoonEventsState] = useState();
//   const getSoonEvnets = async () => {
//     const soonEvents = (await axios.get(api_server_url + '/api/events')).data.rows.slice(0, 4);
//     setSoonEventsState(soonEvents);
//   };
//   useEffect(() => {
//     getSoonEvnets();
//   }, []);
//   return (
//     <section className="soon__events">
//       <div className="my__container">
//         <div className="soon__events-inner">
//           <div className="soon__events-title">Coming soon...</div>
//           <MySlider>
//             {soonEventsState
//               ? soonEventsState.map(event => (
//                   <EventResultItem
//                     key={event.id}
//                     className={'list__events-item card soon__events-item'}
//                     event={event}
//                   />
//                 ))
//               : null}
//           </MySlider>
//           <div className="soon__events-link">
//             <NavLink to="/events">All events</NavLink>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SoonEvents;
