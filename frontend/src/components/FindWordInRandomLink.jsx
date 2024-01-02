// src/components/CoffeeBanner.js
import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';

const FindWordInRandomLink = () => {

  return (
    <Navbar style={{ backgroundColor: '#E5E7EB' }} expand="lg">
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
        style={{ margin: '10px' }}
      >
          <Navbar.Text>
          <a
          href="/word-in-random-youtube-video"
          style={{
            fontWeight: 'bold',
            textDecoration: 'none', 
            paddingRight: '10px',
          }}
          >
            <span>&larr;</span>Find a word in a random YouTube video
          </a>
          </Navbar.Text>
        <div className="d-flex ml-auto">
        <Navbar.Text>
          </Navbar.Text>
        </div>
      </Container>
    </Navbar>
  );
};

export default FindWordInRandomLink;
