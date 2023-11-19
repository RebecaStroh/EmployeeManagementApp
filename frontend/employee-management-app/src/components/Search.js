import React, { useState } from 'react';

// Styles
import './Search.scss';

const Search = () => {
  const [username, setUsername] = useState('');

  return (
    <form id="search-form">
        <input
          type="text"
          placeholder='Search for name or CPF'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      <button type='submit' >Search</button>
    </form>
  );
};

export default Search;
