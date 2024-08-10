import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { animated, useSpring } from 'react-spring';
import Navbar from '../../components/Navbar/Navbar';
import EventMessage from '.././EventMessage/EventMessage';
import './AdoptionRequestDetails.css';

const REJECT = "Adoption request rejected.";
const ACCEPT_ADMIN = "Adoption request approved.";
const ACCEPT_WORKER = "Adoption request approved and forwarded to admin for further process.";

const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);

  const animation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(50px)',
    config: { mass: 1, tension: 80, friction: 26 },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, threshold]);

  return [setRef, animation];
};

const getImageSrc = (imageData) => {
  // console.log('Raw image data:', imageData);

  if (!imageData || !imageData.data) {
    console.warn('Image data is missing or incorrectly formatted');
    return 'path/to/placeholder/image.png';
  }

  try {
    if (typeof imageData.data === 'object' && imageData.data.type === 'Buffer' && Array.isArray(imageData.data.data)) {
      const uint8Array = new Uint8Array(imageData.data.data);
      const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
      return `data:${imageData.contentType};base64,${base64String}`;
    }
    
    console.warn('Unrecognized image data format');
    return 'path/to/placeholder/image.png';
  } catch (error) {
    console.error('Error generating image src:', error);
    return 'path/to/placeholder/image.png';
  }
};

function AdoptionRequestDetails() {
  const [requestDetails, setRequestDetails] = useState(null);
  const { id } = useParams();
  const [isNGOWorker, setIsNGOWorker] = useState(false);
  const [eventMessage, setEventMessage] = useState({ message: '', status: '', isOpen: false });
  const navigate = useNavigate();

  const [petDetailsRef, petDetailsAnimation] = useIntersectionObserver();
  const [userDetailsRef, userDetailsAnimation] = useIntersectionObserver();
  const [questionnaireRef, questionnaireAnimation] = useIntersectionObserver();
  const [buttonsRef, buttonsAnimation] = useIntersectionObserver();

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
        setEventMessage({ message: isNGOWorker ? ACCEPT_WORKER : ACCEPT_ADMIN, status: 'Accepted', isOpen: true });
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
        setEventMessage({ message: REJECT, status: 'Rejected', isOpen: true });
      } else {
        console.error('Failed to reject adoption request');
        alert('Failed to reject adoption request');
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('An error occurred while rejecting the request');
    }
  };

  const handleCloseMessage = () => {
    setEventMessage({ ...eventMessage, isOpen: false });
    navigate('/adoption-requests');
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
        
        <animated.section ref={petDetailsRef} style={petDetailsAnimation} className="pet-details">
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
              <img 
                src={getImageSrc(requestDetails.petId.photos[0])} 
                alt={requestDetails.petId.name} 
                className="pet-image"
                onError={(e) => {
                  console.error('Image failed to load:', e);
                  e.target.onerror = null; 
                  e.target.src = 'path/to/placeholder/image.png';
                }}
              />
            )}
          </div>
        </animated.section>

        <animated.section ref={userDetailsRef} style={userDetailsAnimation} className="user-details">
          <h2>Requester Details</h2>
          {requestDetails.userId && (
            <>
              <p><strong>Name:</strong> {requestDetails.userId.name}</p>
              <p><strong>Email:</strong> {requestDetails.userId.email}</p>
              <p><strong>Number:</strong> {requestDetails.userId.number}</p>
            </>
          )}
        </animated.section>

        <animated.section ref={questionnaireRef} style={questionnaireAnimation} className="questionnaire">
          <h2>Questionnaire Answers</h2>
          <div className="question-answers">
            {displayFields.map(([question, answer]) => (
              <div key={question} className="qa-item">
                <p className="question">{question}:</p>
                <p className="answer">{answer}</p>
              </div>
            ))}
          </div>
        </animated.section>

        <div className="action-buttons">
          <button className="approve-btn" onClick={handleApprove}>Approve</button>
          <button className="reject-btn" onClick={handleReject}>Reject</button>
        </div>
      </div>
      <EventMessage 
        isOpen={eventMessage.isOpen} 
        onClose={handleCloseMessage}
        message={eventMessage.message}
        statuss={eventMessage.status}
        buttonText={eventMessage.status === 'Success!' ? 'Home' : 'Close'}
      />
    </div>
  );
}

export default AdoptionRequestDetails;
