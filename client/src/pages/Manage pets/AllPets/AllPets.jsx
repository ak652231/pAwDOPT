import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/NavbarNGO/NavbarNGO';
import './AllPets.css';

function AllPets() {
  const [pets, setPets] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedBreed, setSelectedBreed] = useState('All');
  const [availableBreeds, setAvailableBreeds] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
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

  const handleViewDetails = (id) => {
    navigate(`/adopt/${id}`);
  };

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

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div className="adoption-page">
      <Navbar />
      <div className="adoption-content">
        <h1 className="page-title">Manage Adoptable Pets</h1>
        
        <div className="filter-sections">
          <div className="filter-controls">
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
          
          <button className="add-pet-button" onClick={() => navigate('/manage-pets/add-pet')}>Add Pet +</button>
        </div>

        <div className="pet-list">
          {filteredPets.map(pet => (
            <div key={pet._id} className="pet-card">
              <div className="pet-info">
                <h2 className="pet-name">{pet.name}</h2>
                <p className="pet-breed">{pet.type} - {pet.breed}</p>
                <p className="pet-age">Age: {pet.age} years</p>
                <button className="adopt-button" onClick={() => handleViewDetails(pet._id)}>
                  View Details
                </button>
              </div>
              <div className="pet-image">
                {pet.photos && pet.photos.length > 0 && (
                  <img src={pet.photos[0]} alt={pet.name} />
                )}
                <div className="pet-actions">
                  <button className="action-button" onClick={() => toggleDropdown(pet._id)}>⋮</button>
                  {activeDropdown === pet._id && (
                    <div className="action-dropdown">
                      <button onClick={() => handleEditPet(pet._id)}>Edit Pet Details</button>
                      <button onClick={() => handleDeletePet(pet._id)}>Delete This Pet</button>
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