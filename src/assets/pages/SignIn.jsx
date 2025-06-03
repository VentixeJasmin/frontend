import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { PiX } from "react-icons/pi";
import { ENDPOINTS } from '../services/api/endpoints';

const SignIn = () => {
  const navigate = useNavigate();  

  const [formData , setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
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
      const response = await fetch(ENDPOINTS.AUTH.SIGNIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json(); 
        console.log('Sign in successful:', result);
        navigate("/dashboard"); 
      }
      else {
        const errorData = await response.json();
        console.error('Sign in failed:', errorData);
      }
    }
    catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="center-wrapper">
      <div className="form-container signin-form-container">
        <form onSubmit={handleSubmit} className="form signin-form" noValidate>
          <div className="form-header">
            <h4>Welcome back!</h4>
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
            <label htmlFor="password">Password</label>
            <div className="form-input-group">
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password"></input>
              <span className="form-validation"></span>
            </div>  
          </div>
          <div className="form-input-checkbox-group">
            <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange}></input>
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <button type="submit" className="btn btn-blue btn-large">Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default SignIn