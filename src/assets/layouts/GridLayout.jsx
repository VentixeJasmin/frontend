import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'

const GridLayout = () => {
  return (
    <div className="grid-wrapper">
      <Nav/>
      <Header />
      <div className="main">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default GridLayout