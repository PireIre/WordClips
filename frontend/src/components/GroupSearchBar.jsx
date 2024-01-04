// src/components/VideoSearchBar.js
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import './SearchBar.css'; // Import the CSS file

const GroupSearchBar = ({ onSearch }) => {
  const [url, setUrl] = useState('');
  const [word, setWord] = useState('');

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onSearch(url, word);
  };

  return (
    <Container className="d-flex justify-content-center">
      <Form onSubmit={handleSearch}>
        <InputGroup className="mb-4" style={{ maxWidth: '600px' }}>
          <Form.Control
            type="text"
            placeholder="YouTube video URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Form.Control
            type="text"
            placeholder="Word in a video"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <Button variant="danger" type="submit" disabled={!url || !word}>
            Search
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
};

export default GroupSearchBar;
