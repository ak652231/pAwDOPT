import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import './EditPets.css';

function EditPets() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState({
    name: '',
    type: '',
    breed: '',
    age: '',
    healthInfo: '',
    compatibility: '',
    photos: []
  });
  const [newPhoto, setNewPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchPetDetails();
  }, [id]);

  const fetchPetDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/pets/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch pet details');
      }
      const petData = await response.json();
      setPet(petData);
      if (petData.photos && petData.photos.length > 0) {
        setPreviewUrl(`data:image/jpeg;base64,${petData.photos[0].data}`);
      }
    } catch (error) {
      console.error('Error fetching pet details:', error);
    }
  };

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
      setNewPhoto(file);
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
      Object.keys(pet).forEach(key => {
        if (key !== 'photos') {
          formData.append(key, pet[key]);
        }
      });
      
      if (newPhoto) {
        formData.append('photo', newPhoto);
      }

      const response = await fetch(`http://localhost:5000/api/pets/${id}`, {
        method: 'PUT',
        headers: {
          'x-auth-token': token
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to update pet details');
      }
      navigate('/manage-pets'); 
    } catch (error) {
      console.error('Error updating pet details:', error);
    }
  };
  
  return (
    <div className="edit-pet-page">
      <Navbar />
      <div className="edit-pet-content">
        <h1 className="edit-page-title">Edit Pet Details</h1>
        <form onSubmit={handleSubmit} className="edit-pet-form">
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
  <select
    id="type"
    name="type"
    value={pet.type}
    onChange={handleInputChange}
    required
  >
    <option value="">Select a type</option>
    <option value="Dog">Dog</option>
    <option value="Cat">Cat</option>
    <option value="Other">Other</option>
  </select>
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
          <button type="submit" className="submit-button">Update Pet Details</button>
        </form>
      </div>
    </div>
  );
}

export default EditPets;