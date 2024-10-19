import React, { useState } from 'react';
import { TextField, Typography, Button } from '@mui/material'; // Импортируем необходимые компоненты из MUI
import CustomButton from './CustomButton';

interface CustomButtonProps {
  children: ReactNode;
  to: string;
}


export default function CustomerForms() {
  const [customerName, setCustomerName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [carModel, setCarModel] = useState('');
  const [tireSize, setTireSize] = useState('');
  const [tireManufacturer, setTireManufacturer] = useState('');
  const [warehouseName, setWarehouseName] = useState('');
  const [numberOfTires, setNumberOfTires] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // clear the form
  const clearForm = () => {
    setCustomerName('');
    setRegistrationNumber('');
    setCarModel('');
    setTireSize('');
    setTireManufacturer('');
    setWarehouseName('');
    setNumberOfTires(0);
  };

  function handleSubmitTheForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // prevent default

    if (numberOfTires < 0) { // check if tires negative number
      alert('Number of tires cannot be negative.');
      return;
    }

    const customerData = { // collect data from the state
      customer_name: customerName,
      car_registration_number: registrationNumber,
      car_model: carModel || null, // null if not present
      tire_size: tireSize || null,
      tire_manufacturer: tireManufacturer || null,
      warehouse_name: warehouseName || null,
      number_of_tires: numberOfTires,
    };

    setIsLoading(true);

    fetch('http://localhost:3000/customers', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json', // note that the data is in JSON
      },
      body: JSON.stringify(customerData), // object to JSON string
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // processing the response
      })
      .then(data => {
        console.log('Success:', data);
        alert('Customer added successfully!');
        // clear the form
        clearForm();
      })
      .catch((error) => {
        console.error('Error', error);
        alert('Error adding customer: ' + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '20px' }}>
      <Typography variant="h3" sx={{ color: '#1976d2' }}gutterBottom textAlign="center">
        Add a new customer
      </Typography>
      <form onSubmit={handleSubmitTheForm}>
        <div>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            InputLabelProps={{ style: { color: '#001f3f' } }} // цвет метки
            InputProps={{
              style: { backgroundColor: '#ffffff', color: '#2f8c8f' }, // цвет поля
            }}
            sx={{
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#2f8c8f' }, // цвет рамки
              marginBottom: 2 // отступ между полями
            }}
          />
        </div>

        <div>
          <TextField
            label="Registration Number"
            variant="outlined"
            fullWidth
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            required
            InputLabelProps={{ style: { color: '#001f3f' } }}
            InputProps={{
              style: { backgroundColor: '#ffffff', color: '#001f3f' },
            }}
            sx={{
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#2f8c8f' },
              marginBottom: 2
            }}
          />
        </div>

        <div>
          <TextField
            label="Car Model"
            variant="outlined"
            fullWidth
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
            required
            InputLabelProps={{ style: { color: '#001f3f' } }}
            InputProps={{
              style: { backgroundColor: '#ffffff', color: '#001f3f' },
            }}
            sx={{
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#2f8c8f' },
              marginBottom: 2
            }}
          />
        </div>

        <div>
          <TextField
            label="Tire Size"
            variant="outlined"
            fullWidth
            value={tireSize}
            onChange={(e) => setTireSize(e.target.value)}
            required
            InputLabelProps={{ style: { color: '#001f3f' } }}
            InputProps={{
              style: { backgroundColor: '#ffffff', color: '#001f3f' },
            }}
            sx={{
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#2f8c8f' },
              marginBottom: 2
            }}
          />
        </div>

        <div>
          <TextField
            label="Tire Manufacturer"
            variant="outlined"
            fullWidth
            value={tireManufacturer}
            onChange={(e) => setTireManufacturer(e.target.value)}
            required
            InputLabelProps={{ style: { color: '#001f3f' } }}
            InputProps={{
              style: { backgroundColor: '#ffffff', color: '#001f3f' },
            }}
            sx={{
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#2f8c8f' },
              marginBottom: 2
            }}
          />
        </div>

        <div>
          <TextField
            label="Warehouse Name"
            variant="outlined"
            fullWidth
            value={warehouseName}
            onChange={(e) => setWarehouseName(e.target.value)}
            required
            InputLabelProps={{ style: { color: '#001f3f' } }}
            InputProps={{
              style: { backgroundColor: '#ffffff', color: '#001f3f' },
            }}
            sx={{
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#2f8c8f' },
              marginBottom: 2
            }}
          />
        </div>

        <div>
          <TextField
            label="Number of Tires"
            type="number"
            variant="outlined"
            fullWidth
            value={numberOfTires || ''}
            onChange={(e) => setNumberOfTires(e.target.value === '' ? 0 : parseInt(e.target.value, 10))}
            required
            InputLabelProps={{ style: { color: '#001f3f' } }}
            InputProps={{
              style: { backgroundColor: '#ffffff', color: '#001f3f' },
            }}
            sx={{
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#2f8c8f' },
              marginBottom: 2
            }}
          />
        </div>

        {/* Оборачивание кнопки в контейнер с flexbox для центрирования */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <CustomButton to="/customers">View Customers</CustomButton>
        </div>
      </form>
    </div>
  );
}


