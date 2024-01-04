// src/App.js
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import VideoPlayer from './components/VideoPlayer';
import CoffeeBanner from './components/CoffeeBanner';
import VideoPlaceholder from './components/VideoPlaceholder';
import Header from './components/Header';
import ArrowLeft from './components/ArrowLeft';
import ArrowRight from './components/ArrowRight';
import './App.css';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const WordInRandomYouTubeVideo = () => {
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [startTime, setStartTime] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [placeholderText, setPlaceholderText] = useState('Search for video');
  const [isLoading, setIsLoading] = useState(false);

const handleSearch = (searchTerm) => {
  setIsLoading(true);

  fetch(`http://localhost:3001/transcripts/search-word-in-random-video?term=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      setSearchResults(data);

      if (data.length > 0) {
        setCurrentClipIndex(0);
        setCurrentVideoId(data[0].videoId);
        setStartTime(data[0].start);
      } else {
        setPlaceholderText('404');
        setCurrentVideoId(null);
      }
    })
    .catch(error => console.error('Error fetching search results:', error))
    .finally(() => {
      setIsLoading(false);
    });
};
  

  const handleNavigateNext = () => {
    if (searchResults && currentClipIndex < searchResults.length - 1) {
      const nextIndex = currentClipIndex + 1;
      setCurrentClipIndex(nextIndex);
      setCurrentVideoId(searchResults[nextIndex].videoId);
      setStartTime(searchResults[nextIndex].start);
    }
  };

  const handleNavigatePrevious = () => {
    const newIndex = Math.max(currentClipIndex - 1, 0);
    setCurrentClipIndex(newIndex);
    setCurrentVideoId(searchResults[newIndex].videoId);
    setStartTime(searchResults[newIndex].start);
  };

  return (
    <>
      <div className="wordClips-main-content">
        <Header />
        <SearchBar onSearch={handleSearch} />
        <Row className="justify-content-center">
          <Col sm={1} xs={2} className="text-center">
            {(currentVideoId && currentClipIndex >= 1) && (
              <ArrowLeft clipIndex={currentClipIndex} onClick={handleNavigatePrevious} />
            )}
          </Col>
          <Col sm={10} xs={8} className="text-center">
            {isLoading ? (
              <div className="spinner-container">
                <FontAwesomeIcon icon={faSpinner} spin size="3x" color="#b02a37" />
              </div>
            ) : currentVideoId ? (
              <VideoPlayer
                videoId={currentVideoId}
                clipIndex={currentClipIndex}
                startTime={startTime[0]} // Pass the first start time
                searchResults={searchResults}
              />
            ) : (
              <VideoPlaceholder placeholderText={placeholderText} />
            )}
          </Col>
          <Col sm={1} xs={2} className="text-center">
            {
            ((currentVideoId && currentClipIndex >= 0) && (currentClipIndex + 1  !== searchResults.length ) ) && (
              <ArrowRight clipIndex={currentClipIndex} onClick={handleNavigateNext} />
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default WordInRandomYouTubeVideo;
