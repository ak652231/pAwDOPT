import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../../assets/logo.png';
import profile from '../../assets/profile.png';
import './Navbar.css';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isNGOWorker, setIsNGOWorker] = useState(false);
  const [isNGOAdmin, setIsNGOAdmin] = useState(false);

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
      {(!isNGOWorker && !isNGOAdmin) ?
        <div className="navbar-center">
          <ul className="nav-links">
            <li><Link className="font-medium text-md clr-lgrn nuni" to="/">Home</Link></li>
            <li><Link className="font-medium text-md clr-lgrn nuni" to="/about">About</Link></li>
            <li><Link className="font-medium text-md clr-lgrn nuni" to="/adopt">Adopt</Link></li>
            <li><Link className="font-medium text-md clr-lgrn nuni" to="/volunteer">Volunteer</Link></li>
            <li><Link className="font-medium text-md clr-lgrn nuni" to="/donate">Donate</Link></li>
          </ul>
        </div> :
        <div className="navbar-center">
          <ul className="nav-links">
            <li><Link className="font-medium text-md clr-lgrn nuni" to="/homengo">Dashboard</Link></li>
            <li><Link className="font-medium text-md clr-lgrn nuni" to="/adoption-requests">Adoption Requests</Link></li>
            {isNGOAdmin ?
              <>
                <li><Link className="font-medium text-md clr-lgrn nuni" to="/volunteer-requests">Volunteer Requests</Link></li>
                <li><Link className="font-medium text-md clr-lgrn nuni" to="/manage-workers">Workers</Link></li>
              </>

              :
              <li><Link className="font-medium text-md clr-lgrn nuni" to="/manage-pets">Manage Pets</Link></li>}
          </ul>
        </div>
      }

      <div className="navbar-right">
        {!token ? (
          <>
            <Link to="/signup" className="mr-2.5">
              <button className="auth sign-up-btn clr-lgrn font-bold text-md nuni">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="auth log-in-btn nuni">Log In</button>
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
                {!isNGOWorker && !isNGOAdmin && (
                  <Link to="/myReq" className="dropdown-item">Your Requests</Link>
                )}

                <Link onClick={handleLogout} to="/" className="dropdown-item logout">Log Out</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;