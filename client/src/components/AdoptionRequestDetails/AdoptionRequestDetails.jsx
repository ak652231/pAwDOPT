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
      const response = await fetch(`http://localhost:5000/api/forms/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch request details');
      }
      const data = await response.json();
      
      const petResponse = await fetch(`http://localhost:5000/api/pets/${data.petId}`);
      const userResponse = await fetch(`http://localhost:5000/api/auth/${data.userId}`);
      
      const pet = await petResponse.json();
      const user = await userResponse.json();
      
      setRequestDetails({ ...data, pet, user });
    } catch (error) {
      console.error('Error fetching request details:', error);
    }
  };

  if (!requestDetails) {
    return <div className="loading">Loading...</div>;
  }

  const { pet, user, ...formAnswers } = requestDetails;

  const displayFields = Object.entries(formAnswers).filter(([key]) => 
    !['_id', '__v', 'petId', 'userId'].includes(key)
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
          <button className="approve-btn" >Approve</button>
          <button className="reject-btn" >Reject</button>
        </div>
      </div>
    </div>
  );
}

export default AdoptionRequestDetails;