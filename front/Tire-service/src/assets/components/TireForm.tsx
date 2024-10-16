import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


interface TireFormProps {
  onTireAdded: () => void; // Function for updating data
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

  // Функция для получения данных о шинах
  const fetchTires = () => {
    fetch(`http://localhost:3000/customers/${parsedCustomerId}/tires`)
      .then(response => response.json())
      .then(data => {
        setTires(data);
      })
      .catch(error => console.error('Error fetching tires:', error));
  };

  // Функция для удаления шины
  const handleDeleteTire = (tireId: number) => {
    fetch(`http://localhost:3000/customers/${parsedCustomerId}/tires/${tireId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Обновляем список после удаления
          setTires(tires.filter(tire => tire.id !== tireId));
        } else {
          console.error('Error deleting tire:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting tire:', error));
  };

  // Обработчик отправки формы
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
        onTireAdded();
        fetchTires(); // Обновить список шин после добавления
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
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
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
