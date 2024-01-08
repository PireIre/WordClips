import React from 'react';
import './TimestampBar.css';

const TimestampBar = ({ timestamps, setStartTime, startTime }) => {
 const formatTime = (offset) => {
     const hours = Math.floor(offset / 3600);
     const minutes = Math.floor((offset % 3600) / 60);
     const seconds = offset % 60;
     return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
   };
   
  const handleClick = (timestamp) => {
    setStartTime(timestamp.offset);
  };

  return (
    <div className="timestamp-bar">
      <div className="scroll-indicator">
        <i className="fas fa-chevron-right"></i>
      </div>
      {timestamps.map((timestamp, index) => (
        <div
          key={index}
          className={`timestamp-card ${timestamp.offset === startTime ? 'selected' : ''}`}
          onClick={() => handleClick(timestamp)}
        >
          {formatTime(timestamp.offset)}
        </div>
      ))}
    </div>
  );
};

export default TimestampBar;
