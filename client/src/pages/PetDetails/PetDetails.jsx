import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import Navbar from '../../components/Navbar/Navbar';
import './PetDetails.css';


function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pets/${id}`);
        if (!response.ok) {
          throw new Error('Pet not found');
        }
        const petData = await response.json();
        setPet(petData);
      } catch (error) {
        console.error('Error fetching pet details:', error);
      }
    };

    fetchPetDetails();
  }, [id]);

  if (!pet) {
    return <div>Loading...</div>;
  }
  const handleAdopt = () => {
    navigate(`/adform/${id}`);
  };
  return (
    <div className="pet-details-page">
      <Navbar />
      <div className="pet-details-content">
        <div className="pet-header">
          <img src={pet.photos[0]} alt={pet.name} />
          <div className="pet-name-overlay">
            <h1 className="pet-name-large">{pet.name}</h1>
          </div>
        </div>
        <div className="pet-info">
          <div className="info-grid">
            <div className="info-item">
              <strong>Type</strong>
              <p>{pet.type}</p>
            </div>
            <div className="info-item">
              <strong>Breed</strong>
              <p>{pet.breed}</p>
            </div>
            <div className="info-item">
              <strong>Age</strong>
              <p>{pet.age} years</p>
            </div>
            
          </div>
          <div className="pet-description">
            <h2>Health Information</h2>
            <p>{pet.healthInfo}</p>
            <h2>Compatibility</h2>
            <p>{pet.compatibility}</p>
          </div>
          <div className="pet-photos">
            {pet.photos && pet.photos.length > 1 && 
              pet.photos.slice(1).map((photo, index) => (
                <img key={index} src={photo} alt={`${pet.name} - Photo ${index + 2}`} />
              ))
            }
          </div>
          <button  className="adopt-button-large" onClick={handleAdopt}>Adopt {pet.name}</button>
        </div>
      </div>
    </div>
  );
}

export default PetDetails;
