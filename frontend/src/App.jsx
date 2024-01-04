// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import WordInSpecificYouTubeVideo from './WordInSpecificYouTubeVideo';
import CoffeeBanner from './components/CoffeeBanner';


const App = () => {
  return (
    <>
    <CoffeeBanner />
    <Router>
      <Routes>
        <Route path="/word-in-random-youtube-video" element={<Home />} />
        <Route path="/word-in-specific-youtube-video" element={<WordInSpecificYouTubeVideo />} />
        <Route path="/" element={<Navigate to="/word-in-random-youtube-video" />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;