// ArrowLeft.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Arrow.css';

const ArrowLeft = ({ onClick }) => {
  return (
    <div className="wordClips-arrow" onClick={onClick}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </div>
  );
};

export default ArrowLeft;
