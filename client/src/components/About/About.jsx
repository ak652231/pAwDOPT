import React from 'react';
import { useSpring, animated, useTrail } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import "./About.css";
import profile1 from '../../assets/profile1.jpg';
import profile2 from '../../assets/profile2.webp';
import profile3 from '../../assets/profile3.png';
import shelter from '../../assets/shelter.jpg';

const AnimatedSection = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const animation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div ref={ref} style={animation}>
      {children}
    </animated.div>
  );
};

function Members({ name, position, style ,image}) {
  return (
    <animated.div style={style} className="w-full lg:w-1/3 mb-4">
      <img src={image} className="mx-auto rounded-full mb-2" alt="" width="200" height="200" />
      <h5 className="mb-0">{name}</h5>
      <p className="nuni"><strong>{position}</strong></p>
    </animated.div>
  );
}

function About() {
  const titleAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 200, friction: 20 },
  });

  const imageAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { tension: 200, friction: 20 },
  });

  const [membersRef, membersInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const teamMembers = [
    { name: "Thampi", position: "Chief Veterinary Officer" ,image:profile1},
    { name: "James Anderson", position: "Volunteer Coordinator" ,image:profile2},
    { name: "Anant Mishra", position: "Adoption Counselor" ,image:profile3},
  ];

  const trail = useTrail(teamMembers.length, {
    config: { tension: 200, friction: 20 },
    opacity: membersInView ? 1 : 0,
    transform: membersInView ? 'scale(1)' : 'scale(0)',
    from: { opacity: 0, transform: 'scale(0)' },
  });

  return (
    <div className='about'>
      <div className='text'>
        <div className='left'>
          <animated.h1 style={titleAnimation} className='nuni'>About us</animated.h1>
          <AnimatedSection>
            <p className='upper'>At pAwDOPT, we rescue and rehabilitate pets from various backgrounds, including strays, abandoned pets, and those surrendered by their owners. Our dedicated team of volunteers provides medical care, socialization, and training to ensure each pet is ready for their new home.</p>
          </AnimatedSection>
          <AnimatedSection>
            <p className='nuni abt'>"Our mission is to connect loving families with pets in need of a forever home. We believe that every pet deserves a second chance, and we are dedicated to making the adoption process smooth and enjoyable for both the animals and their new families."</p>
          </AnimatedSection>
        </div>
        <div className='shelter'>
          <animated.img style={imageAnimation} className='rounded-lg' src={shelter} alt="Team" />
        </div>
      </div>
      <div className='flex justify-center'>
        <hr className="custom-hr" />
      </div>

      <AnimatedSection>
        <h1 className='nuni meet'>Meet our team</h1>
        <div ref={membersRef} className="flex flex-wrap justify-between text-center mt-5">
          {trail.map((props, index) => (
            <Members
              key={teamMembers[index].name}
              name={teamMembers[index].name}
              position={teamMembers[index].position}
              image={teamMembers[index].image}
              style={props}
            />
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}

export default About;