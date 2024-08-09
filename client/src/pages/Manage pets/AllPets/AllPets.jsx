import React, { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import './AllPets.css';

function AllPets() {
  const [pets, setPets] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedBreed, setSelectedBreed] = useState('All');
  const [availableBreeds, setAvailableBreeds] = useState(['All']);
  const navigate = useNavigate();
  const [isNGOWorker, setIsNGOWorker] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [animatingCards, setAnimatingCards] = useState([]);
  const timeoutRef = useRef(null);

  const handleViewDetails = (id) => {
    setExpandedCardId(id);
    setTimeout(() => {
      navigate(`/adopt/${id}`);
    }, 500); 
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

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
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pets/');
      if (!response.ok) {
        throw new Error('Failed to fetch pets');
      }
      const petsData = await response.json();
      setPets(petsData);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const animalTypes = ['All', ...new Set(pets.map(pet => pet.type))];

  useEffect(() => {
    if (selectedType === 'All') {
      setAvailableBreeds(['All']);
    } else {
      const breeds = ['All', ...new Set(pets
        .filter(pet => pet.type === selectedType)
        .map(pet => pet.breed))];
      setAvailableBreeds(breeds);
    }
    setSelectedBreed('All');
  }, [selectedType, pets]);

  const filteredPets = pets.filter(pet =>
    (selectedType === 'All' || pet.type === selectedType) &&
    (selectedBreed === 'All' || pet.breed === selectedBreed)
  );

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setAnimatingCards([]);

    const filteredPetIds = filteredPets.map(pet => pet._id);
    
    timeoutRef.current = setTimeout(() => {
      setAnimatingCards(filteredPetIds);
    }, 50);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [selectedType, selectedBreed, pets]);

  const handleEditPet = (id) => {
    navigate(`/manage-pets/edit/${id}`);
  };

  const handleDeletePet = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/pets/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete pet');
      }

      setPets(prevPets => prevPets.filter(pet => pet._id !== id));
      console.log(`Pet with id: ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  const getImageSrc = (base64Image) => {
    return base64Image ? `data:image/png;base64,${base64Image}` : 'path/to/placeholder/image.png';
  };

  return (
    <div className="ap-page">
      <Navbar />
      <div className="ap-content">
        <h1 className="ap-title">Manage Adoptable Pets</h1>

        <div className="ap-filter-container">
          <div className="ap-filter-group">
            <div className="ap-filter-item">
              <label htmlFor="pet-type" className="ap-filter-label">Animal Type:</label>
              <select
                id="pet-type"
                className="ap-filter-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {animalTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="ap-filter-item">
              <label htmlFor="pet-breed" className="ap-filter-label">Breed:</label>
              <select
                id="pet-breed"
                className="ap-filter-select"
                value={selectedBreed}
                onChange={(e) => setSelectedBreed(e.target.value)}
              >
                {availableBreeds.map(breed => (
                  <option key={breed} value={breed}>{breed}</option>
                ))}
              </select>
            </div>
          </div>
          {isNGOWorker && (
            <button className="ap-add-btn" onClick={() => navigate('/manage-pets/add-pet')}>Add Pet +</button>
          )}
        </div>

        <div className="ap-grid">
          {filteredPets.map((pet, index) => (
            <div 
              key={pet._id} 
              className={`ap-card-container ${
                animatingCards.includes(pet._id) ? 'animate' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div 
                className={`ap-card ${expandedCardId === pet._id ? 'expanded' : ''}`}
              >
                <div className="ap-card-header">
                  {pet.photos && pet.photos[0] && (
                    <img src={getImageSrc(pet.photos[0].data)} alt={pet.name} className="ap-card-img" />
                  )}
                  <div className="ap-card-overlay">
                    <h1 className="ap-card-title">{pet.name}</h1>
                  </div>
                </div>
                <div className="ap-card-body">
                  <div className="ap-card-detail">
                    <strong className="ap-detail-label">Type:</strong>
                    <p className="ap-detail-value">{pet.type}</p>
                  </div>
                  <div className="ap-card-detail">
                    <strong className="ap-detail-label">Breed:</strong>
                    <p className="ap-detail-value">{pet.breed}</p>
                  </div>
                  <div className="ap-card-detail">
                    <strong className="ap-detail-label">Age:</strong>
                    <p className="ap-detail-value">{pet.age} years</p>
                  </div>
                  <button 
                    className="ap-action-btn" 
                    onClick={() => handleViewDetails(pet._id)}
                    disabled={expandedCardId !== null}
                  >
                    Learn more
                  </button>
                  
                  {isNGOWorker && (
                    <div className="ap-pet-actions">
                      <button className="ap-dropdown-toggle" onClick={() => toggleDropdown(pet._id)}>⋮</button>
                      {activeDropdown === pet._id && (
                        <div className="ap-action-dropdown">
                          <button onClick={() => handleEditPet(pet._id)}>Edit Pet Details</button>
                          <button onClick={() => handleDeletePet(pet._id)}>Delete This Pet</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllPets;