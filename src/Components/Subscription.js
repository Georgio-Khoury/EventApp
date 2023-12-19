import React ,{useEffect, useState} from 'react'
import { Navigation } from './Navigation'
import { useNavigate } from 'react-router-dom'

function Subscription() {
  const navigate = useNavigate()
  const subnum=1
  const userObject = JSON.parse(localStorage.getItem('user'));
  useEffect(()=>{
    if(!userObject){
      navigate("/")
    }
  },[])
  
  //const [username, setusername] = useState();
  const [phone, setphone] = useState();
  const [message, setmessage] = useState();
  const [email, setemail] = useState();
  
  
  
 async function subscribe(e){
  e.preventDefault()
  const username = userObject.name
  
      const response = await fetch('http://127.0.0.1:5000/addSubscription',
      {
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body:
          JSON.stringify({username,subnum,phone,email})
        ,
      })
      const data = await response.json()
      if (response.ok){
        const userObject = JSON.parse(localStorage.getItem('user'));
        userObject.status=true
        localStorage.setItem("user", JSON.stringify(userObject));
        console.log(userObject.status)
        setmessage(data)
        //navigate('/Account')
      }

  }
  return (
    <>
    <div><Navigation/></div>
    <div className="content">
      <form onSubmit={subscribe}>
        <div>
        <input type='text' placeholder="Business Phone" value={phone} onChange={(e)=>{setphone(e.target.value)}}></input>
        </div>
        <div>
          <input type='text' placeholder='Business Email' value={email} onChange={(e)=>{setemail(e.target.value)}}></input>
        </div>
      <button className="Subsribe" onClick={subscribe}>Subscribe</button>
      {message&&<p>{message}</p>}
      </form>
  
      
    </div>
    </>
  )
}

export default Subscription