import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../../assets/logo.png';
import profile from '../../assets/profile.png';
import './Navbar.css';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar bg-dgrn rounded">
      <div className="navbar-left">
        <img src={logoImage} alt="Logo" className="logo" />
        <span className="logo-text clr-lgrn text-lg">pAwDOPT</span>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li><Link className="font-medium text-md clr-lgrn nuni" to="/">Home</Link></li>
          <li><Link className="font-medium text-md clr-lgrn nuni" to="/about">About</Link></li>
          <li><Link className="font-medium text-md clr-lgrn nuni" to="/adopt">Adopt</Link></li>
          <li><Link className="font-medium text-md clr-lgrn nuni" to="/volunteer">Volunteer</Link></li>
          <li><Link className="font-medium text-md clr-lgrn nuni" to="/donate">Donate</Link></li>
        </ul>
      </div>
      <div className="navbar-right">
        {!token ? (
          <>
            <Link to="/signup">
              <button className="auth sign-up-btn clr-lgrn mr-2.5 font-bold text-md w-28 nuni">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="auth log-in-btn px-3 py-1 rounded text-md w-28 bg-lgrn clr-dgrn font-bold nuni">Log In</button>
            </Link>
          </>
        ) : (
          <div className="profile-container">
            <button className="profile-btn" onClick={toggleDropdown}>
              <img src={profile} alt="Profile" className="profile-image" />
            </button>
            {isDropdownOpen && (
              <div className="profile-dropdown">
                <Link to="/user-profile" className="dropdown-item">Your Profile</Link>
                <Link to="/myReq" className="dropdown-item">Your Requests</Link>
                <Link onClick={handleLogout} className="dropdown-item logout">Log Out</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;