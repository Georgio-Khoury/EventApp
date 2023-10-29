import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
export const LoginForm = () => {
    const[username,setUsername] = useState('')
    const[password,setPassword] = useState('')
    var flag=false;
    const navigate = useNavigate();
    const creds = [['1','1'],['admin','admin'],['123','123'],['543','543']]
    const handleSubmit=(e)=>{
        e.preventDefault()//prevents default behavior of submission

        for(var i = 0;i<creds.length;i++){
            if((creds[i][0]=== username) && (creds[i][1] === password)){
                navigate('/Main')
                flag=true
            }
        

        }
    if(!flag)
        alert("Wrong username or password")
    }
  return (
    <div>
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Login</button>
    </form>
  </div>
  )
}

