import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';


function Card({ source, header, para }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const entranceAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { tension: 200, friction: 20 },
  });

  const hoverClickAnimation = useSpring({
    transform: isClicked
      ? 'scale(0.95)'
      : isHovered
      ? 'scale(1.05)'
      : 'scale(1)',
    config: { tension: 200, friction: 10 },
  });

  return (
    <animated.div
      ref={ref}
      style={{ ...entranceAnimation, ...hoverClickAnimation }}
      className="cardw flex justify-center items-center w-full md:w-1/2 mt-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
    >
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-dgrn body-top p-4 mh-27 scrollable-content">
        <div>
          <img className="w-full rounded" src={source} alt="Card image cap" />
        </div>
        <div>
          <h1 className="nuni font-extrabold text-xl mt-2 clr-mgrn">{header}</h1>
          <p className="text-base clr-lgrn">{para}</p>
        </div>
      </div>
    </animated.div>
  );
}

export default Card;
