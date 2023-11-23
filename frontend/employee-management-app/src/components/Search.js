import React, { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Search = ({handleSearch, searchTerm, loading}) => {
  const [currSearchTerm, setCurrSearchTerm] = useState(searchTerm);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(currSearchTerm);
  };

  return (
    <Box
      className={loading ? 'loading' : ""}
      component="form"
      onSubmit={handleSubmit}
      alignItems="center"
      display="flex"
      gap={2}
    >
      <TextField
        type="text"
        placeholder='Search for any employee metadata'
        value={currSearchTerm}
        onChange={(e) => setCurrSearchTerm(e.target.value)}
        sx={{ '>div':{borderRadius: 20} }}
        fullWidth
      />
      <Button type="submit" color='blue' variant="contained" sx={{ borderRadius: 6, pl:3, pr:3 }}>Search</Button>
      <Button type="button" color='blue' variant="contained" sx={{ borderRadius: 6, pl:3, pr:3 }} onClick={() => {handleSearch("");setCurrSearchTerm("");}}>Clear</Button>
    </Box>
  );
};

export default Search;
