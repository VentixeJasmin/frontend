import React, { useEffect, useState }  from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { PiX } from "react-icons/pi";
import { ENDPOINTS } from '../../services/api/endpoints';
import { useAuth } from '../../contexts/AuthContext';
import { useFormValidation } from '../../hooks/useFormValidation';

const AddEventForm = () => {
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
        date: new Date().toISOString().slice(0,16), 
        description: '',
        // eventImage: '',
        price: '',
        categoryId: '',
        venueId: ''
    })

    const [form, setForm] = useState({
        categoryOptions: [],
        venueOptions: []
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getForm = async () => {
        try {
            setIsLoading(true);
            const [resVenues, resCategories] = await Promise.all([
                authenticatedFetch(ENDPOINTS.VENUES.GET_ALL),
                authenticatedFetch(ENDPOINTS.EVENTS.CATEGORIES)
            ])
            
            let venueOptions = [];
            let categoryOptions = [];

            if (resVenues.ok) {
                const venues = await resVenues.json(); 
                venueOptions = venues; 
            }
            
            if (resCategories.ok) {
                const categories = await resCategories.json(); 
                categoryOptions = categories.categoryOptions || categories; 
            }
            
            setForm({
                categoryOptions,
                venueOptions
            })
        }
        catch (err) {
            console.error('Error fetching form data:', err);
            setError('Error connecting to server');
        } finally {
            setIsLoading(false); 
        }
    }

    useEffect(() => {
        getForm()
    }, [])

    if (isLoading) return <div>Loading form data...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        if (!validateEntireForm()) {
            return
        }
        console.log("Form data being sent:", JSON.stringify(formData, null, 2)); // Add this!
        console.log("Form valid.")
        
        try {
        const response = await authenticatedFetch(ENDPOINTS.EVENTS.CREATE, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const result = await response.json(); 
            console.log('Event successfully created:', result);
            navigate("/events"); 
        }
        else {
            const errorData = await response.json();
            console.error('Event creation failed', errorData);
        }
        }
        catch (error) {
        console.error('Error:', error);
        }
    };

    return (
        <div className="form-container  add-event-form-container">
            <form onSubmit={handleSubmit} className="form add-event-form" noValidate>
                <div className="form-header">
                    <h4>Create Event</h4>
                    <Link to="/events">
                        <button className="btn btn-round btn-round-xl btn-no-border">
                            <PiX />
                        </button>
                    </Link>
                </div>
                {/* <div className="form-group">
                    <label htmlFor="eventImage">Event Image</label>
                    <div className="form-input-group">
                        <input  type="file" name="eventImage" onChange={handleChange} placeholder="Upload an image"></input>
                    </div>  
                </div> */}
                <div className="form-group">
                    <label htmlFor="title">Event Title</label>
                    <div className="form-input-group">
                        <input type="text" name="title" value={formData.title} onChange={handleChange} onBlur={handleBlur} placeholder="Enter a title" required></input>
                        {errors.title && <p className="form-validation">{errors.title}</p>}
                    </div>  
                </div>
                <div className="form-group">
                    <label htmlFor="categoryId">Category</label>
                    <div className="form-input-group">
                        <select name="categoryId" value={formData.categoryId} onChange={handleChange} onBlur={handleBlur} required>
                            <option value="">Select a category</option>
                            {form.categoryOptions && form.categoryOptions.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.title}
                            </option>
                            ))}
                        </select>
                        {errors.categoryId && <p className="form-validation">{errors.categoryId}</p>}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <div className="form-input-group">
                        <textarea type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Enter a description of the event"></textarea>
                    </div>  
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date and time</label>
                    <div className="form-input-group">
                        <input type="datetime" name="date" value={formData.date} onChange={handleChange} onBlur={handleBlur} ></input>
                    </div>  
                </div>
                <div className="form-group">
                    <label htmlFor="price">Ticket price</label>
                    <div className="form-input-group">
                        <input type="decimal(18,2)" name="price" value={formData.price} onChange={handleChange} onBlur={handleBlur} placeholder="Enter price" required></input>
                        {errors.price && <p className="form-validation">{errors.price}</p>}
                    </div>  
                </div>
                <div className="form-group">
                    <label htmlFor="venueId">Venue</label>
                    <div className="form-input-group">
                        <select name="venueId" value={formData.venueId} onChange={handleChange} onBlur={handleBlur} required>
                            <option value="">Select a venue</option>
                            {form.venueOptions && form.venueOptions.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.title}
                            </option>
                            ))}
                        </select>
                        {errors.venueId && <p className="form-validation">{errors.venueId}</p>}
                    </div>  
                </div>
                <button type="submit" className="btn btn-blue btn-large">Create Event</button>
            </form>
        </div>
        
    )
}

export default AddEventForm