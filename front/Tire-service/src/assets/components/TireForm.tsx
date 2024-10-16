import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
    fetchTires();
  }, [parsedCustomerId]);

  const fetchTires = () => {
    fetch(`http://localhost:3000/customers/${parsedCustomerId}/tires`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Tires:', data); // Логируем полученные шины
        setTires(data);
      })
      .catch(error => console.error('Error fetching tires:', error));
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newTire = { 
      tire_size, 
      tire_manufacturer, 
      tire_position 
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
        <label>
          Manufacturer:
          <input
            type="text"
            value={tire_manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Position:
          <input
            type="text"
            value={tire_position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Add Tire</button>
      <h2>Tire Details</h2>
      {tires.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Tire Size</th>
              <th>Manufacturer</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {tires.map(tire => (
              <tr key={tire.id}>
                <td>{tire.tire_size}</td>
                <td>{tire.tire_manufacturer}</td>
                <td>{tire.tire_position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tires found for this customer.</p>
      )}
    </form>
  );
}
