// src/components/CoffeeBanner.js
import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';

const FindWordLink = () => {

  return (
    <Navbar style={{ backgroundColor: '#E5E7EB' }} expand="lg">
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
        style={{ margin: '10px' }}
      >
          <Navbar.Text>
            
          </Navbar.Text>
        <div className="d-flex ml-auto">
        <Navbar.Text>
        <a
          href="/word-in-specific-youtube-video"
          style={{
            fontWeight: 'bold',
            textDecoration: 'none', 
            paddingRight: '10px',
          }}
          >
            Find a word in a specific YouTube video<span>&rarr;</span>
          </a>
          </Navbar.Text>
        </div>
      </Container>
    </Navbar>
  );
};

export default FindWordLink;
