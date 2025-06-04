import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { PiX } from "react-icons/pi";
import { ENDPOINTS } from '../../services/api/endpoints';

const SignUp = () => {
  const navigate = useNavigate();  

  const [formData , setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  }); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; 
    setFormData(prev => ({
      ...prev, 
      [name]: type === 'checkbox' ? checked : value
    }));
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
        console.log('Sign up successful:', result);
        navigate("/verify"); 
      }
      else {
        const errorData = await response.json();
        console.error('Sign up failed:', errorData);
      }
    }
    catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="center-wrapper">
      <div className="form-container signup-form-container">
        <form onSubmit={handleSubmit} className="form signup-form" noValidate>
          <div className="form-header">
            <h4>Create Account</h4>
            <Link to="/">
              <button className="btn btn-round btn-round-xl btn-no-border">
                <PiX />
              </button>
            </Link>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="form-input-group">
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Ex: abc@de.fg"></input>
              <span className="form-validation"></span>
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <div className="form-input-group">
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter first name"></input>
              <span className="form-validation"></span>
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <div className="form-input-group">
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name"></input>
              <span className="form-validation"></span>
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="form-input-group">
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter safe password (min 8 characters)"></input>
              <span className="form-validation"></span>
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="form-input-group">
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Repeat your password"></input>
              <span className="form-validation"></span>
            </div>  
          </div>
          <div className="form-input-checkbox-group">
            <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange}></input>
            <label htmlFor="acceptTerms">I agree to the <a href="/termsandconditions">Terms and Conditions</a></label>
          </div>
          <button type="submit" className="btn btn-blue btn-large">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp