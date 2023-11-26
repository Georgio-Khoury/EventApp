import React,{useState} from 'react'
import { Navigation } from './Navigation'
import './CreateEvent.css'

function CreateEvent() {
  
  const [eventName,seteventName] = useState("")
  const handleSubmit =()=>{
    //send to the server
  }
  function getLocation(){
    if (navigator.geolocation) 
      navigator.geolocation.getCurrentPosition(sendPosition);
  }
  function sendPosition(position){
      var latitude= position.coords.latitude
      var longitude = position.coords.longitude
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      window.open(url,'_blank');
      console.log('blyat')
  }
  
  return (
    <div>
        <Navigation />
        <div className="createform">
        <form onSubmit={handleSubmit()}>
          <div>
            <input type="text" placeholder='Event Name' value={eventName} onChange={(e)=>{seteventName(e.target.value)}}></input>
          </div>
          <div>
            
          </div>
        </form>


        </div>
    </div>
  )
}

export default CreateEvent