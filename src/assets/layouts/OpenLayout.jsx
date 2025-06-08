import React from 'react'
import { Outlet } from 'react-router-dom'
import OpenHeader from '../components/Openheader'
import OpenFooter from '../components/OpenFooter'


const OpenLayout = () => {
  return (
    <>
      <div className="open-wrapper">
        <OpenHeader />
        
        <Outlet />
        <OpenFooter/>
      </div>
    </>
  )
}

export default OpenLayout