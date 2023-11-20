import React from 'react'
import Card from './Cards/Card'
import {Navigation} from './Navigation'
import './Events.css'
const events=[{
    name:'Jhon',
    location:'Jbeil',
    
    picture: require('../assets/image.png')
},{
    name:'Maryam',
    location:'Beirut',
   
    picture:require('../assets/image.png')
},{
    name:'Ali',
    location:'Tripoli',
    
    picture:require('../assets/image.png')
}]



function Events() {
  return (
    <div>
    <Navigation/>
    <div className="card-container">
      <Card events={events} />
      </div>
    

    </div>
  )
}

export default Events