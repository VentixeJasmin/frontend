import React, { useEffect, useState } from 'react'
import { FaRegCheckSquare } from "react-icons/fa";
import { LuTicket } from "react-icons/lu";
import EventCard from '../components/EventCard';
import RecentActivityCard from '../components/RecentActivityCard';
import FactCard from '../components/FactCard';
import { PiPlus } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { PiCalendarDot } from "react-icons/pi";
import { ENDPOINTS } from '../../services/api/endpoints';
import { useAuth } from '../../contexts/AuthContext';


const Dashboard = () => {

    const [events, setEvents] = useState ([])
    const [venues, setVenues] = useState ([])
    const [orders, setOrders] = useState ([])
    const { user, authenticatedFetch } = useAuth()
    const [ticketsSold, setTicketsSold] = useState(0)

    const getEvents = async () => {
      const res = await authenticatedFetch (ENDPOINTS.EVENTS.GET_ALL)
  
      if (res.ok) {
        const data = await res.json() 
        setEvents(data)
      }
    }

    const getVenues = async () => {
      const res = await authenticatedFetch (ENDPOINTS.VENUES.GET_ALL)
  
      if (res.ok) {
        const data = await res.json() 
        setVenues(data)
      }
    }

    const getOrders = async () => {
      const res = await authenticatedFetch (ENDPOINTS.ORDERS.GET_ALL)
      if (res.ok) {
        const data = await res.json() 
        setOrders(data)
      }
    }

    const calculateTicketsSold = (ordersList) => {
      let tickets = 0
      ordersList.forEach(order => {
        const quantity = order.quantity
        tickets += quantity
      })
        setTicketsSold(tickets)
    }
  
    useEffect(() => {
      const fetchData = async () => {
        await getEvents()
        await getVenues()
        await getOrders()
      }
      fetchData()
    }, [])

    useEffect(() => {
      if (orders.length > 0){
        calculateTicketsSold(orders)
      }
    }, [orders])
  
  return (
    <div className="main dashboard-main">
      <div className="fast-fact-container">
        <div className="card card-facts">
            <div className="btn-pink round-icon-holder">
              <PiCalendarDot/>
            </div>
            <p>Managed events</p>
            <h6>{events.length}</h6>
        </div>
        <div className="card card-facts">
          <div className="btn-pink round-icon-holder">
            <FaRegCheckSquare />
          </div>
          <p>Total Bookings</p>
          <h6>{orders.length}</h6>
        </div>
        <div className="card card-facts">
          <div className="btn-pink round-icon-holder">
            <LuTicket />
          </div>
          <p>Tickets Sold</p>
          <h6>{ticketsSold}</h6>
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
    </div>
  )
}

export default Dashboard