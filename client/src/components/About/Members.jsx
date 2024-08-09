import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import "./About.css";

function Members({ name, position, style }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const animation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'scale(1)' : 'scale(0)',
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div ref={ref} style={{ ...animation, ...style }} className="mame w-full lg:w-1/3 mb-4">
      <img className="mx-auto rounded-full mb-2" src="" alt="" width="150" height="150" />
      <h5 className="mame mb-0">{name}</h5>
      <p className="nuni"><strong>{position}</strong></p>
    </animated.div>
  );
}

export default Members;