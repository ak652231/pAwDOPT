import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ChatBox from '../../components/ChatBox/ChatBox';
import './myAdoptionRequests.css';

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

  const getStatusInfo = (request) => {
    if (request.rejected) return { text: 'Rejected', class: 'status-rejected' };
    if (request.adminApproved) return { text: 'Approved', class: 'status-approved' };
    if (request.ngoWorkerApproved) return { text: 'Request reviewed, we will contact you for further process', class: 'status-reviewed' };
    return { text: 'Pending', class: 'status-pending' };
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

        <div className="pet-list">
          {myRequests.map(request => {
            const statusInfo = getStatusInfo(request);
            return (
              <div key={request._id} className={`pet-card ${statusInfo.class}`}>
                <div className="pet-info">
                  <h2 className="pet-name">{request.petId.name}</h2>
                  <p className="pet-breed">{request.petId.type} - {request.petId.breed}</p>
                  <p className="pet-age">Age: {request.petId.age}</p>
                  <p className="pet-status">Status: {statusInfo.text}</p>
                  {request.adminApproved && (
                    <button className="chat-button" onClick={() => handleChatClick(request)}>
                      Chat with us
                    </button>
                  )}
                </div>
                <div className="pet-image">
                  {request.petId.photos && request.petId.photos.length > 0 && (
                    <img src={request.petId.photos[0]} alt={`${request.petId.name}`} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {showChat && selectedRequest && (
        <ChatBox request={selectedRequest} onClose={closeChat} />
      )}
    </div>
  );
}

export default MyAdoptionRequests;