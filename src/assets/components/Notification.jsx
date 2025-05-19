import React from 'react'
import { PiPlusSquare } from "react-icons/pi";

const Notification = () => {
  return (
    <div className="notification">
        <div className="round-icon-holder btn-grey">
        <PiPlusSquare />
        </div>
        <div>
        <p className="notification-message">Someone added a the new event Rock n roll in the park and will send an invoice to INV56675 </p>
        <p className="time-ago">1 hour ago</p>
        </div>
    </div>
  )
}

export default Notification