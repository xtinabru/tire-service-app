import React, { MouseEvent, ReactNode } from 'react';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

interface CustomButtonProps {
  children: ReactNode;  
  to: string;           
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, to }) => (
  <Grid item>
    <Button
      variant="contained"
      style={{
        background: 'linear-gradient(100deg, #051e4f, #1976d2)', 
        color: '#ffffff',
        padding: '12px 16px',
        margin: '2px',
        borderRadius: '10px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.4)',
        transition: '0.2s', 
        display: 'flex', 
        justifyContent: 'center',
      }}
      component={Link}
      to={to}
      onMouseOver={(e: MouseEvent<HTMLButtonElement>) => {
       
        e.currentTarget.style.background = 'linear-gradient(135deg, #1976d2, #2f8c8f)';
      }}
      onMouseOut={(e: MouseEvent<HTMLButtonElement>) => {
 
        e.currentTarget.style.background = 'linear-gradient(100deg, #051e4f, #1976d2)';
      }}
    >
      {children}
    </Button>
  </Grid>
);

export default CustomButton;
