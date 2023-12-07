import React from 'react'
import { Navigation } from './Navigation'

function Subscription() {
  function subscribe(){

  }
  return (
    <>
    <div><Navigation/></div>
    <div className="content">
      <h1>Subscribe to our Event Creator to post your events for only 50$</h1>
      <button className="Subsribe" onClick={subscribe}>Subscribe</button>
    </div>
    </>
  )
}

export default Subscription