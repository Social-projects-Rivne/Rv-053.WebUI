import React from "react";
import EventItem from "../components/EventItem";

import "./EventDetails.css";

const event = {
  id: "e1",
  title: "Authentication Without Passwords",
  description:
    "What is this session about? \n Passwords are complex - though usually they are not, and that is the problem! Users forget them and hackers don’t. So it's time to move away from this pain point and to utilize stronger authentication. This 40-minute session looks at how you go password-less using hardware security devices (FIDO2) , Windows Hello and mobile apps. Why should I attend? By the end of this session we will have covered how you can begin to remove passwords in your organization using a number of different methods that cover on-premises, cloud and Hybrid scenarios. Who is this session aimed at? This session is aimed at those ITPros responsible for AD, Azure AD, security and end user compute.",
  imageUrl: [
    "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2015/03/mobile-security-laptop-fingerprint-730x442.jpg",
    "https://images.unsplash.com/photo-1569025591510-a69144e20084?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    "https://images.unsplash.com/photo-1558403218-e82f727aaaaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    "https://images.unsplash.com/photo-1574923842719-94d5f9e28793?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
  ],
  address: "70 Wilson St · London",
  location: {
    lat: 51.5074,
    lng: 0.1278
  },
  datetime: "Tuesday, 28 January 2020",
  duration: "9:00 am to 11:00 am",
  max_participants: "200",
  min_age: "18",
  cover: "",
  status: "",
  price: "free",
  owner_id: "u1"
};

const EventDetails = () => {
  console.log("EVENT: " + event.id);
  return (
    <EventItem
      key={event.id}
      id={event.id}
      image={event.imageUrl}
      address={event.address}
      title={event.title}
      datetime={event.datetime}
      duration={event.duration}
      max_participants={event.max_participants}
      min_age={event.min_age}
      price={event.price}
      description={event.description}
      owner_id={event.owner_id}
      coordinates={event.location}
    />
  );
};

export default EventDetails;
