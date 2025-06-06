import { useState, useEffect } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { PiX } from "react-icons/pi";
import { ENDPOINTS } from '../../services/api/endpoints';

const Verify = () => {
  const navigate = useNavigate(); 
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    email: '',
    code: ''
  });

  //Had help with this pece of code from Claude AI, to prefill the email input field
  useEffect(() => {
    const emailFromUrl = searchParams.get('email');
    if (emailFromUrl) {
      setFormData(prev => ({
        ...prev,
        email: emailFromUrl
      }));
    }
  }, [searchParams]);

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const response = await fetch(ENDPOINTS.VERIFICATION.VERIFY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    //Debug additions from Claude AI 
    if (response.ok) {
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        console.log('Verification successful:', result);
        
        // Store token if available
        if (result && result.token) {
          localStorage.setItem('authToken', result.token);
        }
        
        navigate("/dashboard");
      } else {
        console.error('Expected JSON response but got:', contentType);
      }
    } else {
      // Handle non-200 responses safely
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        console.error('Verification failed:', errorData);
      } else {
        // For 404 or other HTML responses
        const errorText = await response.text();
        console.error('Verification failed with status:', response.status, errorText);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  return (
    <div className="center-wrapper">
      <div className="form-container verify-form-container">
        <form onSubmit={handleSubmit} className="form verify-form" noValidate>
          <div className="form-header">
            <h4>Verify your email</h4>
            <Link to="/">
              <button className="btn btn-round btn-round-xl btn-no-border">
                <PiX />
              </button>
            </Link>
          </div>
          <div className="form-info">
            <p>Please enter your email address and the the six digit code that we sent to your email account.</p>
            <p>Be sure to check your junk mail if you didn't receive the message.</p> 
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="form-input-group">
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Ex: abc@de.fg"></input>
              <span className="form-validation"></span>
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="code">Verification code</label>
            <div className="form-input-group">
              <input type="text" name="code" value={formData.code} onChange={handleChange} placeholder="Enter code"></input>
              <span className="form-validation"></span>
            </div>  
          </div>
          <button type="submit" className="btn btn-blue btn-large">Verify</button>
        </form>
      </div>
    </div>
  )
}

export default Verify