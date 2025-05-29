import React, { useEffect, useState } from 'react'
import { FaRegCheckSquare } from "react-icons/fa";
import { LuTicket } from "react-icons/lu";
import EventCard from '../components/EventCard';
import RecentActivityCard from '../components/RecentActivityCard';
import FactCard from '../components/FactCard';
import { PiPlus } from "react-icons/pi";
import { Link } from 'react-router-dom';


const Dashboard = () => {

    const [events, setEvents] = useState ([])
    const [venues, setVenues] = useState ([])
  
    const eventUrl = "https://eventservice-jdf-fjhvgdfdhsdvetdw.swedencentral-01.azurewebsites.net/api/Events/"
    const venueUrl = "https://venueservice-jdf-azc2b5duepaygrfr.swedencentral-01.azurewebsites.net/api/Venues/"

  
    const getEvents = async () => {
      const res = await fetch (eventUrl)
  
      if (res.ok) {
        const data = await res.json() 
        setEvents(data)
      }
    }

    const getVenues = async () => {
      const res = await fetch (venueUrl)
  
      if (res.ok) {
        const data = await res.json() 
        setVenues(data)
      }
    }
  
    useEffect(() => {
      getEvents()
      getVenues()
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
          <Link to="/events/AddEvent">
            <button className="btn btn-pink btn-medium">
              <PiPlus />
              Add Event
            </button>
          </Link>
          
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