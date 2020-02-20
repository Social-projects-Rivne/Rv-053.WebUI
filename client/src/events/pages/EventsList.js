import React, { Component, useContext } from 'react';

import EventInList from '../components/EventInList';
import Carousel from './../components/Carousel';
import './EventsList.css';
import Search from '../components/search';
import { EventContext } from '../../shared/context/events-context';

const eventInfo = {
  imageSrc:
    'https://promoter-production-images.s3.amazonaws.com/uploads/venue/image/48/350_350.jpg',
  name: 'Пінна вечірка в Лагуні',
  location: 'Laguna, Rivne',
  description:
    'Вхід дівчатам до 00:00  безкоштовно. На заході будуть такі зірки, як Олег Винник і Оля Полякова, тому йти не радимо, але приходьте і купуйте коктейлі по 120грн',
  //date: new Date("2020, 2, 1"),
  price: 200
};

const eventsArr = [eventInfo, eventInfo, eventInfo, eventInfo, eventInfo, eventInfo];

const EventsList = () => {
  const eventContext = useContext(EventContext);

  return (
    <React.Fragment>
      <Carousel />
      <Search />
      <div className="d-flex flex-wrap justify-content-around">
        {eventContext.events.map(eventInfo => {
          return <EventInList eventInfo={eventInfo} />;
        })}
      </div>
    </React.Fragment>
  );
};

export default EventsList;
