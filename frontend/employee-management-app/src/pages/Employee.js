// Components
import Container from './Container';

// Styles
import './Employee.scss';

// External components
import { Link, useLocation } from 'react-router-dom';

function Employee() {
  const location = useLocation();
  const employee = location.state?.employee;
  const {
    name,
    dob,
    cpf,
    email,
    phone,
    street,
    number,
    city,
    state,
    employmentContract,
    idDocument,
    proofOfAddress,
    schoolCurriculum,
  } = employee;

  return (
    <Container>
      <div className="employee-content">
        <div className="info-card">
          <div className="info-item">
            <h1>{name}</h1>
            <button className='new'><Link to="/new-employee" state={{ employee }}> Edit Employee</Link></button>
          </div>
          <div className="info-item">
            <label htmlFor="dob">Birth of Date:</label>
            <div id="dob">{dob}</div>
          </div>
          <div className="info-item">
            <label htmlFor="cpf">CPF:</label>
            <div id="cpf">{cpf}</div>
          </div>
          <div className="info-item">
            <label htmlFor="email">Email:</label>
            <div id="email">{email}</div>
          </div>
          <div className="info-item">
            <label htmlFor="phone">Cellphone Number:</label>
            <div id="phone">{phone}</div>
          </div>
          <div className="info-item">
            <label htmlFor="street">Address - Street:</label>
            <div id="street">{street}</div>
          </div>
          <div className="info-item">
            <label htmlFor="number">Address - Number:</label>
            <div id="number">{number}</div>
          </div>
          <div className="info-item">
            <label htmlFor="city">Address - City:</label>
            <div id="city">{city}</div>
          </div>
          <div className="info-item">
            <label htmlFor="state">Address - State:</label>
            <div id="state">{state}</div>
          </div>
        </div>
        <div className="info-card">
            <div className="info-item">
              <h2>Documents</h2>
            </div>
            <div className="info-item">
              <label>Employment Contract:</label>
              <a href={employmentContract} target="_blank" rel="noopener noreferrer">View Document</a>
            </div>
            <div className="info-item">
              <label>CPF/RG:</label>
              <a href={idDocument} target="_blank" rel="noopener noreferrer">View Document</a>
            </div>
            <div className="info-item">
              <label>Proof of Address:</label>
              <a href={proofOfAddress} target="_blank" rel="noopener noreferrer">View Document</a>
            </div>
            <div className="info-item">
              <label>School Curriculum:</label>
              <a href={schoolCurriculum} target="_blank" rel="noopener noreferrer">View Document</a>
            </div>
          </div>
      </div>
    </Container>
  );
}

export default Employee;
