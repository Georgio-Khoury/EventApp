import React, { useEffect,useState } from 'react'
import { Navigation } from './Navigation'
import { useNavigate } from 'react-router-dom'

function Account() {
  const navigate = useNavigate()
  const [firstname, setfirstname] = useState('');
  const [lastname,setlastname] = useState('')
  const userObject = JSON.parse(localStorage.getItem('user'));
  var status,fn,ln
  if(userObject){
    status = userObject.status
    fn = userObject.fn
    ln = userObject.ln
    }

  
  
  useEffect(
    ()=>{

      
      const check = async ()=>{
      // const response = fetch('http://127.0.0.1:5000/getEUser',{
      //   method:"GET",
      //   headers:{
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': '*',
      //   },
      // })
      if(!userObject){
          navigate('/')
        }

      

      
    }
    check()
  },[])
 
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
          <h1>Welcome, {fn} {ln}</h1>
          {status&&<h1>You are subscribed</h1>}
          <button onClick={logout}>Logout</button>
        </div>
    </div>
  )
}

export default Account