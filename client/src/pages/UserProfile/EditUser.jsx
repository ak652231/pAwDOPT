import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './EditUser.css';

function EditUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
    gender: '',
    age: '',
    role: ''
  });

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/auth/userprofile`, {
        headers: {
          'x-auth-token': token
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/auth/edituser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error('Failed to update user details');
      }
      navigate('/userprofile');
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  return (
    <div className="edit-user-page">
      <Navbar />
      <div className="edit-user-content">
        <h1 className="edit-page-title nuni">Edit Your Profile</h1>
        <div className="edit-user-card">
          <div className="edit-user-avatar">{user.name.charAt(0)}</div>
          <form onSubmit={handleSubmit} className="edit-user-form">
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
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
                  value={user.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="number">Phone Number</label>
                <input
                  type="tel"
                  id="number"
                  name="number"
                  value={user.number}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={user.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={user.age}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={user.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="adopter">Adopter</option>
                  <option value="ngo_worker">NGO Worker</option>
                </select>
              </div>
            </div>
            <div className="form-group full-width">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={user.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group full-width">
              <button type="submit" className="submit-button nuni">Update Profile</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;