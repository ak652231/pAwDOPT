import React from 'react';
import logoImage from '../../assets/logo.png';
import shelter from '../../assets/shelter.jpg';
import "./AboutS.css";
import Navbar from '../../components/Navbar/Navbar';

function AboutS() {
  return (
    <div className="about-page">
      <Navbar/>

      <div className='about-content'>
        <h1 className='nuni abouts-page-title'>About pAwDOPT</h1>
        
        <div className='text'>
          <div className='left'>
            <h2 className='nuni abouts-section-title'>Our Mission</h2>
            <p className='upper'>At pAwDOPT, we rescue and rehabilitate pets from various backgrounds, including strays, abandoned pets, and those surrendered by their owners. Our dedicated team of volunteers provides medical care, socialization, and training to ensure each pet is ready for their new home.</p>
            <p className='nuni'>"Our mission is to connect loving families with pets in need of a forever home. We believe that every pet deserves a second chance, and we are dedicated to making the adoption process smooth and enjoyable for both the animals and their new families."</p>
          </div>
          <div className='shelter'>
            <img className='rounded-lg mt-24' src={shelter} alt="Shelter" />
          </div>
        </div>

        <div className='flex justify-center'>
          <hr className="custom-hr" />
        </div>

        <h2 className='nuni abouts-section-title'>Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img className="mx-auto rounded-full mb-2" src="" alt="Thampi" width="150" height="150" />
            <h3 className="mb-0 member-name">Dr. Thampi Varghese</h3>
            <p className="nuni"><strong>Chief Veterinary Officer</strong></p>
            <p className='member-intro'>Dr. Thampi has over 15 years of experience in veterinary medicine and is passionate about animal welfare.</p>
          </div>
          <div className="team-member ">
            <img className="mx-auto rounded-full mb-2" src="" alt="James Anderson" width="150" height="150" />
            <h3 className="mb-0 member-name">James Anderson</h3>
            <p className="nuni"><strong>Volunteer Coordinator</strong></p>
            <p className='member-intro'>James manages our dedicated team of volunteers and ensures smooth operations at the shelter.</p>
          </div>
          <div className="team-member">
            <img className="mx-auto rounded-full mb-2" src="" alt="Anant Mishra" width="150" height="150" />
            <h3 className="mb-0 member-name">Anant Mishra</h3>
            <p className="nuni"><strong>Adoption Counselor</strong></p>
            <p className='member-intro'>Anant helps match pets with their perfect families and provides support throughout the adoption process.</p>
          </div>
        </div>

        <div className='flex justify-center'>
          <hr className="custom-hr" />
        </div>

        <h2 className='nuni abouts-section-title'>Our NGO</h2>
        <div className='ngo-info'>
          <p className='nuni'>pAwDOPT is a registered non-profit organization dedicated to animal welfare and pet adoption. Founded in 2015, we have successfully rehomed over 5,000 pets and provided care for countless more.</p>
          <p className='nuni'>Our services include:</p>
          <ul className='nuni'>
            <li>Pet rescue and rehabilitation</li>
            <li>Adoption services</li>
            <li>Veterinary care</li>
            <li>Community education on responsible pet ownership</li>
            <li>Spay and neuter programs</li>
          </ul>
          <p className='nuni'>We rely on the support of our community through donations, volunteering, and fostering to continue our mission of giving every pet a loving home.</p>
        </div>
      </div>
    </div>
  );
}

export default AboutS;