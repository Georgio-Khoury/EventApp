import React from 'react'
import Card from './Cards/Card'
import {Navigation} from './Navigation'
import './Events.css'
const events=[{
    name:'Jhon',
    location:'Jbeil',
    price:"3000$",
    picture: require('../assets/image.png')
},{
    name:'Maryam',
    location:'Beirut',
    price : "200$",
    picture:require('../assets/image.png')
},{
    name:'Ali',
    location:'Tripoli',
    price: "110$",
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