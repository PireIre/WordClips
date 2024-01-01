// src/App.js
import React, { useState } from 'react';
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
import WordClipsData from '../WordClips.json';

const App = () => {
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [placeholderText, setPlaceholderText] = useState('Search for video');
  const [wordClips, setWordClips] = useState(WordClipsData);

  const handleSearch = (searchTerm) => {

    const matchingClips = findMatchingClips(searchTerm);
    setSearchResults(matchingClips);

    if (matchingClips.length > 0) {
      setCurrentClipIndex(0);
      setCurrentVideoId(matchingClips[0].videoId);
      setStartTime(Math.round(matchingClips[0].startTime));
    } else {
      setPlaceholderText('404');
      setCurrentVideoId(null);
    }
  };


  const findMatchingClips = (searchTerm) => {
    const matchingClips = [];

    for (const clip of wordClips) {
      for (const videoId in clip) {
        const clips = clip[videoId];
        for (let i = 0; i < clips.length; i++) {
          if (
            clips[i].text.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !matchingClips.some((match) => match.videoId === videoId)
          ) {
            matchingClips.push({
              videoId,
              startTime: clips[i].start.toString(),
            });
            break;
          }
        }
      }
    }

    return matchingClips;
  };

  const handleNavigateNext = () => {
    if (searchResults && currentClipIndex < searchResults.length - 1) {
      const nextIndex = currentClipIndex + 1;
      setCurrentClipIndex(nextIndex);
      setCurrentVideoId(searchResults[nextIndex].videoId);
      setStartTime(Math.round(searchResults[nextIndex].startTime));
    }
  };

  const handleNavigatePrevious = () => {
    const newIndex = Math.max(currentClipIndex - 1, 0);
    setCurrentClipIndex(newIndex);
    setCurrentVideoId(searchResults[newIndex].videoId);
    setStartTime(Math.round(searchResults[newIndex].startTime));
  };

  return (
    <>
      <CoffeeBanner />
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
                startTime={startTime}
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
      {/* <FindWordLink /> */}
      </div>
    </>
  );
};

export default App;
