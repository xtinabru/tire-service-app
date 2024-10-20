import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { FaTrash } from 'react-icons/fa';
import { Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Customer {
  id: number;
  customer_name: string;
  car_registration_number: string;
  car_model: string;
  number_of_tires: number;
}

interface Tire {
  id: number;
  tire_size: string;
  tire_manufacturer: string;
  tire_position: string;
}

export default function CustomerPage() {
  const { id } = useParams(); // get ID of the client from URL
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [tires, setTires] = useState<Tire[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  // Function to get clients data
  const fetchCustomer = useCallback(() => {
    fetch(`http://localhost:3000/customers/${id}`)
      .then(response => response.json())
      .then(data => {
        setCustomer(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching customer:', error);
        setLoading(false);
      });
  }, [id]); 

  // Function to get tires data
  const fetchTires = useCallback(() => {
    fetch(`http://localhost:3000/customers/${id}/tires`)
      .then((response) => response.json())
      .then((data) => {
        setTires(data);
      })
      .catch((error) => {
        console.error('Error fetching tires:', error);
      });
  }, [id]); 

  useEffect(() => {
    fetchCustomer(); // Upload data - first render 
    fetchTires(); // upload data about tires 
  }, [fetchCustomer, fetchTires]);
  
  // function to delete tire  
  const handleDeleteTire = (tireId: number) => {
    fetch(`http://localhost:3000/customers/${id}/tires/${tireId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // delete the tire from the list
          setTires(tires.filter(tire => tire.id !== tireId));
        } else {
          console.error('Error deleting tire:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error deleting tire:', error);
      });
  };

  // Loading state handler
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleAddTire = () => {
    navigate(`/customers/${id}/add-tire`); 
  };

  const handlePrintLabels = () => {
    navigate(`/customers/${id}/tires/labels`);
  };

  // count the quantity just once during the render 
  const numberOfTires = tires.length;

  return (
    <div style={{ padding: '20px', maxWidth: '80%', maxHeight: '100vh', marginBottom: '30px', marginLeft: '10%', overflowY: 'auto' }}>
    <Typography variant="h4" gutterBottom textAlign="center" sx={{ color: '#1976d2'}} style={{ maxWidth: '100%'}}>
      Customer Details
    </Typography>
      {customer ? (
      <>
        <Typography variant="body1" sx={{ color: '#1976d2' }} style={{ maxWidth: '100%', marginLeft:'10%', marginTop:'2%', fontSize: '30px'}}>Name: <span style={{ color: 'black' }}>{customer.customer_name}</span></Typography>
        <Typography variant="body1" sx={{ color: '#1976d2' }}style={{ maxWidth: '100%', marginLeft:'10%',fontSize: '20px'}}>Car Registration Number: <span style={{ color: 'black' }}>{customer.car_registration_number}</span></Typography>
        <Typography variant="body1" sx={{ color: '#1976d2' }}style={{ maxWidth: '100%', marginLeft:'10%', fontSize: '20px'}}>Car Model: <span style={{ color: 'black' }}>{customer.car_model}</span></Typography>
        <Typography variant="body1" sx={{ color: '#1976d2' }}style={{ maxWidth: '100%', marginLeft:'10%', fontSize: '20px'}}>Number of Tires: <span style={{ color: 'black' }}>{numberOfTires}</span></Typography>
      </>
      ) : (
        <p>Loading customer data...</p>
      )}

      <div style={{ textAlign: 'center', }}>
        <Button variant="contained" onClick={handlePrintLabels} sx={{ backgroundColor: '#1976d2', color: '#ffffff',  marginBottom: '2%' }}>Print Labels</Button>
      </div>

      <Typography variant="h4" gutterBottom textAlign="center" sx={{ color: '#1976d2', marginBottom: '2%', maxWidth: '100%'}}>
        Tire Details
      </Typography>
      {tires.length > 0 ? (
        <TableContainer component={Paper} style={{ textAlign: 'center', maxWidth: '80%',marginLeft:'10%', marginTop:'1%' }}>
          <Table style={{ textAlign: 'center' }}>
            <TableHead style={{ textAlign: 'center', maxWidth: '80%' }}>
              <TableRow>
                <TableCell>Tire Size</TableCell>
                <TableCell>Manufacturer</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ textAlign: 'center', maxWidth: '80%' }}>
              {tires.map(tire => (
                <TableRow key={tire.id} >
                  <TableCell>{tire.tire_size}</TableCell>
                  <TableCell>{tire.tire_manufacturer}</TableCell>
                  <TableCell>{tire.tire_position}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteTire(tire.id)} sx={{ backgroundColor: '#d32f2f', color: '#ffffff' }}>
                      <FaTrash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center' }}>No tires found for this customer.</Typography>
      )}

      <div style={{ textAlign: 'center', margin: '20px 0',marginTop: '30px', marginBottom: '50px'}}>
        <Button variant="contained" onClick={handleAddTire} sx={{ backgroundColor: '#1976d2', color: '#ffffff' }}>Add Tire</Button>
      </div>
    </div>
  );
}
