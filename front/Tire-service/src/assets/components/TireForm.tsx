import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import newCusPic from '../styles/images/new_customer_pic.png'; 

interface TireFormProps {
  onTireAdded: () => void;
}

interface Tire {
  id: number;
  tire_size: string;
  tire_manufacturer: string;
  tire_position: string;
}

export default function TireForm({ onTireAdded }: TireFormProps) {
  const { customerId } = useParams<{ customerId: string }>();
  const parsedCustomerId = Number(customerId);
  const [tire_size, setSize] = useState('');
  const [tire_manufacturer, setManufacturer] = useState('');
  const [tire_position, setPosition] = useState('');
  const [tires, setTires] = useState<Tire[]>([]);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${newCusPic})`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = '420px 300px'; 
    document.body.style.backgroundPosition = 'left bottom';

    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
    };
  }, []);

  const fetchTires = useCallback(() => {
    fetch(`http://localhost:3000/customers/${parsedCustomerId}/tires`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Tires:', data);
        setTires(data);
      })
      .catch(error => console.error('Error fetching tires:', error));
  }, [parsedCustomerId]); 

  useEffect(() => {
    fetchTires();
  }, [fetchTires]); 

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newTire = {
      tire_size,
      tire_manufacturer,
      tire_position,
    };

    console.log('Submitting Tire with data:', newTire);

    fetch(`http://localhost:3000/customers/${parsedCustomerId}/tires`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTire),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        onTireAdded();
        fetchTires(); 
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div style={{ padding: '20px', maxWidth: '100%', margin: '0 auto', maxHeight: '100vh', overflowY: 'auto' }}>
      <div>
        <Typography variant="h4" gutterBottom textAlign="center">
          Add Tire
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <TextField
            label="Tire Size"
            variant="outlined"
            value={tire_size}
            onChange={(e) => setSize(e.target.value)}
            required
            style={{ marginBottom: '30px', marginLeft: '30%', marginTop: '1%', width: '40%' }}
          />
          <TextField
            label="Manufacturer"
            variant="outlined"
            value={tire_manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            required
            style={{ marginBottom: '30px', marginLeft: '30%', width: '40%' }}
          />
          <TextField
            label="Position"
            variant="outlined"
            value={tire_position}
            onChange={(e) => setPosition(e.target.value)}
            required
            style={{ marginBottom: '30px', marginLeft: '30%', width: '40%' }}
          />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <Button type="submit" variant="contained" color="primary" style={{ width: '15%', marginBottom: '2px' }}>
              Add Tire
            </Button>
          </div>
        </form>
      </div>

      <div style={{
        marginBottom: '80px',
        marginLeft: '30%',
        width: '40%',
        position: 'relative',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '10px',
        padding: '20px',
      }}>
        <Typography variant="h4" gutterBottom>
          Tires in stock
        </Typography>
        {tires.length > 0 ? (
          <Table style={{
            marginBottom: '20px',
            marginLeft: '8%',
            width: '80%',
            position: 'relative',
            textAlign: 'center',
          }}>
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ borderBottom: 'none' }}>Tire Size</TableCell>
                <TableCell align="center" style={{ borderBottom: 'none' }}>Manufacturer</TableCell>
                <TableCell align="center" style={{ borderBottom: 'none' }}>Position</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tires.map(tire => (
                <TableRow key={tire.id}>
                  <TableCell align="center" style={{ borderBottom: 'none' }}>{tire.tire_size}</TableCell>
                  <TableCell align="center" style={{ borderBottom: 'none' }}>{tire.tire_manufacturer}</TableCell>
                  <TableCell align="center" style={{ borderBottom: 'none' }}>{tire.tire_position}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography variant="body1">
            No tires found for this customer.
          </Typography>
        )}
      </div>
    </div>
  );
}
