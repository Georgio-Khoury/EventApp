import React, { useEffect,useState } from 'react'
import { Navigation } from './Navigation'
import { useNavigate } from 'react-router-dom'

function Account() {
  const [firstname, setfirstname] = useState('');
  const [lastname,setlastname] = useState('')
  const userObject = JSON.parse(localStorage.getItem('user'));
  const status = userObject.status
  useEffect(
    ()=>{
      
      const getuser = async ()=>{
      const response = fetch('http://127.0.0.1:5000/getEUser',{
        method:"GET",
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },[])

      

      
    }
  },[])
  const navigate = useNavigate()
  const logout= async (e) =>{
      e.preventDefault()
      const response = await fetch('http://127.0.0.1:5000/logout',{
        method : "POST",
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        
      })
      
      if(response.ok){
        localStorage.clear()
        navigate("/")
      }
    }
    
    
    
      
     
  return (
    <div>
        <Navigation />
        <div className='content'>
          <h1>Welcome,{firstname} {lastname}</h1>
          {status&&<h1>You are subscribed</h1>}
          <button onClick={logout}>Logout</button>
        </div>
    </div>
  )
}

export default Account