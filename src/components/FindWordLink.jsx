// FindWordLink.jsx
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const FindWordLink = () => {
  return (
    <Container>
      <Row className="find-word-link fixed-bottom justify-content-end">
        <Col xs={6}></Col>
        <Col xs={4} className="text-right"><p>Find a word in a specific YouTube video &#8594;</p></Col>
      </Row>
    </Container>
  );
};

export default FindWordLink;
