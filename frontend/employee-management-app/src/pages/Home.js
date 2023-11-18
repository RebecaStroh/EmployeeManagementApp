// Styles
import './Home.scss';

// Assets
import logo from '../assets/logo.svg';

// Components
import Container from '../components/Container';

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
          <form>
            <div>
              <label>E-mail</label>
              <input placeholder='E-mail' />
            </div>
            <div>
              <label>Password</label>
              <input placeholder='Password' />
              <a className='forgot-password'> Forgot your password? </a>
            </div>
            <button type='submit'>Submit</button>
            <p>Don't have an account yet? <a > Register now </a></p>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default Home;
