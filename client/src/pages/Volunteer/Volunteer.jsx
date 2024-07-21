import React from 'react';
import logoImage from '../../assets/logo.png';
import "./Volunteer.css";
import Navbar from '../../components/Navbar/Navbar';

function VolunteerPage() {
  return (
    <div className="volunteer-page">
      <Navbar/>
      <div className='volunteer-content'>
        <h1 className='nuni volunteer-page-title'>Volunteer with Us</h1>
        
        

<div className='make-difference'>
  <h2 className='nuni difference-title'>Make a Difference</h2>
  <div className='difference-content'>
    <p className='nuni difference-item'><strong>Save Lives:</strong> Your time and effort directly contribute to saving and improving the lives of animals in need.</p>
    <p className='nuni difference-item'><strong>Build Skills:</strong> Gain valuable experience in animal care, event planning, and community outreach.</p>
    <p className='nuni difference-item'><strong>Create Connections:</strong> Meet like-minded individuals and form lasting bonds with both humans and animals.</p>
  </div>
  <p className='nuni quote'>"By giving your time and love, you can help create happy endings for animals waiting for their forever homes."</p>
</div>


        <div className='flex justify-center'>
          <hr className="custom-hr" />
        </div>

        <h2 className='nuni volunteer-section-title'>Volunteer Opportunities</h2>
        <div className='opportunities'>
          <div className="opportunity">
            <h3 className="nuni">Animal Care</h3>
            <p className='nuni'>Help with feeding, grooming, and socializing our animals.</p>
          </div>
          <div className="opportunity">
            <h3 className="nuni">Dog Walking</h3>
            <p className='nuni'>Take our dogs for walks and provide them with exercise and companionship.</p>
          </div>
          <div className="opportunity">
            <h3 className="nuni">Event Support</h3>
            <p className='nuni'>Assist with adoption events, fundraisers, and community outreach programs.</p>
          </div>
          <div className="opportunity">
            <h3 className="nuni">Administrative Help</h3>
            <p className='nuni'>Support our office staff with paperwork, data entry, and phone calls.</p>
          </div>
        </div>

        <div className='flex justify-center'>
          <hr className="custom-hr" />
        </div>

        <h2 className='nuni volunteer-section-title'>Volunteering Process</h2>
        <div className='volunteering-process'>
          <ol className='nuni process-list'>
            <li>Fill out our online volunteer application form</li>
            <li>Attend a volunteer orientation session</li>
            <li>Complete any necessary training for your chosen role</li>
            <li>Choose your volunteer schedule</li>
            <li>Start making a difference in the lives of animals!</li>
          </ol>
          <button className="volunteer-button nuni">Apply to Volunteer</button>
        </div>
      </div>
    </div>
  );
}

export default VolunteerPage;