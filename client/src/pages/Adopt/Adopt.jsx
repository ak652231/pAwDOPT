import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './Adopt.css';

function Adopt() {
  const [pets, setPets] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedBreed, setSelectedBreed] = useState('All');
  const [availableBreeds, setAvailableBreeds] = useState([]);
  const navigate = useNavigate();

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

  const handleLearnMoreClick = (id) => {
    navigate(`/adopt/${id}`);
  };

  const getImageSrc = (base64Image) => {
    return base64Image ? `data:image/png;base64,${base64Image}` : 'path/to/placeholder/image.png';
  };

  return (
    <div className="adoption-page">
      <Navbar />
      <div className="adoption-content">
        <h1 className="adopt-page-title">Adopt a Pet</h1>
        
        <div className="filter-section">
          <div className="filter-group">
            <label htmlFor="pet-type" className="filter-label">Animal Type:</label>
            <select 
              id="pet-type" 
              className="filter-select"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {animalTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="pet-breed" className="filter-label">Breed:</label>
            <select 
              id="pet-breed" 
              className="filter-select"
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
            >
              {availableBreeds.map(breed => (
                <option key={breed} value={breed}>{breed}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="pet-list">
          {filteredPets.map(pet => (
            <div key={pet._id} className="pet-card">
              <div className="pet-info">
                <h2 className="pet-name">{pet.name}</h2>
                <p className="pet-breed">{pet.type} - {pet.breed}</p>
                <p className="pet-age">Age: {pet.age} years</p>
                <button className="adopt-button" onClick={() => handleLearnMoreClick(pet._id)}>
                  Learn More
                </button>
              </div>
              <div className="pet-image">
                {pet.photos && pet.photos.length > 0 && (
                  <img src={getImageSrc(pet.photos[0].data)} alt={pet.name} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Adopt;
