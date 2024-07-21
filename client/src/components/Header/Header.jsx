import React, { useState, useEffect } from "react";
import "./Header.css";
import logoImage from '../../assets/logo.png'
import { Link } from 'react-router-dom';
import hero from '../../assets/hero.png'
import Navbar from "../Navbar/Navbar";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <div className="header border">
        <Navbar/>
        <div className="main flex justify-around align-centre">
          <div className="">
            <h1 className="clr-dgrn font-medium">Adopt,</h1>
            <h2 className="text-7xl clr-dgrn">Don't Shop.</h2>
            <Link to="/adopt">
              <button className="px-3 py-1 bg-black rounded-3xl text-md w-28 mt-8 bg-gray-800 clr-lgrn text-lg w-40 nuni mb-24">
                Adopt now
              </button>
            </Link>
            
          </div>
          <div>
            <img className="hero" src={hero} alt="dog" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
