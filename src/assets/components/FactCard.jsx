import React from 'react'
import { PiCalendarDot } from "react-icons/pi";

const FactCard = () => {
  return (
    <div className="card card-facts">
        <div className="btn-pink round-icon-holder">
        <PiCalendarDot/>
        </div>
        <p>Upcoming events</p>
        <h6>67</h6>
    </div>
  )
}

export default FactCard