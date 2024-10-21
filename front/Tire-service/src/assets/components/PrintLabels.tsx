import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Button,
  Paper,
  Box,
} from '@mui/material';

interface Label {
  tire_id: number;
  customer_name: string;
  car_registration_number: string;
  tire_size: string;
  tire_manufacturer: string;
  tire_position: string;
}

export default function PrintLabels() {
  const { id } = useParams<{ id: string }>(); // Get client id from URL
  const [labels, setLabels] = useState<Label[]>([]);

  // function to get info for labels
  useEffect(() => {
    fetch(`http://localhost:3000/customers/${id}/tires/labels`)
      .then(response => response.json())
      .then(data => {
        setLabels(data);
      })
      .catch(error => {
        console.error('Error fetching labels:', error);
      });
  }, [id]);

  const handlePrint = () => {
    window.print(); // open dialogue window to print
  };

  return (
    <div style={{ padding: '20px', maxWidth: '100%', margin: '0 auto', maxHeight: '100vh', overflowY: 'auto' }}>
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ color: '#1976d2'}}>
        Print Tire Labels
      </Typography>

      {labels.length > 0 ? (
        <div style={{ marginBottom: '20px', marginLeft: '30%', width: '40%' }}>
          {labels.map(label => (
            <Paper key={label.tire_id} style={{
              border: '1px solid black',
              margin: '10px',
              padding: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '0px',
            }}>
              <Box textAlign="center">
                <Typography variant="body1">Tire ID: {label.tire_id}</Typography>
                <Typography variant="body1">Customer Name: {label.customer_name}</Typography>
                <Typography variant="body1">Car Registration Number: {label.car_registration_number}</Typography>
                <Typography variant="body1">Tire Size: {label.tire_size}</Typography>
                <Typography variant="body1">Tire Manufacturer: {label.tire_manufacturer}</Typography>
                <Typography variant="body1">Tire Position: {label.tire_position}</Typography>
              </Box>
            </Paper>
          ))}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4%' }}>
            <Button onClick={handlePrint} variant="contained" color="primary" style={{ width: '25%', marginBottom:'6%'}}>
              Print
            </Button>
          </div>
        </div>
      ) : (
        <Typography variant="body1" textAlign="center">
          There are no labels for this customer.
        </Typography>
      )}
    </div>
  );
}
