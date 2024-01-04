// src/components/VideoPlaceholder.js
import React from 'react';
import './VideoPlaceholder.css';
import blurredImage from '../assets/blurred.png';
import blurredImage2 from '../assets/blurred_2.png';
import notFoundImage from '../assets/404.png';

const displayedPlaceholderImage = {
  "/word-in-specific-youtube-video": blurredImage2,
  "/word-in-random-youtube-video": blurredImage
};

const VideoPlaceholder = ({ placeholderText }) => {

  const backgroundImage = placeholderText === '404' ? notFoundImage : (displayedPlaceholderImage[location.pathname]);

  return (
    <div
      className="video-placeholder"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
    </div>
  );
};

export default VideoPlaceholder;
