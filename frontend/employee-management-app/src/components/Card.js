// External components
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

function EmployeeCard({employee}) {
  return (
    <Box sx={{
      p: 2,
      borderRadius: '8px',
      boxShadow: '0px 2px 0.5px rgba(0, 0, 0, 0.1)',
      '&:hover' : { backgroundColor: 'rgba(0, 0, 0, 0.05)' }
    }}>
      <Link to="/new-employee" state={{ employee }}>
        <h3>{employee.name}</h3>
        <div className="cpf">
          <label> CPF: </label>
          {employee.cpf}
        </div>
      </Link>
    </Box>
  );
}

export default EmployeeCard;
