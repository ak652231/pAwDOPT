import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/NavbarNGO/NavbarNGO';
import './AdoptionRequests.css';

function AdoptionRequests() {
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdoptionRequests();
  }, []);

  const fetchAdoptionRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/forms/getAdoptionData');
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/';
        throw new Error('Failed to fetch adoption requests');
      }
      const adoptionData = await response.json();
      setAdoptionRequests(adoptionData);
    } catch (error) {
      console.error('Error fetching adoption requests:', error);
    }
  };

  const handleViewDetails = (requestId) => {
    navigate(`/adoption-requests/${requestId}`);
  };

  return (
    <div className="adoption-requests-page">
      <Navbar />
      <div className="adoption-requests-content">
        <h1 className="details-page-title">Adoption Requests</h1>
        
        <div className="requests-list">
          {adoptionRequests.map(request => (
            <div key={request._id} className="request-card">
              <div className="request-info">
                <h2 className="pet-name">{request.petId.name}</h2>
                <p className="pet-details">{request.petId.type} - {request.petId.breed}</p>
                <p className="requester-name">Requested by: {request.userId.name}</p>
                <button 
                  className="view-details-button"
                  onClick={() => handleViewDetails(request._id)}
                >
                  View Details
                </button>
              </div>
              <div className="pet-image">
                {request.petId.photos && request.petId.photos.length > 0 && (
                  <img src={request.petId.photos[0]} alt={request.petId.name} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdoptionRequests;
