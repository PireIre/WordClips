// ArrowRight.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Arrow.css';

const ArrowRight = ({ onClick }) => {
  return (
    <div className="wordClips-arrow" onClick={onClick}>
      <FontAwesomeIcon icon={faArrowRight}/>
    </div>
  );
};

export default ArrowRight;
