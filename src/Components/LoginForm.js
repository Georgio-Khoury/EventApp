import React, { useState } from 'react';
import './loginform.css';
import {Link, useNavigate} from 'react-router-dom';

export const LoginForm = () => {

    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');

    var flag=false;

    const navigate = useNavigate();

    const creds = [['1','1'],['admin','admin'],['123','123'],['543','543']];
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

  <section class="container forms">
            <div class="form login">
                <div class="form-content">
                    <header>Login</header>
                    <form onSubmit={handleSubmit}>
                        <div class="field input-field">
                            <input 
                            type="text" 
                            placeholder="Username" 
                            class="input"
                            value={username}
                            onChange={(e) => {setUsername(e.target.value)}}
                            />
                              
                        </div>

                        <div class="field input-field">
                            <input 
                            type="password" 
                            placeholder="Password" 
                            class="password" 
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                            />
                            <i class='bx bx-hide eye-icon'></i>
                        </div>

                        <div class="form-link">
                            <a href="#" class="forgot-pass">Forgot password?</a>
                        </div>

                        <div class="field button-field">
                            <button>Login</button>
                        </div>
                    </form>

                    <div class="form-link">
                        <span>Don't have an account? <a href="#" class="link signup-link">Signup</a></span>
                    </div>
                </div>


            </div>

            <div class="form signup">
                <div class="form-content">
                    <header>Signup</header>
                    <form action="#">
                    <div class="field input-field">
                            <input 
                            type="text" 
                            placeholder="Username" 
                            class="input"
                            value={username}
                            onChange={(e) => {setUsername(e.target.value)}}
                            />
                              
                        </div>

                        <div class="field input-field">
                            <input 
                            type="password" 
                            placeholder="Password" 
                            class="password" 
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                            />
                            <i class='bx bx-hide eye-icon'></i>
                        </div>

                        <div class="field input-field">
                            <input type="password" placeholder="Confirm password" class="password" />
                            <i class='bx bx-hide eye-icon'></i>
                        </div>

                        <div class="field button-field">
                            <button>Signup</button>
                        </div>
                    </form>

                    <div class="form-link">
                        <span>Already have an account? <a href="#" class="link login-link">Login</a></span>
                    </div>
                </div>



            </div>
        </section>

  )
}
