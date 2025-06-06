import React, { useEffect, useState }  from 'react'
import Breadcrumb from './Breadcrumb';
import { RxHamburgerMenu, RxCross1, RxAvatar, RxExit  } from "react-icons/rx";
import { useAuth } from '../../contexts/AuthContext';
import { LuTicket } from "react-icons/lu";
import { FaRegCheckSquare } from "react-icons/fa";
import { MdOutlineStadium } from "react-icons/md";
import { PiSquaresFour } from "react-icons/pi";
import { NavLink, useNavigate, Link } from 'react-router-dom';

const Header = () => {
//Had Claude AI generate most of the code for the dropdown menu for me 

  const { user, fetchUser, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
      fetchUser()
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  const handleSignout = async (e) => {
    await logout(); 
    navigate("/")
    setIsMobileMenuOpen(false); // Close menu after logout
  }

  const handleNavClick = () => {
    setIsMobileMenuOpen(false); // Close menu when navigating
  }

  return (
    <div className="header">
      <div className="logo-holder-mobile">
        <a href="/dashboard">
          <img src="public/images/logo-icon.svg" alt="Ventixe logo." />
        </a>
      </div>
      <div>
        <Breadcrumb />
      </div>
      <Link to={`/profile/${user?.id}`}>
        <div className="profile-info">
          <RxAvatar className='mobile-avatar'/>
          <h6 className="profile-name title-text semi-bold">{user.displayName}</h6>
        </div>
      </Link>
      
      <button className="btn-hamburger" id="btn-hamburger" onClick={toggleMobileMenu}>
         {isMobileMenuOpen ? <RxCross1 /> : <RxHamburgerMenu />}
      </button>

      {isMobileMenuOpen && (
        <div className="mobile-dropdown-menu">
          {/* User Info Section */}
          <Link className="profile-link" to={`/profile/${user?.id}`}>
            <div className="mobile-user-info">
              <RxAvatar className="mobile-avatar" />
              <p className="mobile-username">{user?.name || user?.email}</p>
            </div>
          </Link>
          
          
          {/* Navigation Links */}
          <ul className="mobile-nav-list">
            <li className="mobile-nav-item">
              <NavLink 
                to="/dashboard" 
                className="mobile-nav-link" 
                onClick={handleNavClick}
              >
                <PiSquaresFour />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li className="mobile-nav-item">
              <NavLink 
                to="/events" 
                className="mobile-nav-link"
                onClick={handleNavClick}
              >
                <LuTicket />
                <span>Events</span>
              </NavLink>
            </li>
            <li className="mobile-nav-item">
              <NavLink 
                to="/orders" 
                className="mobile-nav-link"
                onClick={handleNavClick}
              >
                <FaRegCheckSquare />
                <span>Orders</span>
              </NavLink>
            </li>
            <li className="mobile-nav-item">
              <NavLink 
                to="/venues" 
                className="mobile-nav-link"
                onClick={handleNavClick}
              >
                <MdOutlineStadium />
                <span>Venues</span>
              </NavLink>
            </li>
          </ul>

          {/* Sign Out Button */}
          <button 
            onClick={handleSignout} 
            className="btn btn-large btn-grey btn-signout"
          >
            <RxExit />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default Header