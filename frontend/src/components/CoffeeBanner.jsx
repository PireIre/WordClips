// src/components/CoffeeBanner.js
import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import logo from '../assets/logo.png';
import './CoffeeBanner.css'

const CoffeeBanner = () => {
  const goToHomepage = () => {
    window.location.href = '/';
  };

  return (
    <div className="wordClips-menu">
      <Navbar bg="white" expand="lg">
        <Container
          fluid
          className="d-flex justify-content-between align-items-center"
          style={{ margin: '5px' }}
        >
          <Navbar.Brand onClick={goToHomepage} style={{ cursor: 'pointer' }}>
            <img
              src={logo}
              alt="Play Logo"
              style={{ height: '40px' }}
            />
          </Navbar.Brand>
          <div className="d-flex ml-auto">
            <Button
              variant="light"
              onClick={() => window.open('https://www.buymeacoffee.com/pireire', '_blank')}
            >
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                style={{ height: '60px', width: '217px' }}
              />
            </Button>
          </div>
        </Container>
      </Navbar>
   </div>
  );
};

export default CoffeeBanner;
