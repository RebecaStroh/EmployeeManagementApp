// BackButton.js
import React from 'react';
import { styled } from '@mui/system';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const StyledIconButton = styled(IconButton)({
  background: '#fff', // Change the background color to your preference
  color: 'rgba(0, 0, 0, 0.87)', // Change the icon color to your preference
  '&:hover': {
    opacity: 0.8,
    transform: 'scale(1.01)',
    color: '#fff',
  },
  transition: 'transform 0.3s',
});

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledIconButton onClick={handleGoBack}>
      <ArrowBackIcon />
    </StyledIconButton>
  );
};

export default BackButton;
