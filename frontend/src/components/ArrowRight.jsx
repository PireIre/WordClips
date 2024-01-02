// ArrowRight.jsx
import React from 'react';
import rightArrowImage from '../assets/arrow-right.png';
import './ArrowRight.css'


const ArrowRight = ({ onClick }) => {
  return (
    <div className="arrow-right" onClick={onClick}>
      <img src={rightArrowImage} alt="Right Arrow" />
    </div>
  );
};

export default ArrowRight;
