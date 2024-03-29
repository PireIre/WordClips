import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import GroupSearchBar from './components/GroupSearchBar';
import VideoPlayer from './components/VideoPlayer';
import VideoPlaceholder from './components/VideoPlaceholder';
import Header from './components/Header';
import TimestampBar from './components/TimestampBar';
import './App.css';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from './config';


const WordInSpecificYouTubeVideo = () => {
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [placeholderText, setPlaceholderText] = useState('Enter a for video URL and a specific word');
  const [timestamps, setTimestamps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const youtubeUrlToVideoIdParser = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
  };
  
  const handleSearch = (videoUrl, searchTerm) => {
    setIsLoading(true);
    const videoId = youtubeUrlToVideoIdParser(videoUrl);

    setTimestamps([]);
    fetch(`${config.apiUrl}/transcripts/search-word-in-specific-video?word=${searchTerm}&url=${videoId}`)
    .then(response => response.json())
      .then(data => {
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
      <div className="wordClips-main-content">
        <Header />
        <GroupSearchBar onSearch={handleSearch} />
        <Row className="justify-content-center">
          <Col className="text-center">
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
    </>
  );
};

export default WordInSpecificYouTubeVideo;
