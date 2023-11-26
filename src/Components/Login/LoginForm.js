import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import './loginform.css';

export const LoginForm = () => {
    const[username,setUsername] = useState('')
    const[password,setPassword] = useState('')
    const[errormsg,setErrormsg] = useState('');
    var flag=false;
    const navigate = useNavigate();
    const creds = [['1','1'],['admin','admin'],['123','123'],['543','543']]
    const handleSubmit=(e)=>{
        e.preventDefault()//prevents default behavior of submission

        for(var i = 0;i<creds.length;i++){
            if((creds[i][0]=== username) && (creds[i][1] === password)){
                navigate('/Events')
                flag=true
            }
        

        }
    if(!flag)
        setErrormsg("Incorrect username or password")
    }
  return (
    <section className="container forms">
    <div className="form login">
        <div className="form-content">
            <header>Login</header>
            <form onSubmit={handleSubmit}>
                <div className="field input-field">
                    <input 
                    type="text" 
                    placeholder="Username" 
                    className="input"
                    value={username}
                    onChange={(e) => {setUsername(e.target.value)}}
                    />
                      
                </div>

                <div className="field input-field">
                    <input 
                    type="password" 
                    placeholder="Password" 
                    className="password" 
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                    />
                    <i className='bx bx-hide eye-icon'></i>
                </div>
                {errormsg && <p style={{color:'red'}}>{errormsg}</p>}
                
                <div className="form-link">
                    Forgot password?
                </div>

                <div className="field button-field">
                    <button>Login</button>
                </div>
            </form>

            <div className="form-link">
                <Link to="/CreateAccount"><span>Don't have an account? </span></Link>
            </div>
        </div>


   

   
            

            
            </div>
        



   
</section>
  )
}

