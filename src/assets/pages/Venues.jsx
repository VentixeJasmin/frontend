import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { PiPlus } from "react-icons/pi";
import VenueCard from '../components/VenueCard';
import { ENDPOINTS } from '../../services/api/endpoints';
import { useAuth } from '../../contexts/AuthContext';

const Venues = () => {
  const [venues, setVenues] = useState ([])
  const { authenticatedFetch } = useAuth();

    const getVenues = async () => {
      const res = await authenticatedFetch (ENDPOINTS.VENUES.GET_ALL)
  
      if (res.ok) {
        const data = await res.json() 
        console.log(data)
        setVenues(data)
      }
    }
  
    useEffect(() => {
      getVenues()
    }, [])
  

  return (
    <div className="venues-page">
      <div className="venues-header">
        <div>
          <h2>Available venues</h2>
        </div>
        <Link to="/venues/AddVenue">
          <button className="btn btn-pink btn-medium">
            <PiPlus />
            Add Venue
          </button>
        </Link>
      </div>
      <div className="venues-container"> 
        <div className="venue-table-header"></div>
        {
          venues.map(venue => (
            <VenueCard key={venue.id} event={venue} />
          ))
        }
      </div>
    </div>
  )
}

export default Venues