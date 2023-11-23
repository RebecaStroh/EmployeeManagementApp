// Components
import Header from '../components/Header';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// Styles
import './Container.scss';

function Container({classes, title, leftButtonContent, children}) {
  return (
    <>
      <Header/>
      <div className={classes}>
        <Box sx={{ m: 4, ml: 20, mr:20, width: '100%' }}>
          {title ? <Box display="flex" justifyContent="space-between" alignItems="center">
            <h1>{title}</h1>
            {leftButtonContent ? <Button className='new' variant="contained" color="orange"  sx={{ height:"100%", borderRadius: 20 }}>
              {leftButtonContent}
            </Button> : null}
          </Box> : null}
          {children}
        </Box>
      </div>
    </>
  );
}

export default Container;
