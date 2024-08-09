import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ChatBox from '../../components/ChatBox/ChatBox';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import './myAdoptionRequests.css';

const getStatusInfo = (request) => {
  if (request.rejected) return { text: 'Rejected', class: 'status-rejected' };
  if (request.adminApproved) return { text: 'Approved', class: 'status-approved' };
  if (request.ngoWorkerApproved) return { text: 'Request reviewed, we will contact you for further process', class: 'status-reviewed' };
  return { text: 'Pending', class: 'status-pending' };
};

const RequestCard = ({ request, onChatClick }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const animation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { tension: 400, friction: 15 },
  });

  const statusInfo = getStatusInfo(request);

  return (
    <animated.div ref={ref} style={animation} className={`mypet-card ${statusInfo.class}`}>
      <div className="mypet-info">
        <h2 className="mypet-name">{request.petId.name}</h2>
        <p className="mypet-breed">{request.petId.type} - {request.petId.breed}</p>
        <p className="mypet-age">Age: {request.petId.age}</p>
        <p className="mypet-status">Status: {statusInfo.text}</p>
        {request.adminApproved && (
          <button className="chat-button" onClick={() => onChatClick(request)}>
            Chat with us
          </button>
        )}
      </div>
      <div className="mypet-image">
        {request.petId.photos && request.petId.photos.length > 0 && (
          <img src={request.petId.photos[0]} alt={`${request.petId.name}`} />
        )}
      </div>
    </animated.div>
  );
};

function MyAdoptionRequests() {
  const [myRequests, setMyRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/forms/myReq', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get requests');
      }

      const result = await response.json();
      setMyRequests(result);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleChatClick = (request) => {
    setSelectedRequest(request);
    setShowChat(true);
  };

  const closeChat = () => {
    setShowChat(false);
    setSelectedRequest(null);
  };

  return (
    <div className="adoption-page">
      <div className={`adoption-content ${showChat ? 'chat-open' : ''}`}>
        <Navbar />
        <h1 className="myReq-page-title">Your Adoption Requests</h1>

        <div className="mypet-list">
          {myRequests.map(request => (
            <RequestCard
              key={request._id}
              request={request}
              onChatClick={handleChatClick}
            />
          ))}
        </div>
      </div>
      {showChat && selectedRequest && (
        <div className='cb-bg'>
          <ChatBox request={selectedRequest} onClose={closeChat} />
        </div>
      )}
    </div>
  );
}

export default MyAdoptionRequests;
