import React from 'react'
import AddVenueForm from '../components/AddVenueForm'
import { useAuth } from '../../contexts/AuthContext';

const AddVenue = () => {
  return (
    <div>
      <AddVenueForm />
    </div>
  )
}

export default AddVenue