import React from 'react';
import process from '../../assets/process.png'; 
import "./ProcessS.css";
import Navbar from '../../components/Navbar/Navbar';

function ProcessS() {
  return (
    <div className="adoption-process-page">
      <Navbar/>
      <div className='adoption-process-content'>
        <h1 className='nuni page-title'>Our Adoption Process</h1>
        
        <div className='process-image'>
          <img src={process} alt="Happy family adopting a dog" className="rounded-lg" />
        </div>

        <div className='process-steps'>
          <h2 className='nuni section-title'>Steps to Adopt Your New Best Friend</h2>
          
          <div className='step'>
            <h3 className='nuni step-title'>1. Application Approval</h3>
            <p className='nuni'>Once your application is fully approved, you will be connected to an adoptions coordinator. As an approved adopter, you can email the adoptions coordinators at adoptions@lasthopek9.org any time you see a dog(s) you are interested in meeting.</p>
          </div>

          <div className='step'>
            <h3 className='nuni step-title'>2. Matching Process</h3>
            <p className='nuni'>If you are first in line and a good fit for a particular dog, the adoptions team will send a contract to put you in touch with the dog's foster family. You can then arrange a meet-and-greet.</p>
          </div>

          <div className='step'>
            <h3 className='nuni step-title'>3. Meet-and-Greet</h3>
            <p className='nuni'>Everyone living in your home must meet the dog prior to the adoption being finalized – this includes all adults, children, and other pets.</p>
          </div>

          <div className='step'>
            <h3 className='nuni step-title'>4. Finalization</h3>
            <p className='nuni'>The adoption process can take anywhere from a couple of weeks to upwards of a month. For dogs that have received a number of applications, it can take a little time for our adoption coordinators to sort through them all.</p>
          </div>
        </div>

        <div className='additional-info'>
          <h2 className='nuni section-title'>Important Information</h2>
          <ul className='nuni'>
            <li>Please remember that we are completely volunteer-run so all of this work is being done after the workday and on the weekends. We appreciate your patience as we help you find the perfect match!</li>
            <li>If the dog(s) you originally applied for is adopted by a family that applied or noted their interest prior to you, we would love to help you find another great pup.</li>
            <li>We transport approximately 25-30 dogs each week, so there's no shortage of dogs looking for families!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProcessS;