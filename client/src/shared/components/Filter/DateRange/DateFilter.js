import React, { useState, useContext, useEffect } from "react";
import { GET_ALL } from "./DateReducer";
import { DateRangesContext } from "./DateRangesContext";

const DateFilter = props => {
  const { dateRanges, dispatch } = useContext(DateRangesContext);
  console.log({ dateRanges });
  const handleDate = e => {
    e.preventDefault();
    dispatch({
      type: e.target.value,
      timeStamp: {}
    });
    console.log(e.target.value);
  };

  useEffect(() => {
    dispatch({
      type: GET_ALL
    });
  }, []);

  return (
    <>
      <select
        className='form-control form-control-lg col-md-4 mx-auto'
        onChange={handleDate}
      >
        {dateRanges.map(item => (
          <option
            className='dropdown-item'
            style={{ color: "#16a085" }}
            type='button'
            key={item.id}
            value={item.type}
          >
            {item.dateRange}
          </option>
        ))}
      </select>
    </>
  );
};

export default DateFilter;
