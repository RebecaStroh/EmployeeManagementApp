// Components
import Search from '../components/Search';
import Container from './Container';
import Card from '../components/Card';

// Styles
import './Employees.scss';

// External components
import { Link } from 'react-router-dom';

function Employees() {
  return (
    <Container>
      <div className="employees-content">
        <Search/>
        <div className='employees-list'>
          <button className='new'><Link to="/new-employee"> New Employee</Link></button>
          <Card/>
          <Card/>
          <Card/>
        </div>
      </div>
    </Container>
  );
}

export default Employees;
