
import React from 'react';
import './Cards/Card.css';
import { useNavigate } from 'react-router-dom';

const MyCard = ({ event }) => {
  const picture = require('../assets/image.png')
  const navigate = useNavigate();
  
    const deleteEvent=()=>{

    }

    

  
  const handleclick=(eventName,location,price,picture,capacity)=>{
    console.log(picture)
    const image = btoa(picture)
    console.log(image)
        navigate(`/MyCardDetails/${eventName}/${location}/${price}/${image}/${capacity}`)
  }


  if(!event || !Array.isArray(event) || event.length === 0)
    return(<h1 className="content">You have no events to be displayed</h1>)
  return (
    <div className="cards-container" >
      {event.map((event, index) => (
        <div>
        <div key={index} className="card" onClick={()=>handleclick(event.name,event.location,event.price,picture,event.capacity)}>
          <img src={picture} alt={event.name} className="event-picture" />
          <div className="event-details">
            <h2>{event.name}</h2>
            
            
          </div>
        </div>
        
       </div>
      ))}
    </div>
  );
};

export default MyCard;
