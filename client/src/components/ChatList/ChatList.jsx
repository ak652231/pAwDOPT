import React, { useState, useEffect } from 'react';
import ChatBox from '../ChatBox/ChatBox';
import './ChatList.css';

function ChatList({ onClose }) {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    fetchChatRequests();
  }, []);

  const fetchChatRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/chat/requests', {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch chat requests');
      }

      const data = await response.json();
      console.log('Fetched requests:', data);
      setRequests(data);
    } catch (error) {
      console.error('Error fetching chat requests:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChat = (request) => {
    setSelectedChat(request);
  };

  const handleCloseChat = () => {
    setSelectedChat(null);
  };

  if (loading) {
    return <div className="chat-list">Loading...</div>;
  }

  if (error) {
    return <div className="chat-list error">Error: {error}</div>;
  }

  if (selectedChat) {
    return (
      <div className="chat-box-container">
        <ChatBox request={selectedChat} onClose={handleCloseChat} />
      </div>
    );
  }

  return (
    <div className='chat-list-container'>
      <div className="chat-list">
        <div className="chat-list-header">
          <h3>Chats</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        {requests.length === 0 ? (
          <p className="no-chats">No chat requests found.</p>
        ) : (
          <ul className="chat-list-items">
            {requests.map(request => (
              <li 
                key={request._id} 
                className="chat-item"
                onClick={() => handleSelectChat(request)}
              >
                <div className="request-info">
                  <span className="username">{request.user?.name || 'Unknown'}</span>
                  <span className="petname">requests {request.petName || 'Unknown'}</span>
                </div>
                {request.latestMessage && (
                  <div className="latest-message">
                    <span className="message-preview">
                      {request.latestMessage.content.substring(0, 30)}
                      {request.latestMessage.content.length > 30 ? '...' : ''}
                    </span>
                    <span className="message-time">
                      {new Date(request.latestMessage.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ChatList;