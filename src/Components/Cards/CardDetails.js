import React from 'react'
import { useParams } from 'react-router-dom'
import {Navigation} from '../Navigation'
import { useState } from 'react'
import './CardDetails.css'

function CardDetails() {
    console.log(useParams())
    const [errormsg, seterrormsg] = useState("");
    const {eventName,location,price,picture,capacity}= useParams()
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user.name
    console.log(picture)
    console.log({location})
   const image= atob(picture)
    async function register(){
      const response = await fetch("http://127.0.0.1:5000/register",
      {
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({eventName,username})
      })
      var data = await response.json()
      if(response.ok){
        if(data){
            seterrormsg(data)
        }else{

        }

      }

    }
  return (
    <div>
      <Navigation></Navigation>
      <div className='content'>

        <h2>Name: {eventName}</h2>
        <h2>Location: {location}</h2>
        <h1>Price : {price}</h1>
        <img src={image} alt="no valid image"></img>
        <p>Capacity : {capacity}</p>
        <button className="button" onClick={register}>Register Event</button>
        {errormsg && <p style={{color:'red'}}>{errormsg}</p>}

        </div>
       
        </div>
  )
}

export default CardDetails