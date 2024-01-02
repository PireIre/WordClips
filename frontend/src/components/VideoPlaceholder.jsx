// src/components/VideoPlaceholder.js
import React from 'react';
import './VideoPlaceholder.css';
import blurredImage from '../assets/blurred.png';
import notFoundImage from '../assets/404.png';

const VideoPlaceholder = ({ placeholderText }) => {
  const backgroundImage = placeholderText === '404' ? notFoundImage : blurredImage;

  return (
    <div
      className="video-placeholder"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
    </div>
  );
};

export default VideoPlaceholder;
