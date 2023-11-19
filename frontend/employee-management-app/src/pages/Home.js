// Styles
import './Home.scss';

// Assets
import logo from '../assets/logo.svg';

// Components
import Container from './Container';
import Login from '../components/Login';

function Home() {
  return (
    <Container>
      <div className="home-content">
        <div className="left-content">
          <img src={logo} className="logo" alt="logo" />
          <h1> Welcome to Employee Management App! </h1>
          <p> Simplifying onboarding and streamline HR processes. </p>
        </div>
        <div className="right-content">
          <Login/>
        </div>
      </div>
    </Container>
  );
}

export default Home;
