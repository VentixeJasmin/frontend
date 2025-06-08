import React, { useEffect, useState } from 'react'
import { ENDPOINTS } from '../../services/api/endpoints';
import { useParams } from 'react-router-dom';
import { IoMdOpen } from "react-icons/io";
import { Link } from 'react-router-dom';

const OpenEventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState ([])
  const [venue, setVenue] = useState ([])
  const [loading, setLoading] = useState(true);

  const getEvent = async () => {
      try {
        setLoading(true);  // Set loading to true
        const res = await fetch (`${ENDPOINTS.EVENTS.GET}/${id}`)
    
        if (res.ok) {
          const data = await res.json() 
          console.log(data)
          setEvent(data)
        } 
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);  // Set loading to false
      }
    }
  
    const getVenue = async () => {
      try {
          const venueRes = await fetch(`${ENDPOINTS.VENUES.GET}/${event.venueId}`)
  
          if (venueRes.ok) {
              const data = await venueRes.json() 
              console.log(data)
              setVenue(data)
          } 
      } catch (error) {
          console.error('Error fetching venue:', error);
      }
    }
    
    useEffect(() => {
      getEvent()
    }, [id])
  
    useEffect(() => {
      if (event && event.venueId) {
        getVenue(event.venueId)
      }
    }, [event])
  
    if (loading) return <div>Loading event details...</div>;
    if (!event) return <div>Event not found.</div>;

    const eventDate = new Date(event.date); 
    const formattedDate = eventDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  
    const formattedTime = eventDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })

  return (
    <div className="event-details-page details-page">
      <div className="details-image">
        <img src={`${event.eventImagePath}`} alt="Event image." />
      </div>
      <div className="details-headline">
        <h2>{event.title}</h2>
      </div>
      <div className="details-details">
        <p><span className="semi-bold">When? </span>{formattedDate}, {formattedTime}</p>
        <p><span className="semi-bold">What? </span>{event.category.title} | {event.description}</p>
        <p><span className="semi-bold">Where? </span>{venue.title} | {venue.streetAddress} {venue.postCode} {venue.city} </p>
        {venue.mapUrl && (
          <div>
            <a href={venue.mapUrl} target="_blank">View map <IoMdOpen /> </a>
          </div>
        )}
        <p><span className="semi-bold">How much? </span>Tickets are ${event.price}</p>
      </div>
      <div className="center-div">
        <Link to={`/book/${event.id}`}>
          <button className="btn btn-large btn-pink">Order Ticket</button>
        </Link>
        <Link to="/">
            <button className="btn btn-large btn-pink">Go Back</button>
        </Link>
      </div>
      
    </div>
  )
}

export default OpenEventDetails