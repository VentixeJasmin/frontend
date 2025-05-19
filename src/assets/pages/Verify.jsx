import React from 'react'

const Verify = () => {
  return (
    <div className="center-wrapper">
      <div className="form-container verify-form-container">
        <form action="post" className="form verify-form" noValidate>
          <div className="form-header">
            <h4>Verify your email</h4>
            <p>Please enter the six digit code that we sent to your email account.</p>
            <p>Be sure to check your junk mail if you didn't receive the message.</p> 
          </div>
          <div className="form-group">
            <label htmlFor="verification-number">Verification code</label>
            <div className="form-input-group">
              <input type="number" name="verification-number" placeholder="Enter code"></input>
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