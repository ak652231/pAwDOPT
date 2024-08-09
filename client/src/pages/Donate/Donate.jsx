import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import donate from '../../assets/donate.avif'; 
import "./Donate.css";
import Navbar from '../../components/Navbar/Navbar';

const FadeInWhenVisible = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

const popUpVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1 }
};

const slideInVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

function Donate() {
  return (
    <div className="donate-page">
      <Navbar/>

      <div className='donate-content'>
        <h1 className='nuni donate-page-title'>Support Our Cause</h1>
        
        <FadeInWhenVisible>
          <div className='donate-intro'>
            <div className='donate-text'>
              <h2 className='nuni donate-section-title'>Your Donation Makes a Difference</h2>
              <p className='nuni'>Every contribution, no matter how small, helps us continue our mission of rescuing and rehoming pets in need. Your generosity directly supports animal care, medical treatments, and our adoption programs.</p>
              <p className='nuni donate-quote'>"The greatness of a nation and its moral progress can be judged by the way its animals are treated." - Mahatma Gandhi</p>
            </div>
            <div className='donate-image'>
              <img className='rounded-lg' src={donate} alt="Happy rescued pets" />
            </div>
          </div>
        </FadeInWhenVisible>

        <div className='flex justify-center'>
          <hr className="custom-hr" />
        </div>

        <h2 className='nuni donate-section-title'>Ways to Donate</h2>
        <motion.div 
          className='donation-options'
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {['One-Time Donation', 'Monthly Giving', 'Corporate Sponsorship'].map((option, index) => (
            <motion.div key={index} className="donation-option" variants={popUpVariants}>
              <h3 className="nuni">{option}</h3>
              <p className='nuni'>{getOptionDescription(option)}</p>
              <button className="donate-button nuni">{getButtonText(option)}</button>
            </motion.div>
          ))}
        </motion.div>

        <div className='flex justify-center'>
          <hr className="custom-hr" />
        </div>

        <h2 className='nuni donate-section-title'>Your Impact</h2>
        <motion.div 
          className='impact-section'
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            { amount: '₹300', description: 'Provides food for one pet for a month' },
            { amount: '₹1500', description: 'Covers basic medical care for a rescued animal' },
            { amount: '₹5000', description: 'Supports our spay/neuter program' },
            { amount: '₹10000', description: 'Funds emergency medical treatments' }
          ].map((item, index) => (
            <motion.div key={index} className='impact-item' variants={slideInVariants}>
              <h3 className='nuni'>{item.amount}</h3>
              <p className='nuni'>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <FadeInWhenVisible>
          <div className='other-ways'>
            <h2 className='nuni donate-section-title'>Other Ways to Help</h2>
            <ul className='nuni'>
              <li>Volunteer your time at our shelter</li>
              <li>Foster a pet in need</li>
              <li>Donate supplies from our wishlist</li>
              <li>Spread the word about our mission on social media</li>
            </ul>
          </div>
        </FadeInWhenVisible>
      </div>
    </div>
  );
}

function getOptionDescription(option) {
  switch (option) {
    case 'One-Time Donation':
      return 'Make a single donation to support our immediate needs.';
    case 'Monthly Giving':
      return 'Become a sustaining donor with a monthly contribution.';
    case 'Corporate Sponsorship':
      return 'Partner with us to make a lasting impact.';
    default:
      return '';
  }
}

function getButtonText(option) {
  switch (option) {
    case 'One-Time Donation':
      return 'Donate Now';
    case 'Monthly Giving':
      return 'Start Monthly Giving';
    case 'Corporate Sponsorship':
      return 'Contact Us';
    default:
      return 'Learn More';
  }
}

export default Donate;