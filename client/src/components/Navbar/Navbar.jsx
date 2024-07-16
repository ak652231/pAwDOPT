import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/logo.png';
import './Navbar.css';

function Navbar() {
  

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
      <Link to="/signup">
              <button className="sign-up-btn clr-lgrn mr-2.5 font-bold text-md w-28 nuni">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="log-in-btn px-3 py-1 rounded text-md w-28 bg-lgrn clr-dgrn font-bold nuni">Log In</button>
            </Link>
      </div>
    </nav>
  );
}

export default Navbar;
