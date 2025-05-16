import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const centerLayout = () => {
  return (
    <>
      <div className="center-wrapper">
        <Outlet />
        <div className="photo-byline">
          <p>Photo Credit: Josh Sorenson/Pexels</p>
        </div>
      </div>
    </>
  )
}

export default centerLayout