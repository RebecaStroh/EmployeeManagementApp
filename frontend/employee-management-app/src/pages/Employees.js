import React, { useEffect, useState } from 'react';

// Components
import Search from '../components/Search';
import Container from './Container';
import EmployeeCard from '../components/Card';

// External components
import { Link } from 'react-router-dom';
import Card from "@mui/material/Card";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Employees() {
  const [employees, setEmployees] = useState([]);

  // Function to fetch all employees
  const fetchEmployees = async () => {
    try {
      const response = await fetch('https://getallemployees-nlxluegtta-uc.a.run.app');
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
        <Box sx={{ m: 4, ml: 11, mr:11, width: '100%' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <h1>Registered employees</h1>
            <Button className='new' variant="contained" color="orange"  sx={{ height:"100%", borderRadius: 20 }}><Link to="/new-employee" style={{ color: 'white', textDecoration: 'none' }}> New Employee</Link></Button>
          </Box>
          <Box display="flex" gap={3}>
            <Card sx={{p: 2, flex: 0.6}}>
              {employees.length === 0 ? "No employees added" : employees.map((employee)=> <EmployeeCard employee={employee}/>)}
            </Card>
            <Card sx={{p: 2, flex: 0.4, marginBottom: 'auto'}}>
              <Search/>
            </Card>
          </Box>
        </Box>
      </div>
    </Container>
  );
}

export default Employees;
