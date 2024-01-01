// src/components/VideoPlayer.js
import React, { useRef, useState, useEffect } from 'react';
import './VideoPlayer.css';
import blurredImage from '../assets/blurred.png';


const VideoPlayer = ({ videoId, startTime, searchResults, clipIndex }) => {
  const playerRef = useRef(null);

  return (
    <div>
      <iframe
        ref={playerRef}
        title="Video Snippet"
        width="800"
        height="450"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&start=${startTime}&fs=0&rel=0&controls=1`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
