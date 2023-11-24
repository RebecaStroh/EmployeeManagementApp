// Components
import Container from './Container';

// External Components
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";

function Home() {
  return (
    <Container classes={`with-background justify-center fade-in`}>
      <Grid
        flexDirection="column"
        display="flex"
        justifyContent="center"
        sx={{ ml: 10, mr: 10, textShadow: "2px 2px 8px rgba(0, 0, 0, 0.1);"}}
      >
        <Typography
          variant="h1"
          color="white"
          sx={{ pb: 9 }}
        >
          Welcome to Employee Management App!
        </Typography>
        <Typography variant="h5" color="white">
          Simplifying onboarding and streamline HR processes.
        </Typography>
      </Grid>
    </Container>
  );
}

export default Home;
