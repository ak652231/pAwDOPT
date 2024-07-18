import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/NavbarNGO/NavbarNGO';
import './AddPet.css';

function AddPet() {
  const navigate = useNavigate();
  const [pet, setPet] = useState({
    name: '',
    type: '',
    breed: '',
    age: '',
    healthInfo: '',
    compatibility: '',
  });
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPet(prevPet => ({
      ...prevPet,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      Object.keys(pet).forEach(key => formData.append(key, pet[key]));
      if (photo) {
        formData.append('photo', photo);
      }

      const response = await fetch('http://localhost:5000/api/pets/', {
        method: 'POST',
        headers: {
          'x-auth-token': token
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add new pet');
      }

      navigate('/manage-pets');
    } catch (error) {
      console.error('Error adding new pet:', error);
    }
  };

  return (
    <div className="add-pet-page">
      <Navbar />
      <div className="add-pet-content">
        <h1 className="page-title">Add New Pet</h1>
        <form onSubmit={handleSubmit} className="add-pet-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={pet.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <input
              type="text"
              id="type"
              name="type"
              value={pet.type}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="breed">Breed:</label>
            <input
              type="text"
              id="breed"
              name="breed"
              value={pet.breed}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={pet.age}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="healthInfo">Health Info:</label>
            <textarea
              id="healthInfo"
              name="healthInfo"
              value={pet.healthInfo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="compatibility">Compatibility:</label>
            <textarea
              id="compatibility"
              name="compatibility"
              value={pet.compatibility}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="photo">Pet Photo:</label>
            <div className="photo-upload">
              {previewUrl && <img src={previewUrl} alt="Pet preview" className="photo-preview" />}
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>
          </div>
          <button type="submit" className="submit-button">Add New Pet</button>
        </form>
      </div>
    </div>
  );
}

export default AddPet;