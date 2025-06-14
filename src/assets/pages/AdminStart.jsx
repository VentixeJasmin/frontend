import React from 'react'
import { useAuth } from '../../contexts/AuthContext';

const AdminStart = () => {
  return (
    <div className="center-wrapper">
      <div className="headline-container">
          <div className="headline">
            <img className="headline-logo" src="/images/logo-icon.svg"></img>
            <h1>Ventixe</h1>
          </div>
          <div className="teaser">
            <h4>It's your party.</h4>
            <h4>Handle it all in one place.</h4>
          </div>
          <div className="button-container">
            <a href="/SignIn">
              <button className="btn btn-pink btn-large">Sign In</button>
            </a>
            <a href="/SignUp">
              <button className="btn btn-pink btn-large">Sign Up</button>
            </a> 
          </div>
          <div className="teaser-desktop">
              <h4>It's your party.</h4>
              <h4>Handle everything in one place.</h4>
          </div>
        </div>
    </div> 
  )
}

export default AdminStart