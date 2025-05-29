import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const VenueCard = (venue) => {
  return (
     <div className="card venue-card">
        <p className="title-text semi-bold event-title-text">{venue.title}</p>
        <p className="title-text light location-text">{venue.city}</p>
        <p className="title-text description-text">{venue.category}</p>
        <p className="title-text description-text">{venue.capacity}</p>
        <div className="detail-info">
            <Link to={`/venues/${venue.id}`}>
                <button className="btn btn-small btn-pink">View Details</button>
            </Link>
        </div>
    </div> 
  )
}

export default VenueCard