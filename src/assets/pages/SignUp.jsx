import React from 'react'

const SignUp = () => {
  return (
    <div className="center-wrapper">
      <div className="form-container signup-form-container">
        <form action="post" className="form signup-form" novalidate>
          <div className="form-header">
            <h4>Create Account</h4>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="form-input-group">
              <input type="text" name="email" placeholder="Ex: abc@de.fg"></input>
              <span className="form-validation"></span>
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <div className="form-input-group">
              <input type="text" name="firstName" placeholder="Enter first name"></input>
              <span className="form-validation"></span>
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <div className="form-input-group">
              <input type="text" name="lastName" placeholder="Enter last name"></input>
              <span className="form-validation"></span>
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="form-input-group">
              <input type="text" name="password" placeholder="Enter safe password (min 8 characters)"></input>
              <span className="form-validation"></span>
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="form-input-group">
              <input type="text" name="confirmPassword" placeholder="Repeat your password"></input>
              <span className="form-validation"></span>
            </div>  
          </div>
          <div className="form-input-checkbox-group">
            <input type="checkbox" name="terms"></input>
            <label htmlFor="terms">I agree to the <a href="/termsandconditions">Terms and Conditions</a></label>
          </div>
          <button type="submit" className="btn btn-blue btn-large">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp