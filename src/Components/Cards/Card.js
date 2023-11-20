// Cards.jsx

import React from 'react';
import './Card.css';

const Card = ({ events }) => {
  return (
    <div className="cards-container">
      {events.map((event, index) => (
        <div key={index} className="card">
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
