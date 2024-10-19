import React, { MouseEvent } from 'react';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const CustomButton: React.FC<CustomButtonProps> = ({ children, to }) => (
  <Grid item>
    <Button
      variant="contained"
      style={{
        background: 'linear-gradient(100deg, #051e4f, #1976d2)', // Изначальный цвет
        color: '#ffffff',
        padding: '10px 14px',
        borderRadius: '10px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.4)',
        transition: '0.2s', 
        display: 'flex', 
        justifyContent: 'center',
      }}
      component={Link}
      to={to}
      onMouseOver={(e: MouseEvent<HTMLButtonElement>) => {
        // Изменяем цвет на градиент при наведении
        e.currentTarget.style.background = 'linear-gradient(135deg, #1976d2, #2f8c8f)';
      }}
      onMouseOut={(e: MouseEvent<HTMLButtonElement>) => {
        // Возвращаем исходный цвет
        e.currentTarget.style.background = 'linear-gradient(100deg, #051e4f, #1976d2)';
      }}
    >
      {children}
    </Button>
  </Grid>
);

export default CustomButton;
