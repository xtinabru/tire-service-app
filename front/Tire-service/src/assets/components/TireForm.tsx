import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; 


export default function TireForm() { 
const { customerId } = useParams<{ customerId: string }>(); // Get customerId from URL
const parsedCustomerId = Number(customerId); // Parse the string to a number

// Create state for tires
const [size, setSize] = useState('');
const [manufacturer, setManufacturer] = useState('');
const [position, setPosition] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault();
    // Create tire object
    const newTire = { size, manufacturer, position, customerId: parsedCustomerId };
    // Send request to the server
    fetch('http://localhost:3000/tires', {
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
      });
  } 

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Tire Size:
          <input 
            type="text" 
            value={size} 
            onChange={(e) => setSize(e.target.value)} 
            required 
          />
        </label>
      </div>
      <div>
        <label> Manufacturer:
          <input 
            type="text" 
            value={manufacturer} 
            onChange={(e) => setManufacturer(e.target.value)} 
            required 
          />
        </label>
      </div>
      <div>
        <label>Position:
          <input 
            type="text" 
            value={position} 
            onChange={(e) => setPosition(e.target.value)} 
            required 
          />
        </label>
      </div>
      <button type="submit">Add Tire</button>
    </form>
  );
}
