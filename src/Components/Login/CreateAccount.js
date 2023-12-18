import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
 import './loginform.css';

 function CreateAccount(){
    const [username,setUsername]= useState("");
    const [errormsg, seterrormsg] = useState();
    const [password,setPassword] = useState("");
    const [confirm,setConfirm] = useState("");
    const [dob, setdob] = useState("");
    const navigate = useNavigate("");
    const handleSubmit= async (e)=>{
        e.preventDefault()
            const response = await fetch("http://127.0.0.1:5000/addEPlanner",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                  },
                  body: JSON.stringify({username,password,dob})
            })
            const data = await response.json()
            if(response.ok)
            if(data===true){
            navigate('/Account')
            }else{
                seterrormsg(data)
            }
    }
 
 return(
<div className="container forms">
    <div className='form login'>
    <header>Create Account</header>
    <form onSubmit={handleSubmit}>
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
        <div className='field'>
            <input type="password"
             placeholder="Confirm Password"
             className="newpassword"
             value={confirm}   
             onChange={(e)=>{setConfirm(e.target.value)}}
            />
        </div>
        <div class="field button-field">
            <button>Signup</button>
        </div>
    </form>
    <div className="form-link">
            <Link to="/"> <span>Already have an account?</span></Link>
            </div>
    </div>
</div>
 )}
 export default CreateAccount