import React, { createContext, useState, useReducer } from "react";
import {
  GET_ALL,
  GET_TODAY,
  GET_SEVEN,
  GET_THIRTY,
  dateReducer
} from "./DateReducer";

export const DateRangesContext = createContext("");

const DateRangesContextProvider = props => {
  const [dateRanges] = useState([
    { id: "1", dateRange: "All Future", type: GET_ALL },
    { id: "2", dateRange: "Today", type: GET_TODAY },
    { id: "3", dateRange: "Next 7 days", type: GET_SEVEN },
    { id: "4", dateRange: "Next 30 days", type: GET_THIRTY }
  ]);
  const [timeStamp, dispatch] = useReducer(dateReducer, dateRanges[0].type);
  const startDate = timeStamp.startDate;
  const endtDate = timeStamp.endDate;
  return (
    <DateRangesContext.Provider
      value={{ dateRanges, dispatch, timeStamp, startDate, endtDate }}
    >
      {props.children}
    </DateRangesContext.Provider>
  );
};

export default DateRangesContextProvider;
