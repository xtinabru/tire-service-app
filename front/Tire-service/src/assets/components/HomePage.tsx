import { AppBar, Toolbar, Typography, Grid } from '@mui/material';
import CustomButton from './CustomButton'; 
import styles from './StylesThings';


const textAlignValue: 'center' = 'center';
const positionValue: 'absolute' = 'absolute';

function HomePage() {
  return (
    <div className="background" style={styles.background}>
      <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar style={{ 
          ...styles.toolbar, 
          textAlign: textAlignValue, 
          position: positionValue 
        }}>
         
        </Toolbar>
      </AppBar>

      <div style={styles.container}>
        <Typography variant="h4" gutterBottom style={styles.title}>
          Welcome to the Customer Management System
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <CustomButton to="/customers">View Customers</CustomButton>
          <CustomButton to="/add-customer">Add New Customer</CustomButton>
        </Grid>
      </div>

      <footer style={{ ...styles.footer, textAlign: textAlignValue, position: positionValue }}>
        <Typography variant="body1">Contact us: info@tireservice.com | Phone: (123) 456-7890</Typography>
      </footer>
    </div>
  );
}

export default HomePage;
