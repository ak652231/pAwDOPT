import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../../components/Navbar/Navbar';
import './AdoptionRequestDetails.css';

function AdoptionRequestDetails() {
  const [requestDetails, setRequestDetails] = useState(null);
  const { id } = useParams();
  const [isNGOWorker, setIsNGOWorker] = useState(false);
  const navigate = useNavigate();

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
    if (id) {
      fetchRequestDetails();
    }
  }, [id]);

  const fetchRequestDetails = async () => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        navigate('/');
        throw new Error('Failed to fetch request details');
      }

      const response = await fetch(`http://localhost:5000/api/forms/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      setRequestDetails(data);
    } catch (error) {
      console.error('Error fetching request details:', error);
    }
  };

  const handleApprove = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        throw new Error('Authorization token is missing');
      }
      const response = await fetch(`http://localhost:5000/api/forms/approve/${isNGOWorker ? 'ngo' : 'admin'}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert(`Adoption request approved by ${isNGOWorker ? 'NGO worker' : 'Admin'}`);
        navigate('/adoption-requests');
      } else {
        console.error('Failed to approve adoption request');
        alert('Failed to approve adoption request');
      }
    } catch (error) {
      console.error('Error approving request:', error);
      alert('An error occurred while approving the request');
    }
  };

  const handleReject = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        throw new Error('Authorization token is missing');
      }

      const response = await fetch(`http://localhost:5000/api/forms/reject/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Adoption request rejected');
        navigate('/adoption-requests');
      } else {
        console.error('Failed to reject adoption request');
        alert('Failed to reject adoption request');
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('An error occurred while rejecting the request');
    }
  };

  if (!requestDetails) {
    return <div className="loading">Loading...</div>;
  }

  const displayFields = Object.entries(requestDetails).filter(([key]) => 
    !['_id', '__v', 'petId', 'userId', 'ngoWorkerApproved', 'adminApproved', 'rejected', 'assignedWorker'].includes(key)
  );

  return (
    <div className="adoption-request-details">
      <Navbar />
      <div className="details-content">
        <h1 className="page-title">Adoption Request Details</h1>
        
        <section className="pet-details">
          <h2>Pet Details</h2>
          <div className="pet-info">
            <div className="pet-text">
              {requestDetails.petId && (
                <>
                  <p><strong>Name:</strong> {requestDetails.petId.name}</p>
                  <p><strong>Type:</strong> {requestDetails.petId.type}</p>
                  <p><strong>Breed:</strong> {requestDetails.petId.breed}</p>
                  <p><strong>Health Info:</strong> {requestDetails.petId.healthInfo}</p>
                  <p><strong>Compatibility:</strong> {requestDetails.petId.compatibility}</p>
                </>
              )}
            </div>
            {requestDetails.petId && requestDetails.petId.photos && requestDetails.petId.photos.length > 0 && (
              <img src={requestDetails.petId.photos[0]} alt={requestDetails.petId.name} className="pet-image" />
            )}
          </div>
        </section>

        <section className="user-details">
          <h2>Requester Details</h2>
          {requestDetails.userId && (
            <>
              <p><strong>Name:</strong> {requestDetails.userId.name}</p>
              <p><strong>Email:</strong> {requestDetails.userId.email}</p>
              <p><strong>Number:</strong> {requestDetails.userId.number}</p>
            </>
          )}
        </section>

        <section className="questionnaire">
          <h2>Questionnaire Answers</h2>
          <div className="question-answers">
            {displayFields.map(([question, answer]) => (
              <div key={question} className="qa-item">
                <p className="question">{question}:</p>
                <p className="answer">{answer}</p>
              </div>
            ))}
          </div>
        </section>
        <div className="action-buttons">
          <button className="approve-btn" onClick={handleApprove}>Approve</button>
          <button className="reject-btn" onClick={handleReject}>Reject</button>
        </div>
      </div>
    </div>
  );
}

export default AdoptionRequestDetails;