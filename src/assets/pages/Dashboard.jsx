import React, { useEffect, useState } from 'react'
import { FaRegCheckSquare } from "react-icons/fa";
import { LuTicket } from "react-icons/lu";
import EventCard from '../components/EventCard';
import RecentActivityCard from '../components/RecentActivityCard';
import FactCard from '../components/FactCard';


const Dashboard = () => {

    const [events, setEvents] = useState ([])
  
    const url = "https://localhost:7234/api/Events/"
  
    const getEvents = async () => {
      const res = await fetch (url)
  
      if (res.ok) {
        const data = await res.json() 
        setEvents(data)
      }
    }
  
    useEffect(() => {
      getEvents()
    }, [])
  
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
        <div className="event-card-holder">
          {
          events.slice(0, 2).map(event => (
            <EventCard key={event.id} event={event} />
          ))
          }
        </div>
        
      </div>
      <RecentActivityCard/>
    </div>
  )
}

export default Dashboard