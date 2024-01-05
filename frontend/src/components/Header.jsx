// Header.jsx
import React from 'react';
import Container from 'react-bootstrap/Container';
import { useLocation } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
  // Get the current path
  const location = useLocation();

  // Define the text for different paths
  const text = {
    "/word-in-specific-youtube-video": {
      h1: "Find a word in a YouTube video of your choice",
      p: "Words in specific action: Explore Your Vocabulary in Every Clip"
    },
    "/word-in-random-youtube-video": {
      h1: "Find a word in a random YouTube video",
      p: "Words in Action: Explore Your Vocabulary in Every Clip"
    }
  };

  // Get the text for the current path or use a default value
  const { h1, p } = text[location.pathname] || {
    h1: "Find a word in a YouTube video",
    p: "Words in Any Action: Explore Your Vocabulary in Any Clip"
  };

  // Inline style with !important
  const headerStyle = {
    paddingBottom: `10px !important`
  };

  return (
    <div className="py-5 text-center override">
      <Container>
        <h1>{h1}</h1>
        <p>{p}</p>
      </Container>
    </div>
  );
};

export default Header;
