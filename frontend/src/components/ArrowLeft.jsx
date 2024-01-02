// ArrowLeft.jsx
import React from 'react';
import leftArrowImage from '../assets/arrow-left.png';
import './ArrowLeft.css'

const ArrowLeft = ({ onClick }) => {
  return (
    <div className="arrow-left" onClick={onClick}>
      <img src={leftArrowImage} alt="Left Arrow" />
    </div>
  );
};

export default ArrowLeft;
