import React, { useState ,useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import EventMessage from '../../components/EventMessage/EventMessage';
import './AdForm.css';

const SUCCESS_MESSAGE = "Form submitted successfully! You will receive a confirmation SMS shortly.";
const LOGIN_REQUIRED_MESSAGE = "Please login before raising an adoption request.";
const FORM_SUBMISSION_ERROR_MESSAGE = "An error occurred while submitting the form. Please try again.";

function AdForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [eventMessage, setEventMessage] = useState({ message: '', status: '', isOpen: false });
  const [formData, setFormData] = useState({
    userId: '',
    petId: id,
    hoursAlone: '',
    householdAgreement: '',
    petLocation: '',
    regularCare: '',
    currentPets: '',
    currentPetsComfort: '',
    aggressiveBehavior: '',
    trainingAccidents: '',
    homeSpace: '',
    financialPreparation: '',
    lifetimeCommitment: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setEventMessage({ message: LOGIN_REQUIRED_MESSAGE, status: 'Error!', isOpen: true });
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/forms/', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      const smsResponse = await fetch('http://localhost:5000/api/sms/send-adoption-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({
          petId: id
        }),
      });
      
      if (!smsResponse.ok) {
        console.error('Failed to send SMS');
      }
  
      setEventMessage({ message: SUCCESS_MESSAGE, status: 'Success!', isOpen: true });
      setFormData({
        hoursAlone: '',
        householdAgreement: '',
        petLocation: '',
        regularCare: '',
        currentPets: '',
        currentPetsComfort: '',
        aggressiveBehavior: '',
        trainingAccidents: '',
        homeSpace: '',
        financialPreparation: '',
        lifetimeCommitment: '',
        petId: id
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setEventMessage({ message: FORM_SUBMISSION_ERROR_MESSAGE , status: 'Error!', isOpen: true ,});
    }finally {
      setIsSubmitting(false);
    }

  };

  const handleCloseMessage = () => {
    setEventMessage({ ...eventMessage, isOpen: false });
    if (eventMessage.status === 'Success!' ) {
      navigate('/');
    }
    else{
      navigate('/login');
    }
  };

  return (
    <div className="adoption-form-container">
      <h1>Pet Adoption Questionnaire</h1>
      <form onSubmit={handleSubmit} className="adoption-form">
        <div className="form-group">
          <label htmlFor="hoursAlone">How many hours per day will the pet be alone?</label>
          <input
            type="text"
            id="hoursAlone"
            name="hoursAlone"
            value={formData.hoursAlone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="householdAgreement">Are all members of your household okay with getting a pet?</label>
          <select
            id="householdAgreement"
            name="householdAgreement"
            value={formData.householdAgreement}
            onChange={handleInputChange}
            required
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="petLocation">Will the pet stay inside or outside your home mostly?</label>
          <select
            id="petLocation"
            name="petLocation"
            value={formData.petLocation}
            onChange={handleInputChange}
            required
          >
            <option value="">Select an option</option>
            <option value="inside">Inside</option>
            <option value="outside">Outside</option>
            <option value="both">Both</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="regularCare">Are you ready to feed and groom the pet regularly?</label>
          <select
            id="regularCare"
            name="regularCare"
            value={formData.regularCare}
            onChange={handleInputChange}
            required
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="currentPets">What pets currently live in your home?</label>
          <textarea
            id="currentPets"
            name="currentPets"
            value={formData.currentPets}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="currentPetsComfort">Are your current pets comfortable with new pets in the house?</label>
          <select
            id="currentPetsComfort"
            name="currentPetsComfort"
            value={formData.currentPetsComfort}
            onChange={handleInputChange}
            required
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="unsure">Unsure</option>
            <option value="noCurrentPets">No current pets</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="aggressiveBehavior">How will you handle any aggressive behavior from the pet?</label>
          <textarea
            id="aggressiveBehavior"
            name="aggressiveBehavior"
            value={formData.aggressiveBehavior}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="trainingAccidents">How will you handle accidents (like peeing or pooping indoors) before the pet is fully trained?</label>
          <textarea
            id="trainingAccidents"
            name="trainingAccidents"
            value={formData.trainingAccidents}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="homeSpace">Do you have enough space in your home for the pet?</label>
          <select
            id="homeSpace"
            name="homeSpace"
            value={formData.homeSpace}
            onChange={handleInputChange}
            required
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="unsure">Unsure</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="financialPreparation">Are you financially prepared for pet food, supplies, and vet bills?</label>
          <select
            id="financialPreparation"
            name="financialPreparation"
            value={formData.financialPreparation}
            onChange={handleInputChange}
            required
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="unsure">Unsure</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="lifetimeCommitment">Are you committed to caring for the pet for its whole life?</label>
          <select
            id="lifetimeCommitment"
            name="lifetimeCommitment"
            value={formData.lifetimeCommitment}
            onChange={handleInputChange}
            required
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="unsure">Unsure</option>
          </select>
        </div>

        <button 
  type="submit" 
  className="submit-button" 
  disabled={isSubmitting}
>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</button>
      </form>
      <EventMessage 
        isOpen={eventMessage.isOpen} 
        onClose={handleCloseMessage}
        message={eventMessage.message}
        statuss={eventMessage.status}
        buttonText={eventMessage.status === 'Success!' ? 'Home' : 'Close'}
      />
    </div>
  );
}

export default AdForm;
