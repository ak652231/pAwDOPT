import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../../components/Navbar/Navbar';
import './AdoptionRequests.css';

function AdoptionRequests() {
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const navigate = useNavigate();
  const [isNGOWorker, setIsNGOWorker] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const user = decodedToken.user;
      if (user && (user.email.endsWith('@ngo.com') || user.role === 'ngo_worker')) {
        setIsNGOWorker(true);
      }
    }
  }, []);

  useEffect(() => {
    fetchAdoptionRequests();
  }, [isNGOWorker]);

  const fetchAdoptionRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/';
        throw new Error('Token not found');
      }
      
      const response = await fetch('http://localhost:5000/api/forms/getAdoptionData', {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch adoption requests');
      }

      const adoptionData = await response.json();

      const filteredData = isNGOWorker 
        ? adoptionData.filter(request => !request.ngoWorkerApproved && !request.adminApproved && !request.rejected)
        : adoptionData.filter(request => request.ngoWorkerApproved && !request.adminApproved && !request.rejected);

      setAdoptionRequests(filteredData);

    } catch (error) {
      console.error('Error fetching adoption requests:', error);
    }
  };

  const handleViewDetails = (requestId) => {
    navigate(`/adoption-requests/${requestId}`);
  };

  const getImageSrc = (base64Image) => {
    return base64Image ? `data:image/png;base64,${base64Image}` : 'path/to/placeholder/image.png';
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
                  <img src={getImageSrc(request.petId.photos[0].data)} alt={request.petId.name} />
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
