import { createContext } from 'react';

export const EventContext = createContext({
  events: [],
  setEvents: () => {}
});
