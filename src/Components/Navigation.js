import React from 'react'
import {Link} from 'react-router-dom'
import './Navigation.css'
export const Navigation = ()=>{
    
    var obj = JSON.parse(localStorage.getItem('user'))
    var status = obj.status
    return(
            <div className="navbar">
                <ul>
            <li><Link to="../Events">Browse Events</Link></li>
            <li><Link to="../CreateEvent">Create Event</Link></li>
            <li><Link to="../Subscription">Subscription</Link></li>
            {status&&<li><Link to ="../MyEvents">My Events</Link></li>}
            <li><Link to="../Account">My Account</Link></li>
            
            </ul>
            </div>
            
    )
}