import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { ENDPOINTS } from '../../services/api/endpoints';
import { useParams } from 'react-router-dom';
import { IoMdOpen } from "react-icons/io";

const VenueDetails = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authenticatedFetch } = useAuth();
  
  const getVenue = async () => {
    try {
      setLoading(true);  // Set loading to true
      const res = await authenticatedFetch(`${ENDPOINTS.VENUES.GET}/${id}`)
  
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
      getVenue();
  }, [id]);

  if (loading) return <div>Loading venue details...</div>;
  if (!venue) return <div>Venue not found.</div>;


  return (
    <div className="venue-details-page details-page">
      <div className="details-headline">
        <h2>{venue.title}</h2>
      </div>
      <div className="details-details">
        <p><span className="semi-bold">Location: </span>{venue.streetAddress} {venue.postCode} {venue.city}</p>
        <p><span className="semi-bold">About: </span>{venue.venueType} | {venue.description}</p>
        <p><span className="semi-bold">Capacity: </span>{venue.capacity}</p>
        {venue.mapUrl && (
          <div>
            <a href={venue.mapUrl} target="_blank">View map <IoMdOpen /> </a>
          </div>
        )}
        
      </div>
    </div>
  )
}

export default VenueDetails