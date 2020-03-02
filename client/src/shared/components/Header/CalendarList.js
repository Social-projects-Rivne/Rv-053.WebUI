import React from "react";

const CalendarList = () => {
  return (
    <div className='header__calendar-list'>
      <ul>
        <li>
          <a>Today</a>
        </li>
        <li>
          <a>Tomorrow</a>
        </li>
        <li>
          <a>This week</a>
        </li>
        <li>
          <a>This weekend</a>
        </li>
        <li>
          <a>This month</a>
        </li>
      </ul>
    </div>
  );
};

export default CalendarList;
