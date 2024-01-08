import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const SwitchPageFooter = () => {
  const isSpecific = {
    "/word-in-specific-youtube-video": true,
    "/word-in-random-youtube-video": false
  };

  const isOnSpecificPage = isSpecific[location.pathname];

  return (
    <footer className="wordClips-footer">
      <Navbar style={{ backgroundColor: '#E5E7EB' }} expand="lg">
        <Container
          fluid
          className={`d-flex align-items-center ${!isOnSpecificPage ? 'justify-content-end' : ''}`}
          style={{ margin: '10px' }}
        >
          <Navbar.Text>
            {isOnSpecificPage ? (
              <>
                <a
                  href="/word-in-random-youtube-video"
                  style={{
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    paddingRight: '10px',
                  }}
                >
                  <span>&larr;</span> Find a word in a random YouTube video
                </a>
              </>
            ) : (
              <>
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
              </>
            )}
          </Navbar.Text>
        </Container>
      </Navbar>
    </footer>
  );
};

export default SwitchPageFooter;