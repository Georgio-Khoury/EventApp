// Cards.jsx

import React from 'react';
import './Card.css';
import { useNavigate } from 'react-router-dom';

const Card = ({ events }) => {
  const navigate = useNavigate();
   const handleclick=(eventName,location,price,picture)=>{
    console.log(picture)
    const image = btoa(picture)
    console.log(image)
        navigate(`/CardDetails/${eventName}/${location}/${price}/${image}`)
  }
  return (
    <div className="cards-container" >
      {events.map((event, index) => (
        <div key={index} className="card" onClick={()=>handleclick(event.name,event.location,event.price,event.picture)}>
          <img src={event.picture} alt={event.name} className="event-picture" />
          <div className="event-details">
            <h2>{event.name}</h2>
            <p>{event.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
