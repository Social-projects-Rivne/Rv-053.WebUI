import React, {Component} from "react";
import EventInList from "../components/EventInList";
import './EventsList.css';

const eventInfo = {
    imageSrc: 'https://promoter-production-images.s3.amazonaws.com/uploads/venue/image/48/350_350.jpg',
    name: "Пінна вечірка в Лагуні",
    location: "Laguna, Rivne",
    description: "Вхід дівчатам до 00:00  безкоштовно. На заході будуть такі зірки, як Олег Винник і Оля Полякова, тому йти не радимо, але приходьте і купуйте коктейлі по 120грн",
    //date: new Date("2020, 2, 1"),
    price: 200
};

const eventsArr = [eventInfo, eventInfo, eventInfo, eventInfo, eventInfo, eventInfo];


class EventsList extends Component{
    render(){ 
        return( 
               <div className="d-flex flex-wrap justify-content-around">
          
            { 
            eventsArr.map((eventInfo) => { 
                
                return  <EventInList eventInfo={eventInfo}/>;
                
              })
            }
         </div> 
        )}

};


export default EventsList;