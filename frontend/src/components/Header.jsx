import React from 'react';
import Container from 'react-bootstrap/Container';
import { useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const text = {
    "/word-in-specific-youtube-video": {
      h1: "Find a Word in a YouTube Video of Your Choice",
      p: "Explore Video Content: Uncover every instance of a particular word in your chosen YouTube video"
    },
    "/word-in-random-youtube-video": {
      h1: "Find a Word in a Random YouTube Video",
      p: "Word Exploration Made Easy: Find engaging YouTube clips featuring the word you're looking for"
    }
  };

  const { h1, p } = text[location.pathname] || {
    h1: "Find a Word in a YouTube Video",
    p: "Words in any action: Explore vocabulary in any clip."
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
