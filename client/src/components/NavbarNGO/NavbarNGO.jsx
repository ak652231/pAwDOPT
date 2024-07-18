import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../../assets/logo.png';

function NavbarNGO() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };


  return (
    <nav className="navbar bg-dgrn rounded">
      <div className="navbar-left">
        <img src={logoImage} alt="Logo" className="logo" />
        <span className="logo-text clr-lgrn text-lg">pAwDOPT</span>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li><Link className="font-medium text-md clr-lgrn nuni" to="/ngo/dashboard">Dashboard</Link></li>
          <li><Link className="font-medium text-md clr-lgrn nuni" to="/adoption-requests">Adoption Requests</Link></li>
          <li><Link className="font-medium text-md clr-lgrn nuni" to="/ngo/volunteer-requests">Volunteer Requests</Link></li>
          <li><Link className="font-medium text-md clr-lgrn nuni" to="/manage-pets">Manage Pets</Link></li>
        </ul>
      </div>
      <div className="navbar-right">
      <Link to="/logout">
          <button 
            onClick={handleLogout} 
            className="log-out-btn px-3 py-1 rounded text-md w-28 bg-lgrn clr-dgrn font-bold nuni"
          >
            Log Out
          </button>
          </Link>
      </div>
    </nav>
  );
}

export default NavbarNGO;