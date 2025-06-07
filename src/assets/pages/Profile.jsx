import React from 'react'
import { useAuth } from '../../contexts/AuthContext';

const Profile = ({id}) => {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }


  return (
    <div className="profile-details-page details-page">
      <div className="details-headline">
        <h2>Profile details</h2>
      </div>
      <div className="details-details">
        <p><span className="semi-bold">First name: </span>{user.firstName}</p>
        <p><span className="semi-bold">Last name: </span>{user.lastName}</p>
        <p><span className="semi-bold">Email address: </span>{user.email} </p>
      </div>
    </div>
  )
}

export default Profile