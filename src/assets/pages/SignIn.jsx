import React from 'react'

const SignIn = () => {
  return (
    <div className="center-wrapper">
      <div className="form-container signin-form-container">
        <form action="post" className="form signin-form" noValidate>
          <div className="form-header">
            <h4>Welcome back!</h4>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="form-input-group">
              <input type="text" name="email" placeholder="Enter your email address"></input>
              <span className="form-validation"></span>
            </div>  
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="form-input-group">
              <input type="text" name="password" placeholder="Enter your password"></input>
              <span className="form-validation"></span>
            </div>  
          </div>
          <div className="form-input-checkbox-group">
            <input type="checkbox" name="remember-me"></input>
            <label htmlFor="terms">Remember me</label>
          </div>
          <button type="submit" className="btn btn-blue btn-large">Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default SignIn