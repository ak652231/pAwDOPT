import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/NavbarNGO/NavbarNGO';
import './HeaderNGO.css';

function HeaderNGO() {
  return (
    <div className="ngo-worker-home">
      <Navbar />
      <div className="ngo-worker-content">
        <h1 className="page-title">Welcome, NGO Worker!</h1>
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
          <div className="dashboard-card">
            <h2 className="card-title">Manage Pets</h2>
            <p className="card-description">Add, update, or remove pets from the database</p>
            <Link to="/manage-pets">
              <button className="card-button">Manage Pets</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderNGO;