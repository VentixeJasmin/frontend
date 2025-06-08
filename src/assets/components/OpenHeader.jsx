import React from 'react'
import { Link } from 'react-router-dom'
import { PiKeyFill } from "react-icons/pi";

const OpenHeader = () => {
  return (
    <div className="open-header">
        
          <Link to="/" alt="Ventixe logo.">
            <img src="public/images/logo-name.svg" id="logo-text"></img>
          </Link>
          <Link to="admin" className="center-div">
            <button className="btn btn-blue btn-small">Admin Portal <span className="key"><PiKeyFill /></span></button>
          </Link> 
        
    </div>
  )
}

export default OpenHeader