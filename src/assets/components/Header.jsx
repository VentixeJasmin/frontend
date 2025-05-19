import React from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import Breadcrumb from './Breadcrumb';
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {

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
      <div className="search-field-container">
        <form method="post" noValidate>
          <input className="search-bar" htmlFor="searchQuery" placeholder="Search anything"></input>
          <CiSearch className="looking-glass" />
        </form>
      </div>
      <div className="buttons-holder">
        <button className="btn-round btn-round-xl btn-blue" id="btn-search">
          <CiSearch />
        </button>
        <button className="btn-round btn-round-xl btn-blue" id="btn-notifications"><IoMdNotificationsOutline /></button>
      </div>
      <button className="btn-hamburger" id="btn-hamburger">
          <RxHamburgerMenu />
        </button>
    </div>
  )
}

export default Header