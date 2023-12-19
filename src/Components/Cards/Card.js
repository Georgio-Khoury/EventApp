// Cards.jsx

import React from 'react';
import './Card.css';
import { useNavigate } from 'react-router-dom';

const Card = ({ event }) => {
  const picture = require('../../assets/image.png')
  const navigate = useNavigate();
   const handleclick=(eventName,location,price,picture,remaining)=>{
    console.log(picture)
    const image = btoa(picture)
    console.log(image)
        navigate(`/CardDetails/${eventName}/${location}/${price}/${image}/${remaining}`)
  }
  return (
    <div className="cards-container" >
      {event.map((event, index) => (
        <div key={index} className="card" onClick={()=>handleclick(event.name,event.location,event.price,picture,event.remaining)}>
          <img src={picture} alt={event.name} className="event-picture" />
          <div className="event-details">
            <h2>{event.name}</h2>
            
           
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
