import { useState } from "react";

export const useSearch = () => {
  const [events, setEvents] = useState([]);

  return {
    events,
    setEvents
  };
};
