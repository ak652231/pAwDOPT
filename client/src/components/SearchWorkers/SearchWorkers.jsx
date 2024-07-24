import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import searchImg from '../../assets/search.svg'
import './SearchWorkers.css';

function SearchWorkers() {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/getusers');
        if (!response.ok) {
          throw new Error(`Failed to fetch workers: ${response.status}`);
        }
        const workersData = await response.json();
        setWorkers(Array.isArray(workersData) ? workersData : [workersData]);
      } catch (error) {
        console.error('Error fetching workers:', error);
      }
    };

    fetchWorkers();
  }, []);

  useEffect(() => {
    const filtered = workers.filter(worker =>
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) && worker.role === 'ngo_worker'
    );
    setIsSearching(true);
    setTimeout(() => {
      setFilteredWorkers(filtered);
      setIsSearching(false);
    }, 100);
  }, [searchTerm, workers]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  return (
    <div className="worker-search-page">
      <Navbar />
      <div className="worker-search-content">
        <h1 className="page-title">Manage Workers</h1>
        
        <div className="search-section flex align-center justify-center">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search workers by name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button className="search-button">
              <img className="search-img" src={searchImg} alt="" />
            </button>
          </div>
        </div>

        <div className="worker-list">
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map(worker => (
              <div 
                key={worker._id} 
                className={`worker-card ${isSearching ? 'fade-out' : 'fade-in'}`}
              >
                <h2 className="worker-name">{worker.name}</h2>
                <p className="worker-email">Email: {worker.email}</p>
                <p className="worker-age">Age: {worker.age}</p>
                <p className="worker-gender">Gender: {worker.gender}</p>
                <button className="view-details-button">
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p>No workers found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchWorkers;