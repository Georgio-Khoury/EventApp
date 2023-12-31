import React,{useEffect, useState} from 'react'
import { Navigation } from './Navigation'
import './CreateEvent.css'
import { useNavigate } from 'react-router-dom'
import { getValue } from '@testing-library/user-event/dist/utils'

function CreateEvent() {
  const navigate = useNavigate()
  const userObject = JSON.parse(localStorage.getItem('user'));
  useEffect(()=>{
    if(!userObject){
      navigate("/")
    }
    const getvenues = async ()=>{
      const response = await fetch('http://127.0.0.1:5000/getvenues',{
        method:"GET",
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
      })
      const data = await response.json()
      if(response.ok){
        const op =  data.map((opp)=>{
          return {label:opp[0]}
     })
        setoptions(op)
      }
    }
  getvenues()},[])
  const [errorMsg, seterrorMsg] = useState("");
  const [Eventname,seteventName] = useState("")
  const [eventDate,seteventDate] = useState("")
  const [price,setPrice]= useState(0);
  const [endtime, setendtime] = useState();
const [venuename,setVenue]= useState('')
const [options, setoptions] = useState([]);
const [pn,setpn] = useState('')
  const [location, setlocation] = useState('');
  const [date, setdate] = useState();
  const [time, settime] = useState('');
  
  //const [status,setstatus]= useState('')
  // const [capacity, setcapacity] = useState();
  //const [username,setusername] = useState('')
  if(userObject){
  var username = userObject.name
  var status = userObject.status
  }
 
  
 
  const handleSubmit =async (e)=>{
    e.preventDefault()
    
  console.log(username, status)
    const response = await fetch('http://127.0.0.1:5000/event',{
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({eventDate,Eventname,venuename,time,endtime,price,username,status}),

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
        <div className="container ">
        <form onSubmit={handleSubmit}>
      
        <div className='field input'>
        <label>Event Name:</label>
        <input
          type="text"
          value={Eventname}
          onChange={(e) => seteventName(e.target.value)}
        />
      </div>
      <div className='field input' style={{marginBottom:'20px',marginTop:'20px'}}>
        <label>Event Date:</label>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => seteventDate(e.target.value)}
        />
      </div>
      {/* Other input fields for the remaining variables */}
      {/* <div>
        <label>Venue:</label>
        <input
          type="text"
          value={venuename}
          onChange={(e) => setVenue(e.target.value)}
        />
      </div> */}
       <div className='field input' style={{marginBottom:'20px',marginTop:'20px'}}>
        <label>Venue:</label>
       <select id="dropdown" value={venuename} onChange={(e)=>{setVenue(e.target.value)}}>
          <option value="">Please select</option>
          {options.map((option, index) => (
            <option key={index} >{option.label}</option>
          ))}
        </select>
        </div>
      {/* <div>
        <label>Phone Number:</label>
        <input
          type="text"
          value={pn}
          onChange={(e) => setpn(e.target.value)}
        />
      </div> */}
      {/* <div>
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setlocation(e.target.value)}
        />
      </div> */}
      
      <div className='field input' style={{marginBottom:'20px',marginTop:'20px'}}>
        <label>Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => settime(e.target.value)}
        />
      </div>
      <div className='field input' style={{marginBottom:'20px',marginTop:'20px'}}>
        <label>End Time:</label>
        <input
          type="time"
          value={endtime}
          onChange={(e) => setendtime(e.target.value)}
        />
      </div>
      <div className='field input' style={{marginBottom:'20px',marginTop:'20px'}}>
        <label>Price:</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className='field button'>
        <button className='buttonreg' style={{backgroundColor:"#6A5ACD"}} type="submit">Submit</button>
      </div>
      {errorMsg && <p style={{color:'red'}}>{errorMsg}</p>}
    </form>

        </div>
    </div>
  )
}

export default CreateEvent