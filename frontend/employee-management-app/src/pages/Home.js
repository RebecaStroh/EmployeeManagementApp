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
    <Container>
      <Grid
        container
        item
        justifyContent="center"
        flexDirection="column"
        sx={{ mx: "auto", textAlign: "left" }}
      >
        <div className="home-content">
          <Grid
            flexDirection="column"
            alignItems="flex-start"
            sx={{ pl:10, pt: 20, textShadow: "2px 2px 8px rgba(0, 0, 0, 0.2);" }}
          >
            <Typography
              variant="h1"
              color="white"
              sx={{ pb: 10 }}
              > Welcome to Employee Management App! </Typography>
            <Typography
              variant="h4"
              color="white"
              > Simplifying onboarding and streamline HR processes. </Typography>
          </Grid>
          <Card
            sx={{
              mr: 20,
              mt: 30,
              mb: 30,
              padding: 5,
              minWidth: 310,
              display: "flex",
              justifyContent:"center",
              alignItems:"center"
            }}
          >
            {signup ? <Register/> : <Login/>}
          </Card>
        </div>
      </Grid>
    </Container>
  );
}

export default Home;
