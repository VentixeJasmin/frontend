import React, { useEffect, useState } from 'react'
import EventCard from '../components/EventCard'
import { Link } from 'react-router-dom';
import { PiPlus } from "react-icons/pi";
import { ENDPOINTS } from '../../services/api/endpoints';


const Events = () => {
  const [events, setEvents] = useState ([])
  const { authenticatedFetch } = useAuth();

  const getEvents = async () => {
    const res = await authenticatedFetch (ENDPOINTS.EVENTS.GET_ALL)

    if (res.ok) {
      const data = await res.json() 
      console.log(data)
      setEvents(data)
    }
  }

  useEffect(() => {
    getEvents()
  }, [])

  
  return (
    <div className="events-page">
      <div className="events-header">
        <div>
          <h2>All events</h2>
        </div>
        <Link to="/events/AddEvent">
          <button className="btn btn-pink btn-medium">
            <PiPlus />
            Add Event
          </button>
        </Link>
      </div>
      <div className="events-container"> 
        {
          events.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        }
      </div>
    </div>
  )
}

export default Events