import React, { useEffect, useState } from 'react'
import { PiCalendarDots } from "react-icons/pi";


const EventCard = () => {
    // const [events, setEvents] = useState ([])

    // const getEvents = async () => {
    //     const res = await fetch ("")

    //     if (res.ok) {
    //         const data = await res.json() 
    //         setEvents (data)
    //     }
    // }

    // useEffect(() => {
    //     getEvents
    // })
  return (
    <div className="card event-card">
        <div className="event-card-image">
        <img src="public\images\pexels-vishnurnair-1105666.jpg" alt="Event image." />
        </div>
        <div className="event-card-info">
        <p className="title-text semi-bold event-title-text">Rhythm & Beats Music Festival</p>
        <p className="title-text light location-text">Sunset Park, Los Angeles, CA</p>
        <p className="title-text description-text">Immerse yourself in electrifying performances by top pop, rock, EDM, and hip-hop artists, indulge in delicious food, admire captivating art installations, and create unforgettable memories at the Rhythm & Beats Music Festival.</p>
        <div className="detail-info">
            <div className="square-icon-holder">
            <PiCalendarDots />
            </div>
            <div className="time-info">
            <div className="date-info">
                <p>Apr 20, 2026</p>
            </div>
            <div className="hours-info">
                <p>12:00 PM - 11:00 PM</p>
            </div>
            </div>
            <button className="btn btn-small btn-pink">View Details</button>
        </div>
        </div>
    </div> 
  )
}

export default EventCard