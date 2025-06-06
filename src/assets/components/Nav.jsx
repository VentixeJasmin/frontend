import React from 'react'
import { LuTicket } from "react-icons/lu";
import { FaRegCheckSquare } from "react-icons/fa";
import { MdOutlineStadium } from "react-icons/md";
import { PiSquaresFour } from "react-icons/pi";
import { NavLink, useNavigate } from 'react-router-dom';
import { RxExit } from "react-icons/rx";
import { useAuth } from '../../contexts/AuthContext';

const Nav = () => {
  const navigate = useNavigate();  
  const { logout } = useAuth();

  const handleSignout = async (e) => {
    await logout(); 
    navigate("/")
}


  return (
    <div className="nav">
      <div>
        <div className="logo-holder">
          <a href="/dashboard">
            <img src="public/images/logo-name.svg" id="logo-text"></img>
            <img src="public/images/logo-icon.svg" id="logo-icon"></img>
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
        <div className="nav-list-tablet">
            <button className="btn btn-round">
              <NavLink to="/dashboard" className="nav-link" id="dashboard">
                <PiSquaresFour />
              </NavLink>
            </button>
            <button className="btn btn-round">
              <NavLink to="/events" className="nav-link" id="events">
                <LuTicket />
              </NavLink>
            </button>
            <button className="btn btn-round">
              <NavLink to="/orders" className="nav-link" id="orders">
                <FaRegCheckSquare />
              </NavLink>
            </button>
            <button className="btn btn-round">
              <NavLink to="/venues" className="nav-link" id="venues">
                <MdOutlineStadium />
              </NavLink>
            </button>
        </div>
      </div>
      <button onClick={handleSignout} className="btn btn-large btn-grey" id="btn-signout">
        <RxExit />
        <p>Sign Out</p>
      </button>
      <button onClick={handleSignout} className="btn btn-round btn-grey" id="btn-round-signout">
        <RxExit />
      </button>
    </div>
  )
}

export default Nav