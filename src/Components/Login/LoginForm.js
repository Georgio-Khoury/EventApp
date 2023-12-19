import React,{useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import './loginform.css';

export const LoginForm = () => {
    const[username,setUsername] = useState('')
    const[password,setPassword] = useState('')
    const[errormsg,setErrormsg] = useState('');
    
    var status=false
   // const[islog,setislog]= useState(true)
    const navigate = useNavigate();
    //useEffect(isloggedIn,[islog, navigate])

    // function isloggedIn(){
    //   console.log(islog)
    //   if(islog)
    //     navigate('/Events')
    // }
    const handleSubmit = async (e) => {
      e.preventDefault()
       
        setErrormsg('');
    
        try {
          const response = await fetch('http://127.0.0.1:5000/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ username,password }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            
            //setPassword(data.password);
           
            if(data===true){
              
              const response = await fetch('http://127.0.0.1:5000/status',{
                method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
           body:JSON.stringify({username})
              })
              const stat = await response.json()
              if(response.ok){
                console.log(stat)
                if(stat===true){
                status=true
                }
                const response = await fetch('http://127.0.0.1:5000/fn',{
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                  },
                 body:JSON.stringify({username})
                })
                var fndata = await response.json()
                if(response.ok)
                var  fn = fndata

                const res= await fetch('http://127.0.0.1:5000/ln',{
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                  },
                 body:JSON.stringify({username})
                })
                var lndata = await res.json()
                if(res.ok)
                var  ln = lndata

                const resp = await fetch('http://127.0.0.1:5000/fn',{
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                  },
                 body:JSON.stringify({username})
                })
                var pndata = await resp.json()
                if(resp.ok)
                var  pn = pndata
              }
              console.log(fn ,ln ,pn)
              localStorage.setItem("user",JSON.stringify({"name":username,"pass":password,"status":status,"fn":fn,"ln":ln,"pn":pn}));
            navigate('/Events')
            }
           else {
            
            
            setErrormsg(data||'Failed to retrieve password');
          }
        }
        } catch (error) {
          setPassword(''); 
          setErrormsg('Error occurred while fetching data');
          console.error('Error :', error);
        }
      };
     

    
   
   
    // var flag=false;

    // const creds = [['1','1'],['admin','admin'],['123','123'],['543','543']]
    // const handleSubmit=(e)=>{
    //     e.preventDefault()//prevents default behavior of submission

    //     for(var i = 0;i<creds.length;i++){
    //         if((creds[i][0]=== username) && (creds[i][1] === password)){
    //             navigate('/Events')
    //             flag=true
    //         }
        

    //     }
    // if(!flag)
    //     setErrormsg("Incorrect username or password")
    // }
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
                    
                </div>
                {errormsg && <p style={{color:'red'}}>{errormsg}</p>}
                
                

                <div className="field button-field">
                    <button>Login</button>
                </div>
            </form>

            <div className="form-link">
                <Link to="http://localhost:3000/CreateAccount"><span>Don't have an account? </span></Link>
            </div>
        </div>


   

   
            

            
            </div>
        



   
</section>
  )
}

