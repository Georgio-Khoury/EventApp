import React from 'react'
import { useParams } from 'react-router-dom'
import {Navigation} from '../Navigation'
import './CardDetails.css'

function CardDetails() {
    console.log(useParams())
    const {eventName,location,price,picture}= useParams()
    console.log(picture)
    console.log({location})
   const image= atob(picture)
    function register(){

    }
  return (
    <div>
      <Navigation></Navigation>
      <div className='content'>

        <h2>Name: {eventName}</h2>
        <h2>Location: {location}</h2>
        <h1>Pirce : {price}</h1>
        <img src={image} alt="no valid image"></img>
        <button className="button" onClick={register}>Register Event</button>
        </div>
       
        </div>
  )
}

export default CardDetails