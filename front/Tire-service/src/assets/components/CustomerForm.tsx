import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { TextField, Typography, Button } from '@mui/material';
import newCusPic from '../styles/images/new_customer_pic.png';

interface FormData {
  customerName: string;
  registrationNumber: string;
  carModel: string;
  tireSize: string;
  tireManufacturer: string;
  warehouseName: string;
  numberOfTires: number;
}

const initialState: FormData = {
  customerName: '',
  registrationNumber: '',
  carModel: '',
  tireSize: '',
  tireManufacturer: '',
  warehouseName: '',
  numberOfTires: 0,
};

export default function CustomerForms() {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${newCusPic})`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = '420px 300px'; 
    document.body.style.backgroundPosition = 'left bottom';

    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);

  const clearForm = () => setFormData(initialState);

  // 
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfTires' ? (value === '' ? 0 : parseInt(value)) : value,
    }));
  };

  const handleSubmitTheForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.numberOfTires < 0) return alert('Number of tires cannot be negative.');

    const customerData = {
      customer_name: formData.customerName,
      car_registration_number: formData.registrationNumber,
      car_model: formData.carModel || null,
      tire_size: formData.tireSize || null,
      tire_manufacturer: formData.tireManufacturer || null,
      warehouse_name: formData.warehouseName || null,
      number_of_tires: formData.numberOfTires,
    };

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      alert('Customer added successfully!');
      clearForm();
    } catch (error: unknown) {

      if (error instanceof Error) {
        alert('Error adding customer: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderTextField = (label: string, name: keyof FormData, type = 'text') => (
    <TextField
      label={label}
      name={name}
      type={type}
      variant="outlined"
      fullWidth
      value={formData[name]}
      onChange={handleChange}
      required
      InputLabelProps={{ style: { color: '#001f3f' } }}
      InputProps={{ style: { backgroundColor: '#ffffff', color: '#001f3f' } }}
      sx={{
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#2f8c8f' },
        marginBottom: 2,
      }}
    />
  );

  return (
    <div style={{ 
      maxWidth: 500, 
      margin: 'auto', 
      padding: '20px', 
      position: 'relative', 
      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
      borderRadius: '10px', 
      zIndex: 2,
    }}>
      <Typography variant="h3" sx={{ color: '#1976d2' }} gutterBottom textAlign="center">
        Add a new customer
      </Typography>
      <form onSubmit={handleSubmitTheForm}>
        {renderTextField("Name", "customerName")}
        {renderTextField("Registration Number", "registrationNumber")}
        {renderTextField("Car Model", "carModel")}
        {renderTextField("Tire Size", "tireSize")}
        {renderTextField("Tire Manufacturer", "tireManufacturer")}
        {renderTextField("Warehouse Name", "warehouseName")}
        {renderTextField("Number of Tires", "numberOfTires", "number")}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{
              background: 'linear-gradient(135deg, #0B3D91, #1E90FF)',
              color: '#ffffff',
              '&:hover': { backgroundColor: '#0056b3' },
              width: '40%',
            }}
          >
            {isLoading ? 'Adding...' : 'Add Customer'}
          </Button>
        </div>
      </form>
    </div>
  );
}
