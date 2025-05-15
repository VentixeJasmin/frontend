import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const centerLayout = () => {
  return (
    <>
      <div className="center-wrapper">
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default centerLayout