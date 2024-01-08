import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Container className="d-flex justify-content-center">
      <Form onSubmit={handleSearch}>
        <InputGroup className="mb-4" style={{ maxWidth: '600px' }}>
          <Form.Control
            type="text"
            placeholder="Enter your search term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="danger" type="submit">
            Search
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
};

export default SearchBar;
