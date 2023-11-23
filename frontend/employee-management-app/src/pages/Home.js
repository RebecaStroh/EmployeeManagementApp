// Components
import Container from './Container';
import Login from '../components/Login';

// External Components
import { useLocation } from 'react-router-dom';
import Register from '../components/Register';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

function Home() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const signup = searchParams.get('signup');

  return (
    <Container classes="with-background">
      <Grid
        container
        item
        justifyContent="center"
        flexDirection="row"
        sx={{ textAlign: "left" }}
      >
        <Grid
          flexDirection="column"
          alignItems="flex-start"
          sx={{ m: "auto", textShadow: "2px 2px 8px rgba(0, 0, 0, 0.1);", flex: 0.8}}
        >
          <Typography
            variant="h1"
            color="white"
            sx={{ pb: 10 }}
            > Welcome to Employee Management App! </Typography>
          <Typography
            variant="h5"
            color="white"
            > Simplifying onboarding and streamline HR processes. </Typography>
        </Grid>
        <Card
          sx={{
            mr: 15,
            mt: 30,
            mb: 30,
            padding: 5,
            minWidth: 310,
            display: "flex",
            justifyContent:"center",
            alignItems:"center",
            flex: 0.2
          }}
        >
          {signup ? <Register/> : <Login/>}
        </Card>
      </Grid>
    </Container>
  );
}

export default Home;
