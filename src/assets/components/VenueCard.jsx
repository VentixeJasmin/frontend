import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const VenueCard = ({venue}) => {
  return (
     <div className="card venue-card">
        <h6 className="title-text semi-bold event-title-text">{venue.title}</h6>
        <p className="title-text light location-text">Location: {venue.city}</p>
        <p className="title-text description-text">Type: {venue.venueType}</p>
        <p className="title-text description-text">Capacity: {venue.capacity}</p>
        <div className="detail-info">
            <Link to={`/venues/${venue.id}`}>
                <button className="btn btn-medium btn-pink">View Details</button>
            </Link>
        </div>
    </div> 
  )
}

export default VenueCard