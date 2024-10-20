import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Typography, Button, List, ListItem, ListItemText } from '@mui/material';


interface Customer {
  id: number; 
  customer_name: string;
  car_registration_number: string;
}

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/customers')
      .then(response => response.json())
      .then(data => {
        setCustomers(data);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  const handleViewDetails = (customerId: number) => {
    navigate(`/customers/${customerId}`);
  };

  const filteredCustomers = customers.filter(customer => 
    customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    customer.car_registration_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', maxWidth: '100%', maxHeight: '100vh', overflowY: 'auto' }}>
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ color: '#1976d2' }}>
        Our Customers
      </Typography>
      <TextField
        label="Search by name or registration number"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          marginTop:2,
          marginBottom: 2,
          marginLeft: 44,
          textAlign: 'center',
          maxWidth: '58%',
          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#2f8c8f' },
        }}
      />
      <List
      sx={{
        marginBottom: 10,
        marginLeft: 42,
        maxWidth: '60%',
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#2f8c8f' },
      }}>
        {filteredCustomers.map((customer) => (
          <ListItem key={customer.id} secondaryAction={
            <Button variant="contained" onClick={() => handleViewDetails(customer.id)} sx={{ backgroundColor: '#1976d2', color: '#ffffff' }}>
              View Details
            </Button>
          }>
            <ListItemText primary={customer.customer_name} secondary={customer.car_registration_number} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
