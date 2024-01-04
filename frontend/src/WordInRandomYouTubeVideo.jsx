// src/App.js
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import VideoPlayer from './components/VideoPlayer';
import CoffeeBanner from './components/CoffeeBanner';
import VideoPlaceholder from './components/VideoPlaceholder';
import Header from './components/Header';
import FindWordLink from './components/FindWordLink';
import ArrowLeft from './components/ArrowLeft';
import ArrowRight from './components/ArrowRight';
import './App.css';

const WordInRandomYouTubeVideo = () => {
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [startTime, setStartTime] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [placeholderText, setPlaceholderText] = useState('Search for video');

  const handleSearch = (searchTerm) => {
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
      .catch(error => console.error('Error fetching search results:', error));
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
      <div className="app-container">
        <Header />
        <SearchBar onSearch={handleSearch} />
        <Row className="justify-content-center">
          <Col sm={1} xs={2} className="text-center">
            {(currentVideoId && currentClipIndex >= 1) && (
              <ArrowLeft clipIndex={currentClipIndex} onClick={handleNavigatePrevious} />
            )}
          </Col>
          <Col sm={10} xs={8} className="text-center">
            {currentVideoId ? (
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
       <FindWordLink /> 
    </>
  );
};

export default WordInRandomYouTubeVideo;
