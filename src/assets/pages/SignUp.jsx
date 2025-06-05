import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { PiX } from "react-icons/pi";
import { ENDPOINTS } from '../../services/api/endpoints';
import { validateForm, validateSingleField } from '../../utils/validation';
import { useAuth } from '../../contexts/AuthContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { authenticatedFetch } = useAuth();  

  const [formData , setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  }); 

  const [ errors, setErrors ] = useState ({});
  const getRequiredFields = () => {
    const requiredInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    return Array.from(requiredInputs).map(input => input.name);
  }
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; 
    setFormData(prev => ({
      ...prev, 
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldError = validateSingleField(name, value, formData);
    setErrors(prev => ({
        ...prev,
        [name]: fieldError
    }));
};

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const requiredFields = getRequiredFields()
    const validationResult = validateForm(formData, requiredFields)
    
    setErrors(validationResult.errors)
    
    if (!validationResult.isValid) {
      return
    }
    
    console.log("Form valid.")
    try {
      const response = await authenticatedFetch(ENDPOINTS.AUTH.SIGNUP, {
        method: 'POST',
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
              <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} placeholder="Ex: abc@de.fg" required></input>
              {errors.email && <p className="form-validation">{errors.email}</p>}
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <div className="form-input-group">
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} onBlur={handleBlur} placeholder="Enter first name" required></input>
              {errors.firstName && <p className="form-validation">{errors.firstName}</p>}
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <div className="form-input-group">
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} onBlur={handleBlur} placeholder="Enter last name" required></input>
              {errors.lastName && <p className="form-validation">{errors.lastName}</p>}
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="form-input-group">
              <input type="password" name="password" value={formData.password} onChange={handleChange} onBlur={handleBlur} placeholder="Enter safe password" required></input>
              {errors.password && <p className="form-validation">{errors.password}</p>}
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="form-input-group">
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} onBlur={handleBlur} placeholder="Repeat your password" required></input>
              {errors.confirmPassword && <p className="form-validation">{errors.confirmPassword}</p>}
            </div>  
          </div>
          <div className="form-group">
            <div className="form-input-checkbox-group">
              <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} onBlur={handleBlur} required></input>
              <label htmlFor="acceptTerms">I agree to the <a href="/termsandconditions">Terms and Conditions</a></label>
            </div>
            {errors.acceptTerms && <p className="form-validation">{errors.acceptTerms}</p>}
          </div>
          <button type="submit" className="btn btn-blue btn-large">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp