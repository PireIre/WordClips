// VideoPlayer.js
import React, { useRef, useState, useEffect } from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ videoId, startTime, searchResults, clipIndex }) => {
  const playerRef = useRef(null);

  return (
    <div className="video-player-container">
      <iframe
        ref={playerRef}
        className="video-player"
        title="Video Snippet"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&start=${startTime}&fs=0&rel=0&controls=1`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
