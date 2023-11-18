// Assets
import logo from '../assets/logo.svg';

// External components
import { Link } from 'react-router-dom';

// Components
import './Header.scss';

function Header() {
  return (
    <header>
      <img src={logo} className="logo-header" alt="logo" />
      <div class="navigation">
        <Link to="/">Home</Link>
        <Link to="/my-profile">My Profile</Link>
        <Link to="/search">Search</Link>
      </div>
    </header>
  );
}

export default Header;
