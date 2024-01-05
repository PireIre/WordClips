// src/components/VideoPlaceholder.js
import React from 'react';
import './VideoPlaceholder.css';
import blurredImage from '../assets/blurred.png';
import blurredImage2 from '../assets/blurred_2.png';
import notFoundImage from '../assets/404.png';
import notFoundImage2 from '../assets/404_2.png';

const displayedPlaceholderImage = {
  "/word-in-specific-youtube-video": {
    instructionImg: blurredImage2, 
    notFoundImg: notFoundImage2
  },
  "/word-in-random-youtube-video": {
    instructionImg: blurredImage, 
    notFoundImg: notFoundImage
  },
};

const VideoPlaceholder = ({ placeholderText }) => {

  const backgroundImage = placeholderText === '404' ? (displayedPlaceholderImage[location.pathname].notFoundImg) : (displayedPlaceholderImage[location.pathname].instructionImg);

  return (
    <div className="video-placeholder">
      <div
        className="video-image-placeholder"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
      </div>
    </div>
  );
};

export default VideoPlaceholder;
