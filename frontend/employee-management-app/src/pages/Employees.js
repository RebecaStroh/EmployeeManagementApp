import React, { useEffect, useState } from 'react';

// Components
import Search from '../components/Search';
import Container from './Container';
import EmployeeCard from '../components/Card';

// External components
import { Link } from 'react-router-dom';
import Card from "@mui/material/Card";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to fetch all employees
  const fetchEmployees = async () => {
    setLoading(true);
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
    setLoading(false);
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
      leftHeaderContent={
        <Button className='new' variant="contained" color="orange"  sx={{ height:"100%", borderRadius: 20 }}>
          <Link to="/new-employee" style={{ color: 'white' }}> New Employee</Link>
        </Button>
      }>
      <Box display="flex" gap={3}>
        <Box sx={{ flex: 0.6 }} >
          {employees.length === 0 
            ? <Card sx={{
              p: 2,
              mb: 1,
              borderRadius: '8px',
              boxShadow: '0px 2px 0.5px rgba(0, 0, 0, 0.1)',
              '&:hover': { opacity: 0.8, transform: 'scale(1.01)' },
              transition: 'transform 0.3s',
              border: '1px solid #ccc',
            }}><h3>No employees found</h3></Card>
            : employees.map((employee, index)=> <EmployeeCard key={index} employee={employee}/>)}
        </Box>
        <Card sx={{p: 2, flex: 0.4, marginBottom: 'auto',border: '1px solid #ccc'}}>
          <Search handleSearch={handleSearch} searchTerm={searchTerm} loading={loading}/>
        </Card>
      </Box>
    </Container>
  );
}

export default Employees;
