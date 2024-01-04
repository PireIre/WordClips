import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import GroupSearchBar from './components/GroupSearchBar';
import VideoPlayer from './components/VideoPlayer';
import VideoPlaceholder from './components/VideoPlaceholder';
import Header from './components/Header';
import FindWordInRandomLink from './components/FindWordInRandomLink';
import TimestampBar from './components/TimestampBar';
import './App.css';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const WordInSpecificYouTubeVideo = () => {
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [placeholderText, setPlaceholderText] = useState('Enter a for video URL and a specific word');
  const [timestamps, setTimestamps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (videoUrl, searchTerm) => {
    setIsLoading(true);
    setTimestamps([]);
  
    fetch(`http://localhost:3001/transcripts/search-word-in-specific-video?word=${searchTerm}&url=${videoUrl}`)
      .then(response => response.json())
      .then(data => {
        const videoId = videoUrl.split('v=')[1];
        if (data.length > 1) {
          setTimestamps(data);
          setStartTime(data[0].offset);
          setCurrentVideoId(videoId);
        } else {
          setCurrentVideoId(videoId);
          setStartTime(data[0].offset);
        }
      })
      .catch(error => {
        setPlaceholderText('404');
        setCurrentVideoId(null);
        console.error('Error fetching search results:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  

  return (
    <>
      <div className="app-container">
        <Header />
        <GroupSearchBar onSearch={handleSearch} />
        <Row className="justify-content-center">
          <Col sm={10} xs={8} className="text-center">
            {isLoading ? (
              <div className="spinner-container">
                <FontAwesomeIcon icon={faSpinner} spin size="3x" color="#b02a37" />
              </div>
            ) : currentVideoId ? (
              <>
                <VideoPlayer
                  videoId={currentVideoId}
                  startTime={startTime}
                />
                {timestamps.length > 1 && <TimestampBar timestamps={timestamps} startTime={startTime} setStartTime={setStartTime} />}
              </>
            ) : (
              <VideoPlaceholder placeholderText={placeholderText} />
            )}
          </Col>
        </Row>
      </div>
      <FindWordInRandomLink /> 
    </>
  );
};

export default WordInSpecificYouTubeVideo;
