// External components
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function EmployeeCard({employee}) {
  return (
    <Card sx={{
      p: 2,
      mb: 1,
      borderRadius: '8px',
      boxShadow: '0px 2px 0.5px rgba(0, 0, 0, 0.1)',
      '&:hover': { opacity: 0.8, transform: 'scale(1.01)' },
      transition: 'transform 0.3s',
      border: '1px solid #ccc',
    }}>
      <Link to="/new-employee" state={{ employee }}>
        <Typography variant="h6">{employee.name}</Typography>
        <Box display="flex" sx={{ml:2, mr:2}} gap={3}>
          <Box display="flex" flexDirection="column">
            <Box display="flex" alignItems="center" sx={{m:1}} gap={1}>
              <MailOutlineIcon fontSize="small" />
              {employee.email}
            </Box>
            <Box display="flex" alignItems="center" sx={{m:1}} gap={1}>
              <PhoneIcon fontSize="small" />
              {employee.phone}
            </Box>
          </Box>
          <Box display="flex" flexDirection="column">
            <Box display="flex" alignItems="center" sx={{m:1}} gap={1}>
              <CakeIcon fontSize="small" />
              {employee.dob}
            </Box>
            <Box display="flex" alignItems="center" sx={{m:1}} gap={1}>
              <LocationOnIcon fontSize="small" />
              {`${employee.street}, ${employee.number}, ${employee.city}, ${employee.state}`}
            </Box>
          </Box>
        </Box>
      </Link>
    </Card>
  );
}

export default EmployeeCard;
