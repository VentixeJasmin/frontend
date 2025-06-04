import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { PiX } from "react-icons/pi";
import { ENDPOINTS } from '../../services/api/endpoints';

const AddVenueForm = () => {
    const navigate = useNavigate();  

    const [formData , setFormData] = useState({
        title: '',
        venueType: '',
        description: '',
        capacity: '',
        streetAddress: '',
        postCode: '',
        city: '',
        mapUrl: ''
    }); 

    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

    try {
      const response = await fetch(ENDPOINTS.AUTH.SIGNUP, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json(); 
        console.log('Venue added successfully:', result);
        navigate("/events"); 
      }
      else {
        const errorData = await response.json();
        console.error('Adding venue failed:', errorData);
      }
    }
    catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container add-venue-form-container">
        <form onSubmit={handleSubmit} className="form add-venue-form" noValidate>
          <div className="form-header">
            <h4>Add New Venue</h4>
            <Link to="/events">
              <button className="btn btn-round btn-round-xl btn-no-border">
                <PiX />
              </button>
            </Link>
          </div>
          <div className="form-group">
            <label htmlFor="title">Venue Name</label>
            <div className="form-input-group">
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter venue name"></input>
              <span className="form-validation"></span>
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="venueType">Venue Type</label>
            <div className="form-input-group">
              <input type="text" name="venueType" value={formData.venueType} onChange={handleChange} placeholder="Ex. Arena"></input>
              <span className="form-validation"></span>
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <div className="form-input-group">
              <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Describe the venue"></input>
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="capacity">Venue capacity</label>
            <div className="form-input-group">
              <input type="text" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="Enter number of possible quests"></input>
              <span className="form-validation"></span>
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="streetAddress">Street Address</label>
            <div className="form-input-group">
              <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} placeholder="Enter street address"></input>
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="postCode">Post Code</label>
            <div className="form-input-group">
              <input type="text" name="postCode" value={formData.postCode} onChange={handleChange} placeholder="Enter post code"></input>
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <div className="form-input-group">
              <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Enter city"></input>
              <span className="form-validation"></span>
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="mapUrl">Map URL</label>
            <div className="form-input-group">
              <input type="text" name="mapUrl" value={formData.mapUrl} onChange={handleChange} placeholder="Enter map URL (optional)"></input>
            </div>  
          </div>
          <button type="submit" className="btn btn-blue btn-large">Add Venue</button>
        </form>
      </div>
  )
}

export default AddVenueForm