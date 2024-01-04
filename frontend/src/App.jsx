// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WordInRandomYouTubeVideo from './WordInRandomYouTubeVideo';
import WordInSpecificYouTubeVideo from './WordInSpecificYouTubeVideo';
import CoffeeBanner from './components/CoffeeBanner';
import SwitchPageFooter from './components/SwitchPageFooter';


const App = () => {
  return (
    <div className="wordClips-app">
    <CoffeeBanner/>
    <Router>
      <Routes>
        <Route path="/word-in-random-youtube-video" element={<WordInRandomYouTubeVideo />} />
        <Route path="/word-in-specific-youtube-video" element={<WordInSpecificYouTubeVideo />} />
        <Route path="/" element={<Navigate to="/word-in-random-youtube-video" />} />
      </Routes>
    </Router>
    <SwitchPageFooter/>
    </div>
  );
};

export default App;
