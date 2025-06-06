import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { ENDPOINTS } from '../../services/api/endpoints';
import { useParams } from 'react-router-dom';
import { getEmbedUrl } from '../../utils/convertMapUrl'

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
    <div className="venue-details-page">
      <div>
        <h3>{venue.title}</h3>
      </div>
      
      <div className="google-map">
        {venue.mapUrl && (
          <div className="map-container">
              <iframe
                  src={getEmbedUrl(venue.mapUrl)}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title={`Map of ${venue.title}`}
              />
          </div>
      )}
      </div>
      <p className="title-text light location-text">Location: {venue.streetAddress} {venue.postCode} {venue.city}</p>
      <p className="title-text description-text">About: {venue.description}</p>
      <p className="title-text description-text">Type: {venue.venueType}</p>
      <p className="title-text description-text">Capacity: {venue.capacity}</p>
    </div>
  )
}

export default VenueDetails