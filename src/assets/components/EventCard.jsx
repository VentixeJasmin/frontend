import React, { useEffect, useState } from 'react'
import { PiCalendarDots } from "react-icons/pi";


const EventCard = ({event}) => {
    //Got help from Claude AI with the following breaking down of the date:
    const eventDate = new Date(event.date); 

    const formattedDate = eventDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })

    const formattedTime = eventDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    })

  return (
    <div className="card event-card">
        <div className="event-card-image">
        <img src="{event.EventImagePath}" alt="Event image." />
        </div>
        <div className="event-card-info">
        <p className="title-text semi-bold event-title-text">{event.title}</p>
        <p className="title-text light location-text">Sunset</p>
        <p className="title-text description-text">{event.description}</p>
        <div className="detail-info">
            <div className="horizontal">
                <div className="square-icon-holder">
                    <PiCalendarDots />
                </div>
                <div className="time-info">
                    <div className="date-info">
                        <p className="semi-bold">{formattedDate}</p>
                    </div>
                    <div className="hours-info">
                        <p>{formattedTime}</p>
                    </div>
                </div>
            </div>
            
            <button className="btn btn-small btn-pink">View Details</button>
        </div>
        </div>
    </div> 
  )
}

export default EventCard