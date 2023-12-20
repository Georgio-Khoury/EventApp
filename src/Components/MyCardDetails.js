import React from 'react'
import { Navigation } from './Navigation'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function MyCardDetails() {
    const [provider, setprovider] = useState();
    const [options, setoptions] = useState([]);
   const navigate = useNavigate()

    useState(()=>{
        async function getServices(){
            const response = await(fetch('http://127.0.0.1:5000/getServices',{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                  },
            }))
            const data = await response.json()
            if(response.ok){
                console.log(data)
               const op =  data.map((opp)=>{
                    return {label:opp[0]}
               })
               console.log("op:",op)
               setoptions(op)
               console.log(options)
            }


        }
    getServices()},[])  
    const {eventName,location,price,picture,remaining}= useParams()
    const image = atob(picture)

    async function addServes(e){
            e.preventDefault()
            console.log(provider, eventName)
            const response= await fetch('http://127.0.0.1:5000/addServes',
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                  },
                  body: JSON.stringify({eventName,provider})

            })
            const data = await response.json()
            if(response.ok){
                
            }

    }

    async function deleteEvent(){
        const response = await fetch('http://127.0.0.1:5000/deleteEvent',{
            
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                  },
                  body: JSON.stringify({eventName})

            })
            if(response.ok){
              navigate('/MyEvents')
            }
          
    }
   

  return (
    <div><Navigation />
    <div className="contentt">
    <h2>Name: {eventName}</h2>
        <h2>Location: {location}</h2>
        <h1>Price : {price}</h1>
        <img src={image} alt="frik"></img>
        <p>Remaining Places : {remaining}</p>
        <button className="buttonreg"onClick={deleteEvent}>Delete Event</button>
        <div>
            <form onSubmit={addServes}>
            <select id="dropdown" value={provider} onChange={(e)=>{setprovider(e.target.value)}}>
          <option value="">Please select</option>
          {options.map((option, index) => (
            <option key={index} >{option.label}</option>
          ))}
        </select>
            <button  className="buttonreg"style={{ marginRight: '10px' }}>Add Service</button>
            </form>
       
       
        </div>
        
    </div>
    </div>
  )
}

export default MyCardDetails