import React, { useEffect, useRef } from 'react';
import './SpotlightBackground.css';

const SpotlightBackground = () => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty('--x', `${e.clientX}px`);
        spotlightRef.current.style.setProperty('--y', `${e.clientY}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="background-base"></div>
      <div className="background" id="spotlight" ref={spotlightRef}></div>
    </>
  );
};

export default SpotlightBackground;
