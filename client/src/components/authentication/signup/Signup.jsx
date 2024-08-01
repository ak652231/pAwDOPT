import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
    age: '',
    gender: '',
    role: '',
    password: '',
    otp: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendOTP = async () => {
    if (!formData.number) {
      alert('Please enter a phone number');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: formData.number }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        alert('OTP sent successfully');
      } else {
        alert(data.message || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: formData.number, otp: formData.otp }),
      });

      if (response.ok) {
        setOtpVerified(true);
        alert('OTP verified successfully');
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      alert('Please verify your phone number first');
      return;
    }
    setSubmitting(true);

    if (formData.role === 'ngo_worker' && !formData.email.endsWith('@ngo.com')) {
      alert('You are not NGO worker, contact NGO Admin!');
      setSubmitting(false);
      return;
    }
    if (formData.role === 'ngo_admin' && !formData.email.endsWith('@ngoAdmin.com')) {
      alert('You are not NGO worker, contact NGO Admin!');
      setSubmitting(false);
      return;
    }

    const url = 'http://localhost:5000/api/auth/signup';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Signup successful');
        alert('Account created successfully!');
        window.location.href = '/login';
      } else {
        console.error('Signup failed');
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <h1>Create an Account</h1>
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group phone-group">
            <label htmlFor="number">Phone Number</label>
            <div className="phone-input-container">
              <input
                type="tel"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                onClick={sendOTP}
                className="send-otp-button"
                disabled={otpSent}
              >
                {otpSent ? 'OTP Sent' : 'Send OTP'}
              </button>
            </div>
          </div>
          {otpSent && (
            <div className="form-group">
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                onClick={verifyOTP}
                className="verify-otp-button"
                disabled={otpVerified}
              >
                {otpVerified ? 'Verified' : 'Verify OTP'}
              </button>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group half-width">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="">Select role</option>
              <option value="adopter">Adopter</option>
              <option value="ngo_worker">NGO Worker</option>
              <option value="ngo_admin">NGO Admin</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group checkbox">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I accept the <a href="#">Terms and Conditions</a>
            </label>
          </div>
          <button type="submit" className="signup-button" disabled={submitting || !otpVerified}>
            {submitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <div className="signup-footer">
          <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;