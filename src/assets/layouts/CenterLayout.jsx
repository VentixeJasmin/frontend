import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const centerLayout = () => {
  return (
    <>
      <div className="center-wrapper">
        <div className="headline-container">
          <div className="headline">
            <img className="headline-logo" src="public\images\logo-icon.svg"></img>
            <h1>Ventixe</h1>
          </div>
          <div className="teaser">
            <h2>It's your party - manage everything in one place.</h2>
          </div>
          <div className="button-container">
            <button className="btn btn-pink btn-large">Sign In</button>
            <button className="btn btn-pink btn-large">Sign Up</button>
          </div>
          
        </div>
        <div className="photo-byline">
          <p>Photo Credit: Josh Sorenson/Pexels</p>
        </div>
      </div>
      
    </>
  )
}

export default centerLayout