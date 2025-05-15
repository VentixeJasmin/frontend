import React from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import Breadcrumb from './Breadcrumb';
import { CiSearch } from "react-icons/ci";

const Header = () => {

  return (
    <div className="header">
      <div>
        <Breadcrumb />
      </div>
      <div className="search-field-container">
        <form method="post" novalidate>
          <input class="search-bar" htmlFor="searchQuery" placeholder="Search anything"></input>
          <CiSearch className="looking-glass" />
        </form>
      </div>
      <div>
        <button className="btn-round btn-round-xl btn-blue"><IoMdNotificationsOutline /></button>
      </div>
    </div>
  )
}

export default Header