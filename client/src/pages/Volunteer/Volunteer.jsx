import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '../../components/Navbar/Navbar';
import "./Volunteer.css";

function AnimatedSection({ children, variants }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } }
};

const slideIn = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
};

const popUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
};
const landIn = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};
function VolunteerPage() {
  return (
    <div className="volunteer-page">
      <Navbar/>
      <div className='volunteer-content'>
        <h1 className='nuni volunteer-page-title'>Volunteer with Us</h1>

        <AnimatedSection variants={fadeIn}>
          <div className='make-difference'>
            <h2 className='nuni difference-title'>Make a Difference</h2>
            <div className='difference-content'>
              <AnimatedSection variants={slideIn}>
                <p className='nuni difference-item'>
                  <strong>Save Lives:</strong> Your time and effort directly contribute to saving and improving the lives of animals in need.
                </p>
              </AnimatedSection>
              <AnimatedSection variants={slideIn}>
                <p className='nuni difference-item'>
                  <strong>Build Skills:</strong> Gain valuable experience in animal care, event planning, and community outreach.
                </p>
              </AnimatedSection>
              <AnimatedSection variants={slideIn}>
                <p className='nuni difference-item'>
                  <strong>Create Connections:</strong> Meet like-minded individuals and form lasting bonds with both humans and animals.
                </p>
              </AnimatedSection>
            </div>
            <AnimatedSection variants={scaleIn}>
              <p className='nuni quote'>
                "By giving your time and love, you can help create happy endings for animals waiting for their forever homes."
              </p>
            </AnimatedSection>
          </div>
        </AnimatedSection>

        <h2 className='nuni volunteer-section-title'>Volunteer Opportunities</h2>


<motion.div 
  className='opportunities'
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  }}
  initial="hidden"
  animate="visible"
>
  <motion.div className="opportunity" variants={landIn}>
    <h3 className="nuni">Animal Care</h3>
    <p className='nuni'>Help with feeding, grooming, and socializing our animals.</p>
  </motion.div>
  <motion.div className="opportunity" variants={landIn}>
    <h3 className="nuni">Dog Walking</h3>
    <p className='nuni'>Take our dogs for walks and provide them with exercise and companionship.</p>
  </motion.div>
  <motion.div className="opportunity" variants={landIn}>
    <h3 className="nuni">Event Support</h3>
    <p className='nuni'>Assist with adoption events, fundraisers, and community outreach programs.</p>
  </motion.div>
  <motion.div className="opportunity" variants={landIn}>
    <h3 className="nuni">Administrative Help</h3>
    <p className='nuni'>Support our office staff with paperwork, data entry, and phone calls.</p>
  </motion.div>
</motion.div>

          <h2 className='nuni volunteer-section-title opportunities-title'>Volunteering Process</h2>
        
        <div className='volunteering-process'>
          <AnimatedSection variants={slideIn}>
            <ol className='nuni process-list'>
              <li>Fill out our online volunteer application form</li>
              <li>Attend a volunteer orientation session</li>
              <li>Complete any necessary training for your chosen role</li>
              <li>Choose your volunteer schedule</li>
              <li>Start making a difference in the lives of animals!</li>
            </ol>
          </AnimatedSection>
          <AnimatedSection variants={popUp}>
            <button className="volunteer-button nuni">Apply to Volunteer</button>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}

export default VolunteerPage;
