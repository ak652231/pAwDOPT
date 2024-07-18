import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/NavbarNGO/NavbarNGO';
import './AdoptionRequestDetails.css';

function AdoptionRequestDetails() {
  const [requestDetails, setRequestDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchRequestDetails();
    }
  }, [id]);

  const fetchRequestDetails = async () => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        window.location.href = '/';
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
        window.location.href = '/';
        throw new Error('Authorization token is missing');
      }

      const response = await fetch(`http://localhost:5000/api/forms/approve/ngo/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Adoption request approved by NGO worker');
        fetchRequestDetails();
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
        window.location.href = '/';
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
        window.location.href = '/adoption-requests';
        fetchRequestDetails();
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

  const { petId: pet, userId: user, ...formAnswers } = requestDetails;

  const displayFields = Object.entries(formAnswers).filter(([key]) => 
    !['_id', '__v', 'petId', 'userId', 'ngoWorkerApproved', 'adminApproved', 'rejected'].includes(key)
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
              <p><strong>Name:</strong> {pet.name}</p>
              <p><strong>Type:</strong> {pet.type}</p>
              <p><strong>Breed:</strong> {pet.breed}</p>
              <p><strong>Health Info:</strong> {pet.healthInfo}</p>
              <p><strong>Compatibility:</strong> {pet.compatibility}</p>
            </div>
            {pet.photos && pet.photos.length > 0 && (
              <img src={pet.photos[0]} alt={pet.name} className="pet-image" />
            )}
          </div>
        </section>

        <section className="user-details">
          <h2>Requester Details</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Number:</strong> {user.number}</p>
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
