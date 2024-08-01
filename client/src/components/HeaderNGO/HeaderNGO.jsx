import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import ChatList from '../../components/ChatList/ChatList';
import './HeaderNGO.css';

function HeaderNGO() {
  const [isNGOWorker, setIsNGOWorker] = useState(false);
  const [isNGOAdmin, setIsNGOAdmin] = useState(false);
  const [showChatList, setShowChatList] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const user = decodedToken.user;
      if (user && (user.email.endsWith('@ngo.com') || user.role === 'ngo_worker')) {
        setIsNGOWorker(true);
      } else if (user && (user.email.endsWith('@ngoAdmin.com') || user.role === 'ngo_admin')) {
        setIsNGOAdmin(true);
      }
    }
  }, []);

  const toggleChatList = () => {
    setShowChatList(!showChatList);
  };

  return (
    <div className={`ngo-worker-home ${showChatList ? 'chat-open' : ''}`}>
      <Navbar />
      <div className="ngo-worker-content">
        <h1 className="page-title">Welcome, {isNGOWorker ? 'NGO Worker!' : 'Admin!'}</h1>
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2 className="card-title">Adoption Requests</h2>
            <p className="card-description">Review and manage adoption applications</p>
            <Link to="/adoption-requests">
              <button className="card-button">View Requests</button>
            </Link>
          </div>
          <div className="dashboard-card">
            <h2 className="card-title">Volunteer Requests</h2>
            <p className="card-description">Manage volunteer applications and schedules</p>
            <Link to="/volunteer-requests">
              <button className="card-button">View Requests</button>
            </Link>
          </div>
          {isNGOWorker ? (
            <div className="dashboard-card">
              <h2 className="card-title">Manage Pets</h2>
              <p className="card-description">Add, update, or remove pets from the database</p>
              <Link to="/manage-pets">
                <button className="card-button">Manage Pets</button>
              </Link>
            </div>
          ) : (
            <div className="dashboard-card">
              <h2 className="card-title">Manage Workers</h2>
              <p className="card-description">Keep an eye on activity of workers</p>
              <Link to="/manage-workers">
                <button className="card-button">Manage Workers</button>
              </Link>
            </div>
          )}
          {isNGOWorker && (
            <div className="dashboard-card chat-card">
              <h2 className="card-title">Messages</h2>
              <button className="chat-button" onClick={toggleChatList}>
                <i className="fas fa-comments"></i>
              </button>
            </div>
          )}
        </div>
      </div>
      {showChatList && (
        <div className="chat-list-overlay">
          <ChatList onClose={toggleChatList} />
        </div>
      )}
    </div>
  );
}

export default HeaderNGO;