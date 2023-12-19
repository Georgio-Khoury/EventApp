import React from 'react'
import { Navigation } from './Navigation'
import { useEffect,useState } from 'react'
import MyCard from './MyCard'
function MyEvents() {
    var obj = JSON.parse(localStorage.getItem('user'))
    
    const [events, setevents] = useState();
    useEffect(()=>{
        async function getEvents(){
            var username = obj.name
            const response = await fetch(`http://127.0.0.1:5000/getMyevents/${username}`,{
                method: "GET",
                headers:{
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                  },
            })
                const data = await response.json()
                if(response.ok){
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

    getEvents()
},[])
  return (
    <div>
        <Navigation />
        <div className="card-container">
      <MyCard event={events} />
      </div>
    </div>
  )
}

export default MyEvents