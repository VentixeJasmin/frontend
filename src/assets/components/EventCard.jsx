import React, { useEffect, useState } from 'react'
import { PiCalendarDots } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { ENDPOINTS } from '../../services/api/endpoints';
import { useAuth } from '../../contexts/AuthContext';


const EventCard = ({event}) => {
    //Got help from Claude AI with the following breaking down of the date:
    const eventDate = new Date(event.date); 
    const venueId = event.venueId
    const [loading, setLoading] = useState(true);

    const [venue, setVenue] = useState ([])
    const { authenticatedFetch } = useAuth();
      
 
    const getVenue = async () => {
        try {
            setLoading(true);  // Set loading to true
            const res = await authenticatedFetch(`${ENDPOINTS.VENUES.GET}/${venueId}`)

            if (res.ok) {
                const data = await res.json() 
                console.log(data)
                setVenue(data)
            } 
        } catch (error) {
            console.error('Error fetching venue:', error);
        } finally {
            setLoading(false);  // Set loading to false
        }
    }
      
        useEffect(() => {
          getVenue()
        }, [venueId])

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

    if (loading) return <div>Loading venue details...</div>;
    if (!venue) return <div>Venue not found.</div>;


  return (
    <div className="card event-card">
        <div className="event-card-image">
            <img src={`${event.eventImagePath}`} alt="Event image." />
        </div>
        <div className="event-card-info">
        <p className="title-text semi-bold event-title-text">{event.title}</p>
        <p className="title-text light location-text">{venue.title}, {venue.city}</p>
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
            <Link to={`/events/${event.id}`}>
                <button className="btn btn-small btn-pink">View Details</button>
            </Link>
            
        </div>
        </div>
    </div> 
  )
}

export default EventCard