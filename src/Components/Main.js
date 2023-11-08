import React from 'react'
import {Link} from 'react-router-dom'
import { Navigation } from './Navigation'
export const Main = () => {
  return (
    <div>
      <Navigation/>
        <button>
            <Link to="/">MAIN</Link>
        </button>
    </div>
  )
}
