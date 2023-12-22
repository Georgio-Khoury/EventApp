import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
 import './loginform.css';

 function CreateAccount(){
    const [username,setUsername]= useState("");
    const [errormsg, seterrormsg] = useState();
    const [password,setPassword] = useState("");
    const [confirm,setConfirm] = useState("");
    const [email, setemail] = useState();
    const [dob, setdob] = useState("");
    const [pn, setpn] = useState();
    const [fn, setfn] = useState();
  const [ln, setln] = useState();
    const navigate = useNavigate("");
    const handleSubmit= async (e)=>{
        e.preventDefault()
        
            const response = await fetch("http://127.0.0.1:5000/addEUser",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                  },
                  body: JSON.stringify({username,password,dob,email,pn,fn,ln})
            })
            const data = await response.json()
            if(response.ok)
            if(data===true){
            navigate('/')
            }else{
                seterrormsg(data)
            }
    }
 
 return(
<div className="container forms">
    <div className='form login'>
    <header style={{color:'white'}}>Create Account</header>
    <form onSubmit={handleSubmit}>
    <div className='field'>
            <input type="text"
             placeholder="FirstName"
             className="input"
             value={fn}   
             onChange={(e)=>{setfn(e.target.value)}}
            /></div>
             <div className='field'>
            <input type="text"
             placeholder="LastName"
             className="input"
             value={ln}   
             onChange={(e)=>{setln(e.target.value)}}
            /></div>
        <div className='field'>
            <input type="text"
             placeholder="Username"
             className="input"
             value={username}   
             onChange={(e)=>{setUsername(e.target.value)}}
            />
        </div>
        <div className='field'>
            <input type="password"
             placeholder="Password"
             className="password"
             value={password}   
             onChange={(e)=>{setPassword(e.target.value)}}
            />
        </div>
        {/* <div className='field'>
            <input type="password"
             placeholder="Confirm Password"
             className="newpassword"
             value={confirm}   
             onChange={(e)=>{setConfirm(e.target.value)}}
            />
        </div> */}
        <div className='field'>
            <input type="date"
             placeholder="Date of Birth"
             
             value={dob}   
             onChange={(e)=>{setdob(e.target.value)}}
            />
        </div>
        <div className='field'>
            <input type="text"
             placeholder="email"
             className="email"
             value={email}   
             onChange={(e)=>{setemail(e.target.value)}}
            />
        </div>
        <div className='field'>
            <input type="text"
             placeholder="Phone Number"
             className="pn"
             value={pn}   
             onChange={(e)=>{setpn(e.target.value)}}
            />
        </div>
        <div class="field button-field">
            <button >Signup</button>
        </div>
    </form>
    <div className="form-link">
            <Link to="/"> <span>Already have an account?</span></Link>
            </div>
    </div>
</div>
 )}
 export default CreateAccount