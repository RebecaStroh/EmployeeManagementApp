import React, { useEffect, useState } from 'react';

// Components
import Search from '../components/Search';
import Container from './Container';
import Card from '../components/Card';

// Styles
import './Employees.scss';

// External components
import { Link } from 'react-router-dom';

function Employees() {
  const [employees, setEmployees] = useState([]);

  // Function to fetch all employees
  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5001/employeemanagementapp-767af/us-central1/getAllEmployees');
      const data = await response.json();

      // Set the retrieved employees to the state
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    // Call the function to fetch employees
    fetchEmployees();
  }, []);

  return (
    <Container>
      <div className="employees-content">
        <Search/>
        <div className='employees-list'>
          <button className='new'><Link to="/new-employee"> New Employee</Link></button>
          {employees.length === 0 ? "No employees added" : employees.map((employee)=> <Card employee={employee}/>)}
        </div>
      </div>
    </Container>
  );
}

export default Employees;
