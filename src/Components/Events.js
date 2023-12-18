import React from 'react'
import Card from './Cards/Card'
import { useEffect,useState } from 'react'
import {Navigation} from './Navigation'
import './Events.css'




const eventss=[{
    name:'Jhon',
    location:'Jbeil',
    price:"3000$",
    picture: require('../assets/image.png')
},{
    name:'Maryam',
    location:'Beirut',
    price : "200$",
    picture:require('../assets/image.png')
},{
    name:'Ali',
    location:'Tripoli',
    price: "110$",
    picture:require('../assets/image.png')
}]



function Events() {
  const [events, setevents] = useState([]);
  useEffect(()=>{
      const getevents = async ()=>{
        const response = await fetch("http://127.0.0.1:5000/getevents",
        {
          method:"GET",
         
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        })
        var data= await response.json()
        if (response.ok){
          if(data){
           const format= data.map(event => {
              const [name,time,date,price,pn,venuename,location,capacity] = event
              return {
                name,
                time,
                date,
                price,
                pn,
                venuename,
                location,
                capacity
              };
            });
            setevents(format)
          }
        }
      }
      
  getevents()
  },[])
  



  return (
    <div>
    <Navigation/>
    <div className="card-container">
      <Card event={events} />
      </div>
    

    </div>
  )
}

export default Events