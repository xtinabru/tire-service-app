import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; 

interface TireFormProps {
  onTireAdded: () => void; // Function for updating data
}

export default function TireForm({ onTireAdded }: TireFormProps) { 
  const { customerId } = useParams<{ customerId: string }>(); 
  const parsedCustomerId = Number(customerId); 


  const [tire_size, setSize] = useState('');
  const [tire_manufacturer, setManufacturer] = useState('');
  const [tire_position, setPosition] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault();
    // tire object
    const newTire = { tire_size, tire_manufacturer, tire_position }; 
   
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
      })
      .catch((error) => {
        console.error('Error:', error);
        onTireAdded();
      });
  } 

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Tire Size:
          <input 
            type="text" 
            value={tire_size} 
            onChange={(e) => setSize(e.target.value)} 
            required 
          />
        </label>
      </div>
      <div>
        <label> Manufacturer:
          <input 
            type="text" 
            value={tire_manufacturer} 
            onChange={(e) => setManufacturer(e.target.value)} 
            required 
          />
        </label>
      </div>
      <div>
        <label>Position:
          <input 
            type="text" 
            value={tire_position} 
            onChange={(e) => setPosition(e.target.value)} 
            required 
          />
        </label>
      </div>
      <button type="submit">Add Tire</button>
    </form>
  );
}
