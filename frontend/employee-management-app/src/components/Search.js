import React, { useState } from 'react';

// Styles
import './Search.scss';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    console.log('Search term:', searchTerm);
    
    // Send to backend and handle return
  };

  return (
    <form id="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder='Search for name or CPF'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input type="submit" value="Search"/>
    </form>
  );
};

export default Search;
