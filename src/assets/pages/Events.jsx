import React, { useEffect, useState } from 'react'
import EventCard from '../components/EventCard'


const Events = () => {
  const [events, setEvents] = useState ([])

  const url = "https://eventservice-jdf-fjhvgdfdhsdvetdw.swedencentral-01.azurewebsites.net/api/Events/"

  const getEvents = async () => {
    const res = await fetch (url)

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
    <div>
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