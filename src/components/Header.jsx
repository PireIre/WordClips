// Header.jsx
import React from 'react';
import Container from 'react-bootstrap/Container';

const Header = () => {
  return (
    <div className="py-5 text-center"> {/* Add padding and centering classes */}
      <Container>
        <h1>Find a word in a random YouTube video</h1>
        <p>Words in Action: Explore Your Vocabulary in Every Clip</p>
      </Container>
    </div>
  );
};

export default Header;
