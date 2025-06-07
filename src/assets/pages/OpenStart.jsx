import React, { useEffect, useState } from 'react'
import OpenEventCard from '../components/OpenEventCard'
import { ENDPOINTS } from '../../services/api/endpoints';

const OpenStart = () => {
  const [events, setEvents] = useState ([])
  
  const getEvents = async () => {
    const res = await fetch (ENDPOINTS.EVENTS.GET_ALL)

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
      </div>
      <div className="events-container"> 
        {
          events.map(event => (
            <OpenEventCard key={event.id} event={event} />
          ))
        }
      </div>
    </div>
  )
}

export default OpenStart