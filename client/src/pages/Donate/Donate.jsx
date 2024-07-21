import React from 'react';
import logoImage from '../../assets/logo.png';
import donateImage from '../../assets/shelter.jpg'; 
import "./Donate.css";
import Navbar from '../../components/Navbar/Navbar';

function Donate() {
  return (
    <div className="donate-page">
      <Navbar/>

      <div className='donate-content'>
        <h1 className='nuni donate-page-title'>Support Our Cause</h1>
        
        <div className='donate-intro'>
          <div className='donate-text'>
            <h2 className='nuni donate-section-title'>Your Donation Makes a Difference</h2>
            <p className='nuni'>Every contribution, no matter how small, helps us continue our mission of rescuing and rehoming pets in need. Your generosity directly supports animal care, medical treatments, and our adoption programs.</p>
            <p className='nuni donate-quote'>"The greatness of a nation and its moral progress can be judged by the way its animals are treated." - Mahatma Gandhi</p>
          </div>
          <div className='donate-image'>
            <img className='rounded-lg' src={donateImage} alt="Happy rescued pets" />
          </div>
        </div>

        <div className='flex justify-center'>
          <hr className="custom-hr" />
        </div>

        <h2 className='nuni donate-section-title'>Ways to Donate</h2>
        <div className='donation-options'>
          <div className="donation-option">
            <h3 className="nuni">One-Time Donation</h3>
            <p className='nuni'>Make a single donation to support our immediate needs.</p>
            <button className="donate-button nuni">Donate Now</button>
          </div>
          <div className="donation-option">
            <h3 className="nuni">Monthly Giving</h3>
            <p className='nuni'>Become a sustaining donor with a monthly contribution.</p>
            <button className="donate-button nuni">Start Monthly Giving</button>
          </div>
          <div className="donation-option">
            <h3 className="nuni">Corporate Sponsorship</h3>
            <p className='nuni'>Partner with us to make a lasting impact.</p>
            <button className="donate-button nuni">Contact Us</button>
          </div>
        </div>

        <div className='flex justify-center'>
          <hr className="custom-hr" />
        </div>

        <h2 className='nuni donate-section-title'>Your Impact</h2>
        <div className='impact-section'>
          <div className='impact-item'>
            <h3 className='nuni'>₹300</h3>
            <p className='nuni'>Provides food for one pet for a month</p>
          </div>
          <div className='impact-item'>
            <h3 className='nuni'>₹1500</h3>
            <p className='nuni'>Covers basic medical care for a rescued animal</p>
          </div>
          <div className='impact-item'>
            <h3 className='nuni'>₹5000</h3>
            <p className='nuni'>Supports our spay/neuter program</p>
          </div>
          <div className='impact-item'>
            <h3 className='nuni'>₹10000</h3>
            <p className='nuni'>Funds emergency medical treatments</p>
          </div>
        </div>

        <div className='other-ways'>
          <h2 className='nuni donate-section-title'>Other Ways to Help</h2>
          <ul className='nuni'>
            <li>Volunteer your time at our shelter</li>
            <li>Foster a pet in need</li>
            <li>Donate supplies from our wishlist</li>
            <li>Spread the word about our mission on social media</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Donate;