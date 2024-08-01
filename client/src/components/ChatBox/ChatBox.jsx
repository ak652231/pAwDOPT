import React, { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import io from 'socket.io-client';
import './ChatBox.css';

function ChatBox({ request, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [partnerName, setPartnerName] = useState('Partner');
  const [currentUser, setCurrentUser] = useState(null);
  const [fullRequest, setFullRequest] = useState(null);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (request && request._id) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        setCurrentUser(decodedToken.user);
      }

      fetchRequestDetails(request._id);
      fetchMessages(request._id);

      socketRef.current = io('http://localhost:5000');
      socketRef.current.emit('join chat', request._id);

      socketRef.current.on('new message', (message) => {
        console.log('Received new message:', message);
        setMessages(prevMessages => [...prevMessages, message]);
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, [request]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchRequestDetails = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/forms/${requestId}`, {
        headers: { 'x-auth-token': token }
      });
      if (!response.ok) throw new Error('Failed to fetch request details');
      const data = await response.json();
      setFullRequest(data);
      if (currentUser) {
        setPartnerName(determinePartnerName());
      }
    } catch (error) {
      console.error('Error fetching request details:', error);
      setError('Failed to load request details. Please try again later.');
    }
  };

  const determinePartnerName = () => {
    if (currentUser.role === 'ngo_worker') {
      return fullRequest.userId.name || 'Adopter';
    } else {
      return fullRequest.assignedWorker.name || 'NGO Worker';
    }
  };

  const fetchMessages = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/chat/requests/${requestId}/messages`, {
        headers: { 'x-auth-token': token }
      });
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      console.log('Fetched messages:', data);
      
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
      setError('Failed to load messages. Please try again later.');
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !fullRequest || !fullRequest._id || !currentUser) return;

    try {
      const senderId = currentUser.id;
      const senderRole = currentUser.role;
      
      let receiverId;
      if (senderRole === 'ngo_worker') {
        receiverId = fullRequest.userId?._id;
      } else {
        receiverId = fullRequest.assignedWorker?._id;
      }

      if (!receiverId) {
        console.error('Unable to determine receiver ID');
        setError('Unable to send message. Please try again later.');
        return;
      }

      const messageData = {
        requestId: fullRequest._id,
        senderId,
        receiverId,
        content: newMessage,
        senderRole
      };

      console.log('Sending message:', messageData);
      socketRef.current.emit('chat message', messageData);

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const isCurrentUserMessage = (message) => {
    if (!currentUser) return false;
    return message.senderId === currentUser.id || message.senderRole === currentUser.role;
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!fullRequest || !fullRequest._id) {
    return <div>Loading chat...</div>;
  }

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h3>Chat with {partnerName}</h3>
        <button className="close-button" onClick={onClose}>&times;</button>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${isCurrentUserMessage(message) ? 'user' : 'partner'}`}
          >
            <strong>{isCurrentUserMessage(message) ? 'You' : partnerName}:</strong> {message.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatBox;
