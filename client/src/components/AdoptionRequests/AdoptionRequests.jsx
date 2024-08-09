import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/Navbar/Navbar';
import './AdoptionRequests.css';

function AdoptionRequests() {
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isNGOWorker, setIsNGOWorker] = useState(false);

  const fetchAdoptionRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/';
        throw new Error('Token not found');
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user.id;

      const response = await fetch('http://localhost:5000/api/forms/getAdoptionData', {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch adoption requests');
      }

      const adoptionData = await response.json();
      console.log('Adoption Data:', adoptionData);

      const filteredData = isNGOWorker 
        ? adoptionData.filter(request => !request.ngoWorkerApproved && !request.adminApproved && !request.rejected && request.assignedWorker._id === userId)
        : adoptionData.filter(request => request.ngoWorkerApproved && !request.adminApproved && !request.rejected);

      console.log('Filtered Data:', filteredData);
      setAdoptionRequests(filteredData);

    } catch (error) {
      console.error('Error fetching adoption requests:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isNGOWorker]);

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
    fetchAdoptionRequests();
  }, [fetchAdoptionRequests]);

  const handleViewDetails = (requestId) => {
    navigate(`/adoption-requests/${requestId}`);
  };

  const getImageSrc = (base64Image) => {
    return base64Image ? `data:image/png;base64,${base64Image}` : 'path/to/placeholder/image.png';
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  console.log('Rendering. isLoading:', isLoading, 'adoptionRequests:', adoptionRequests);

  return (
    <div className="adoption-requests-page">
      <Navbar />
      <motion.div 
        className="adoption-requests-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="details-page-title">Adoption Requests</h1>
        
        {isLoading ? (
          <p>Loading adoption requests...</p>
        ) 
        : (
          <AnimatePresence>
            <motion.div 
              className="requests-list"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {adoptionRequests.map(request => (
                <motion.div 
                  key={request._id} 
                  className="request-card"
                  variants={cardVariants}
                >
                  <div className="pet-image">
                    {request.petId && request.petId.photos && request.petId.photos.length > 0 && (
                      <img src={getImageSrc(request.petId.photos[0].data)} alt={request.petId.name} />
                    )}
                  </div>
                  <div className="request-info">
                    <h2 className="pet-name">{request.petId ? request.petId.name : 'Unknown Pet'}</h2>
                    <p className="pet-details">
                      {request.petId ? `${request.petId.type} - ${request.petId.breed}` : 'Details not available'}
                    </p>
                    <p className="requester-name">
                      Requested by: {request.userId ? request.userId.name : 'Unknown User'}
                    </p>
                    <motion.button 
                      className="view-details-button"
                      onClick={() => handleViewDetails(request._id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
}

export default AdoptionRequests;