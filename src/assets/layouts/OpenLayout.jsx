import React from 'react'
import { Outlet } from 'react-router-dom'
import OpenHeader from '../components/Openheader'
import Footer from '../components/Footer'

const OpenLayout = () => {
  return (
    <>
      <div className="open-wrapper">
        <OpenHeader />
        <Outlet />
        <Footer/>
      </div>
    </>
  )
}

export default OpenLayout