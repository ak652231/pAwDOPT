import React, { useEffect, useRef } from 'react';
import shelter from '../../assets/shelter.jpg';
import "./AboutS.css";
import Navbar from '../../components/Navbar/Navbar';
import profile1 from '../../assets/profile1.jpg';
import profile2 from '../../assets/profile2.webp';
import profile3 from '../../assets/profile3.png';

function AboutS() {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('team-member')) {
            entry.target.classList.add('animate');
          } else {
            entry.target.classList.add('fade-in');
          }
          observerRef.current.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll, .team-member').forEach(el => {
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="about-page">
      <Navbar/>

      <div className='about-content'>
        <h1 className='nuni abouts-page-title '>About pAwDOPT</h1>
        
        <div className='text'>
          <div className='left animate-on-scroll slide-in-left'>
            <h2 className='nuni abouts-section-title'>Our Mission</h2>
            <p className='upper'>At pAwDOPT, we rescue and rehabilitate pets from various backgrounds, including strays, abandoned pets, and those surrendered by their owners. Our dedicated team of volunteers provides medical care, socialization, and training to ensure each pet is ready for their new home.</p>
            <p className='nuni'>"Our mission is to connect loving families with pets in need of a forever home. We believe that every pet deserves a second chance, and we are dedicated to making the adoption process smooth and enjoyable for both the animals and their new families."</p>
          </div>
          <div className='shelter animate-on-scroll slide-in-right'>
            <img className='rounded-lg' src={shelter} alt="Shelter" />
          </div>
        </div>

        <div className='flex justify-center'>
          <hr className="custom-hr" />
        </div>

        <h2 className='nuni abouts-section-title'>Meet Our Team</h2>
        <div className="team-members">
          {[
            { name: "Dr. Thampi Varghese", role: "Chief Veterinary Officer", description: "Dr. Thampi has over 15 years of experience in veterinary medicine and is passionate about animal welfare." ,image:profile1},
            { name: "James Anderson", role: "Volunteer Coordinator", description: "James manages our dedicated team of volunteers and ensures smooth operations at the shelter.",image:profile2 },
            { name: "Anant Mishra", role: "Adoption Counselor", description: "Anant helps match pets with their perfect families and provides support throughout the adoption process.",image:profile3 }
          ].map((member, index) => (
            <div key={index} className="team-member">
              <img className="mx-auto rounded-full mb-2" src={member.image} alt={member.name} width="200" height="200" />
              <h3 className="mb-0 member-name">{member.name}</h3>
              <p className="nuni"><strong>{member.role}</strong></p>
              <p className='member-intro'>{member.description}</p>
            </div>
          ))}
        </div>

        <div className='flex justify-center'>
          <hr className="custom-hr" />
        </div>

        <h2 className='nuni abouts-section-title '>Our NGO</h2>
        <div className='ngo-info animate-on-scroll slide-in-left'>
          <p className='nuni'>pAwDOPT is a registered non-profit organization dedicated to animal welfare and pet adoption. Founded in 2015, we have successfully rehomed over 5,000 pets and provided care for countless more.</p>
          <p className='nuni'>Our services include:</p>
          <ul className='nuni'>
            {[
              "Pet rescue and rehabilitation",
              "Adoption services",
              "Veterinary care",
              "Community education on responsible pet ownership",
              "Spay and neuter programs"
            ].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className='nuni'>We rely on the support of our community through donations, volunteering, and fostering to continue our mission of giving every pet a loving home.</p>
        </div>
      </div>
    </div>
  );
}

export default AboutS;