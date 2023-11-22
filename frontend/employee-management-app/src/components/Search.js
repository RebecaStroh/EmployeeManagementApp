import React, { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typo, setTypo] = useState('name');

  // Function to handle form submission
  const handleSubmit = (event) => {
    console.log('Search term:', searchTerm);
    
    // Send to backend and handle return
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      alignItems="center"
      display="flex"
      gap={2}
    >
      <Select
        id="typo-select"
        defaultChecked="name"
        value={typo}
        onChange={(event) => setTypo(event.target.value)}
        sx={{ borderRadius: 20 }}
      >
        <MenuItem value='name'>Name</MenuItem>
        <MenuItem value='dob'>Birth of Date</MenuItem>
        <MenuItem value='cpf'>CPF</MenuItem>
        <MenuItem value='email'>Email</MenuItem>
        <MenuItem value='phone'>Cellphone Number</MenuItem>
        <MenuItem value='address'>Address</MenuItem>
      </Select>
      <TextField
        type="text"
        placeholder='Search for name or CPF'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ '>div':{borderRadius: 20} }}
        fullWidth
      />
      <Button type="submit" color='blue' variant="contained" sx={{ borderRadius: 6 }}>Search</Button>
    </Box>
  );
};

export default Search;
