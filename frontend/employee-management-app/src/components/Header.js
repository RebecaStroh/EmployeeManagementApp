// Import MUI components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

// Assets
import logo from '../assets/icon.svg';

// External components
import { Link } from 'react-router-dom';

// Components
import './Header.scss';

function Header() {
  return (
    <AppBar position="static" >
      <Toolbar>
        <img src={logo} className="logo-header" alt="logo" />
        <div className="navigation">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/employees" className="nav-link">
            Employees
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
