import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './myAdoptionRequests.css'; 

function MyAdoptionRequests() {
  const [myRequests, setMyRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/forms/myReq', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get requests');
      }

      const result = await response.json();
      setMyRequests(result);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const getStatusInfo = (request) => {
    if (request.adminApproved) return { text: 'Approved', class: 'status-approved' };
    if (request.ngoWorkerApproved) return { text: 'Request reviewed, we will contact you for further process', class: 'status-reviewed' };
    if (request.rejected) return { text: 'Rejected', class: 'status-rejected' };
    return { text: 'Pending', class: 'status-pending' };
  };

  return (
    <div className="adoption-page">
      <Navbar />
      <div className="adoption-content">
        <h1 className="page-title">Your Adoption Requests</h1>

        <div className="pet-list">
          {myRequests.map(request => {
            const statusInfo = getStatusInfo(request);
            return (
              <div key={request._id} className={`pet-card ${statusInfo.class}`}>
                <div className="pet-info">
                  <h2 className="pet-name">{request.petId.name}</h2>
                  <p className="pet-breed">{request.petId.type} - {request.petId.breed}</p>
                  <p className="pet-age">Age: {request.petId.age}</p>
                  <p className="pet-status">Status: {statusInfo.text}</p>
                </div>
                <div className="pet-image">
                  {request.petId.photos && request.petId.photos.length > 0 && (
                    <img src={request.petId.photos[0]} alt={`${request.petId.name}`} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MyAdoptionRequests;