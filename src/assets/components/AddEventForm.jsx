import React, { useEffect, useState }  from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { PiX } from "react-icons/pi";
import { ENDPOINTS } from '../services/api/endpoints';

const AddEventForm = () => {

    const [form, setForm] = useState ({
        categoryOptions: [],  
        venueOptions: []
    }); 

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getForm = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(ENDPOINTS.EVENTS.GET_FORMDATA);

            if (res.ok) {
            const data = await res.json() 
            setForm(data)
            }
            else {
            // Handle error response
                console.error('Failed to fetch form data');
                setError("Failed to load form options"); 
            }
        }
        catch (err) {
            console.error('Error fetching form data:', err);
            setError('Error connecting to server');
        }
        finally {
            setIsLoading(false); 
        }
        
        useEffect(() => {
            getForm();
        }, []);

    }

    useEffect(() => {
        getForm()
    }, [])

    if (isLoading) return <div>Loading form data...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <div className="form-container  add-event-form-container">
            <form action="post" className="form add-event-form" noValidate>
                <div className="form-header">
                    <h4>Create Event</h4>
                    <Link to="/events">
                        <button className="btn btn-round btn-round-xl btn-no-border">
                            <PiX />
                        </button>
                    </Link>
                </div>
                <div className="form-group">
                    <label htmlFor="event-image">Event Image</label>
                    <div className="form-input-group">
                        <input type="file" name="event-image" placeholder="Upload an image"></input>
                        <span className="form-validation"></span>
                    </div>  
                </div>
                <div className="form-group">
                    <label htmlFor="title">Event Title</label>
                    <div className="form-input-group">
                        <input type="text" name="title" placeholder="Enter a title"></input>
                        <span className="form-validation"></span>
                    </div>  
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <div className="form-input-group">
                        <select name="category" placeholder="Select primary category">
                            <option value="">Select a category</option>
                            {form.categoryOptions && form.categoryOptions.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.title}
                            </option>
                            ))}
                        </select>
                        <span className="form-validation"></span>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <div className="form-input-group">
                        <textarea type="text" name="description" placeholder="Enter a description of the event"></textarea>
                        <span className="form-validation"></span>
                    </div>  
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date and time</label>
                    <div className="form-input-group">
                        <input type="datetime" name="date" placeholder="YYYY-MM-DD HH:MM"></input>
                        <span className="form-validation"></span>
                    </div>  
                </div>
                <div className="form-group">
                    <label htmlFor="price">Ticket price</label>
                    <div className="form-input-group">
                        <input type="decimal(18,2)" name="price" placeholder="Enter price"></input>
                        <span className="form-validation"></span>
                    </div>  
                </div>
                
                {/* <div className="form-group">
                    <label htmlFor="venue">Venue</label>
                    <div className="form-input-group">
                        <select name="venue" placeholder="Select a venue">
                            <option value={""}>{}</option>
                        </select>
                        <span className="form-validation"></span>
                    </div>  
                </div> */}
                <button type="submit" className="btn btn-blue btn-large">Create Event</button>
            </form>
        </div>
        
    )
}

export default AddEventForm