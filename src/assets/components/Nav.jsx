import React from 'react'
import { LuTicket } from "react-icons/lu";
import { FaRegCheckSquare } from "react-icons/fa";
import { MdOutlineStadium } from "react-icons/md";
import { PiSquaresFour } from "react-icons/pi";
import { NavLink } from 'react-router-dom';
import { RxExit } from "react-icons/rx";


const Nav = () => {
  return (
    <div className="nav">
      <div>
        <div className="logo-holder">
          <a href="/dashboard">
            <img src="public/images/logo-name.svg"></img>
          </a>
        </div>
        <ul className="nav-list">
          <li className="nav-list-item" id="dashboard-li">
            <NavLink to="/dashboard" className="nav-link" id="dashboard">
              <PiSquaresFour />
              <p>Dashboard</p>
              </NavLink>
          </li>
          <li className="nav-list-item" id="events-li">
            <NavLink to="/events" className="nav-link" id="events">
              <LuTicket />
              <p>Events</p>
            </NavLink>
          </li>
          <li className="nav-list-item" id="orders-li">
            <NavLink to="/orders" className="nav-link" id="orders">
              <FaRegCheckSquare />
              <p>Orders</p>
            </NavLink>
          </li>
          <li className="nav-list-item" id="venues-li">
            <NavLink to="/venues" className="nav-link" id="venues">
              <MdOutlineStadium />
              <p>Venues</p>
            </NavLink>
          </li>
        </ul>
      </div>
      <button className="btn btn-large btn-grey">
        <RxExit />
        Sign Out
      </button>
    </div>
  )
}

export default Nav