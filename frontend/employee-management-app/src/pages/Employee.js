// Components
import Container from './Container';

// Styles
import './Employee.scss';

// External components
import { Link } from 'react-router-dom';

function Employee() {
  return (
    <Container>
      <div className="employee-content">
        <div className="info-card">
          <div className="info-item">
            <h1>John Doe</h1>
            <button className='new'><Link to={`/new-employee?editMode=true`}> Edit Employee</Link></button>
          </div>
          <div className="info-item">
            <label htmlFor="dob">Birth of Date:</label>
            <div id="dob">1990-01-01</div>
          </div>
          <div className="info-item">
            <label htmlFor="cpf">CPF:</label>
            <div id="cpf">123.456.789-01</div>
          </div>
          <div className="info-item">
            <label htmlFor="email">Email:</label>
            <div id="email">john.doe@example.com</div>
          </div>
          <div className="info-item">
            <label htmlFor="phone">Cellphone Number:</label>
            <div id="phone">1234567890</div>
          </div>
          <div className="info-item">
            <label htmlFor="street">Address - Street:</label>
            <div id="street">123 Main Street</div>
          </div>
          <div className="info-item">
            <label htmlFor="number">Address - Number:</label>
            <div id="number">456</div>
          </div>
          <div className="info-item">
            <label htmlFor="city">Address - City:</label>
            <div id="city">Cityville</div>
          </div>
          <div className="info-item">
            <label htmlFor="state">Address - State:</label>
            <div id="state">ST</div>
          </div>
        </div>
        <div className="info-card">
            <div className="info-item">
              <h2>Documents</h2>
            </div>
            <div className="info-item">
              <label>Employment Contract:</label>
              <a  target="_blank" rel="noopener noreferrer">View Document</a>
            </div>
            <div className="info-item">
              <label>CPF/RG:</label>
              <a target="_blank" rel="noopener noreferrer">View Document</a>
            </div>
            <div className="info-item">
              <label>Proof of Address:</label>
              <a target="_blank" rel="noopener noreferrer">View Document</a>
            </div>
            <div className="info-item">
              <label>School Curriculum:</label>
              <a target="_blank" rel="noopener noreferrer">View Document</a>
            </div>
          </div>
      </div>
    </Container>
  );
}

export default Employee;
