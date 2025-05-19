import React from 'react'
import { FaRegCheckSquare } from "react-icons/fa";
import { LuTicket } from "react-icons/lu";


import EventCard from '../components/EventCard';
import RecentActivityCard from '../components/RecentActivityCard';
import FactCard from '../components/FactCard';


const Dashboard = () => {
  return (
    <div className="main dashboard-main">
      <div className="fast-fact-container">
        <FactCard/>
        <div className="card card-facts">
          <div className="btn-pink round-icon-holder">
            <FaRegCheckSquare />
          </div>
          <p>Total Bookings</p>
          <h6>987</h6>
        </div>
        <div className="card card-facts">
          <div className="btn-pink round-icon-holder">
            <LuTicket />
          </div>
          <p>Tickets Sold</p>
          <h6>1400</h6>
        </div>
      </div>
      <div className="upcoming-events-container">
        <div className="upcoming-headline">
          <h6>Upcoming Events</h6>
        </div>
        <EventCard/>
      </div>
      <RecentActivityCard/>
    </div>
  )
}

export default Dashboard