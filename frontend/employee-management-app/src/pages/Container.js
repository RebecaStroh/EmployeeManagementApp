// Components
import Header from '../components/Header';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// Styles
import './Container.scss';
import BackButton from '../components/BackButton';

function Container({classes, title, leftHeaderContent, children}) {
  return (
    <>
      <Header/>
      <div className={classes}>
        <Box sx={{ m: 4, ml: 20, mr:20, width: '100%' }}>
          {title && <BackButton/>}
          {title && <Box display="flex" justifyContent="space-between" alignItems="center">
            <h1>{title}</h1>
            {leftHeaderContent}
          </Box>}
          {children}
        </Box>
      </div>
    </>
  );
}

export default Container;
