import React, { useEffect, useState }  from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { PiX } from "react-icons/pi";
import { ENDPOINTS } from '../../services/api/endpoints';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useAuth } from '../../contexts/AuthContext';

//Helper method created by Claude AI to dynamically hide and show fields in form 
const getRequiredFieldsForPaymentMethod = (paymentMethodId) => {
    switch(parseInt(paymentMethodId)) {
        case 1: // Credit Card
            return ['creditCardNumber', 'expires', 'CVV'];
        case 2: // Phone Payment
            return ['phoneNumber'];
        case 3: // Physical Address Payment
            return ['streetAddress', 'postCode', 'city'];
        default:
            return [];
    }
};


const BookEvent = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { authenticatedFetch } = useAuth()
    const [ event, setEvent ] = useState(null)
    
    const {
        formData,
        errors,
        handleChange,
        handleBlur,
        validateEntireForm
    } = useFormValidation({
        eventId: '',
        pricePerTicket: '',
        quantity: '',
        paymentMethodId: '',
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        streetAddress: '',
        postCode: '',
        city: '',
        creditCardNumber: '',
        expires: '',
        CVV: ''
    })

    const [form, setForm] = useState({
        paymentMethodOptions: []
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getEvent = async () => {
        try {
            setIsLoading(true);
            const eventRes = await fetch (`${ENDPOINTS.EVENTS.GET}/${id}`)

            if (eventRes.ok) {
                const eventData = await eventRes.json(); 
                console.log(eventData)
                setEvent(eventData)
            }
        }
        catch (err) {
            console.error('Error fetching event:', err);
            setError('Error connecting to server');
        } finally {
            setIsLoading(false); 
        }
    }

    const getForm = async () => {
        try {
            setIsLoading(true);
            const pmRes = await fetch (ENDPOINTS.ORDERS.GET_FORMDATA)

            let paymentMethodOptions = []; 

            if (pmRes.ok) {
                const pmData = await pmRes.json(); 

                console.log("Raw API response:", pmData); // Add this
                console.log("Type of response:", typeof pmData); // Add this
                console.log("Is array?", Array.isArray(pmData)); // Add this

                paymentMethodOptions = pmData.paymentMethodOptions || []; 
            }
            
            setForm({
                paymentMethodOptions
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
          getEvent();
      }, [id]);

    useEffect(() => {
        getForm()
    }, [])

    if (isLoading) return <div>Loading form data...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        const completeFormData = {
            ...formData,
            eventId: event.id, 
            pricePerTicket: parseFloat(event.price)
        };

        if (!validateEntireForm()) {
            return
        }

        console.log("Form data being sent:", JSON.stringify(completeFormData)); // Add this!
        console.log("Form valid.")
        
        try {
        const response = await fetch(ENDPOINTS.ORDERS.CREATE, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(completeFormData)
        });

        if (response.ok) {
            const result = await response.json(); 
            console.log('Order successfully created:', result);
            navigate("/"); 
        }
        else {
            const errorData = await response.json();
            console.error('Order creation failed', errorData);
        }
        }
        catch (error) {
        console.error('Error:', error);
        }
    };

    const requiredFields = getRequiredFieldsForPaymentMethod(formData.paymentMethodId);

  return (
    <div className="form-container create-order-form-container">
            <form onSubmit={handleSubmit} className="form book-event-form" noValidate>
                <div className="form-header">
                    <h4>Book Ticket</h4>
                    <Link to="/">
                        <button className="btn btn-round btn-round-xl btn-no-border">
                            <PiX />
                        </button>
                    </Link>
                </div>
                <div className='form-info'>
                    <p>Complete the form to buy tickets to {event.title} for $ {event.price} per ticket.</p>
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <div className="form-input-group">
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Enter the number of tickets you'd like to purchase"></input>
                    </div>  
                    {errors.quantity && <p className="form-validation">{errors.quantity}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="paymentMethodId">Payment method</label>
                    <div className="form-input-group">
                        <select name="paymentMethodId" value={formData.paymentMethodId} onChange={handleChange} onBlur={handleBlur} required>
                            <option value="">Select a payment method</option>
                            {form.paymentMethodOptions && form.paymentMethodOptions.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.paymentMethod}
                            </option>
                            ))}
                        </select>
                        {errors.paymentMethodId && <p className="form-validation">{errors.paymentMethodId}</p>}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Email Address</label>
                    <div className="form-input-group">
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" required></input>
                    </div>  
                    {errors.email && <p className="form-validation">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <div className="form-input-group">
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter your first name" required></input>
                    </div>  
                    {errors.firstName && <p className="form-validation">{errors.firstName}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <div className="form-input-group">
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter your last name" required></input>
                    </div>  
                    {errors.lastName && <p className="form-validation">{errors.lastName}</p>}
                </div>
                {requiredFields.includes('phoneNumber') && (
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number for payment</label>
                        <div className="form-input-group">
                            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter your phone number" />
                        </div>  
                        {errors.phoneNumber && <p className="form-validation">{errors.phoneNumber}</p>}
                    </div>
                )}
                {requiredFields.includes('streetAddress') && (
                    <div className="form-group">
                        <label htmlFor="streetAddress">Street Address</label>
                        <div className="form-input-group">
                            <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} placeholder="Enter your street address"></input>
                        </div>  
                        {errors.streetAddress && <p className="form-validation">{errors.streetAddress}</p>}
                    </div>
                )}
                {requiredFields.includes('postCode') && (
                    <div className="form-group">
                        <label htmlFor="postCode">Post Code</label>
                        <div className="form-input-group">
                            <input type="text" name="postCode" value={formData.postCode} onChange={handleChange} placeholder="Enter your post code"></input>
                        </div>  
                        {errors.postCode && <p className="form-validation">{errors.postCode}</p>}
                    </div>
                )}
                {requiredFields.includes('city') && (
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <div className="form-input-group">
                            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Enter your city"></input>
                        </div>  
                        {errors.city && <p className="form-validation">{errors.city}</p>}
                    </div>
                )}
                {requiredFields.includes('creditCardNumber') && (
                    <div className="form-group">
                        <label htmlFor="creditCardNumber">Credit Card Number</label>
                        <div className="form-input-group">
                            <input type="text" name="creditCardNumber" value={formData.creditCardNumber} onChange={handleChange} placeholder="Enter your credit card number"></input>
                        </div>  
                        {errors.creditCardNumber && <p className="form-validation">{errors.creditCardNumber}</p>}
                    </div>
                )}
                {requiredFields.includes('expires') && (
                    <div className="form-group">
                        <label htmlFor="expires">Credit Card Expiry Date</label>
                        <div className="form-input-group">
                            <input type="text" name="expires" value={formData.expires} onChange={handleChange} placeholder="Enter the credit card's expiry date"></input>
                        </div>  
                        {errors.expires && <p className="form-validation">{errors.expires}</p>}
                    </div>
                )}
                {requiredFields.includes('CVV') && (
                    <div className="form-group">
                        <label htmlFor="CVV">Credit Card CVV Code</label>
                        <div className="form-input-group">
                            <input type="text" name="CVV" value={formData.CVV} onChange={handleChange} placeholder="Enter the three digit cvv code"></input>
                        </div>  
                        {errors.CVV && <p className="form-validation">{errors.CVV}</p>}
                    </div>
                )}
                <button type="submit" className="btn btn-blue btn-large">Place order</button>
            </form>
        </div>
  )
}

export default BookEvent