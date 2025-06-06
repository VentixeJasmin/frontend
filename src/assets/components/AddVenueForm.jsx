import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { PiX } from "react-icons/pi";
import { ENDPOINTS } from '../../services/api/endpoints';
import { useAuth } from '../../contexts/AuthContext';
import { useFormValidation } from '../../hooks/useFormValidation';

const AddVenueForm = () => {
  const navigate = useNavigate();  
  const { authenticatedFetch } = useAuth();  

  const {
      formData,
      errors,
      handleChange,
      handleBlur,
      validateEntireForm
    } = useFormValidation({
      title: '',
      venueType: '',
      description: '',
      capacity: '',
      streetAddress: '',
      postCode: '',
      city: '',
      mapUrl: ''
    })

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateEntireForm()) {
        return
      }

      console.log("Form valid.")
      
      try {
        const response = await authenticatedFetch(ENDPOINTS.VENUES.CREATE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          const result = await response.json(); 
          console.log('Venue added successfully:', result);
          navigate("/venues"); 
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
              <input type="text" name="title" value={formData.title} onChange={handleChange} onBlur={handleBlur} placeholder="Enter venue name" required></input>
              {errors.title && <p className="form-validation">{errors.title}</p>}
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="venueType">Venue Type</label>
            <div className="form-input-group">
              <input type="text" name="venueType" value={formData.venueType} onChange={handleChange} onBlur={handleBlur} placeholder="Ex. Arena" required></input>
              {errors.venueType && <p className="form-validation">{errors.venueType}</p>}
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <div className="form-input-group">
              <input type="text" name="description" value={formData.description} onChange={handleChange} onBlur={handleBlur} placeholder="Describe the venue"></input>
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="capacity">Venue capacity</label>
            <div className="form-input-group">
              <input type="text" name="capacity" value={formData.capacity} onChange={handleChange} onBlur={handleBlur} placeholder="Enter number of possible quests" required></input>
              {errors.capacity && <p className="form-validation">{errors.capacity}</p>}
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