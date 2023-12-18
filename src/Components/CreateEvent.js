import React,{useEffect, useState} from 'react'
import { Navigation } from './Navigation'
import './CreateEvent.css'
import { useNavigate } from 'react-router-dom'

function CreateEvent() {
  const [errorMsg, seterrorMsg] = useState("");
  const [Eventname,seteventName] = useState("")
  const [eventDate,seteventDate] = useState("")
  const [price,setPrice]= useState(0);
const [venuename,setVenue]= useState('')
const [pn,setpn] = useState('')
  const [location, setlocation] = useState('');
  const [date, setdate] = useState();
  const [time, settime] = useState('');
  //const [status,setstatus]= useState('')
  // const [capacity, setcapacity] = useState();
  //const [username,setusername] = useState('')
  const userObject = JSON.parse(localStorage.getItem('user'));
  const username = userObject.name
  const status = userObject.status
  const navigate = useNavigate()
 
  
 
  const handleSubmit =async (e)=>{
    e.preventDefault()
    
  console.log(username, status)
    const response = await fetch('http://127.0.0.1:5000/event',{
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({eventDate,pn,Eventname,venuename,time,price,username,status}),

  })
  const data = await response.json()
  console.log(data)
  if(response.ok){
    if(data===true){
    
      navigate('/Events')
    }
    else{
      seterrorMsg(data)
    }
  }
  
  }
//  const changeFormat=(date)=>{
  
//   var originalValue = date
//   var dateParts = originalValue.split('-');
//   var formattedDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
 
 
//   return formattedDate;
//  }
  
  return (
    <div>
        <Navigation />
        <div className="createform">
        <form onSubmit={handleSubmit}>
      
      <div>
        <label>Event Name:</label>
        <input
          type="text"
          value={Eventname}
          onChange={(e) => seteventName(e.target.value)}
        />
      </div>
      <div>
        <label>Event Date:</label>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => seteventDate(e.target.value)}
        />
      </div>
      {/* Other input fields for the remaining variables */}
      <div>
        <label>Venue:</label>
        <input
          type="text"
          value={venuename}
          onChange={(e) => setVenue(e.target.value)}
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          value={pn}
          onChange={(e) => setpn(e.target.value)}
        />
      </div>
      {/* <div>
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setlocation(e.target.value)}
        />
      </div> */}
      
      <div>
        <label>Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => settime(e.target.value)}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
      {errorMsg && <p style={{color:'red'}}>{errorMsg}</p>}
    </form>

        </div>
    </div>
  )
}

export default CreateEvent