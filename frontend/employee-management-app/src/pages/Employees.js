import React, { useEffect, useState } from 'react';

// Components
import Search from '../components/Search';
import Container from './Container';
import EmployeeCard from '../components/Card';

// External components
import { Link } from 'react-router-dom';
import Card from "@mui/material/Card";
import Box from '@mui/material/Box';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to fetch all employees
  const fetchEmployees = async () => {
    try {
      const response = await fetch('https://getallemployees-nlxluegtta-uc.a.run.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm }),
      });
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
  }, [searchTerm]);

  const handleSearch = async (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  }

  return (
    <Container
      classes="with-background"
      title="Registered employees"
      leftButtonContent={<Link to="/new-employee" style={{ color: 'white' }}> New Employee</Link>}>
      <Box display="flex" gap={3}>
        <Box sx={{ flex: 0.6 }} >
          {employees.length === 0 
            ? <Card>No employees found</Card>
            : employees.map((employee, index)=> <EmployeeCard key={index} employee={employee}/>)}
        </Box>
        <Card sx={{p: 2, flex: 0.4, marginBottom: 'auto',border: '1px solid #ccc'}}>
          <Search handleSearch={handleSearch} searchTerm={searchTerm}/>
        </Card>
      </Box>
    </Container>
  );
}

export default Employees;
