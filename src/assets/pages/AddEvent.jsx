import React from 'react'
import AddEventForm from '../components/AddEventForm'
import { useAuth } from '../../contexts/AuthContext';

const AddEvent = () => {

  return (
    <div>
        <AddEventForm/>
    </div>
  )
}

export default AddEvent

