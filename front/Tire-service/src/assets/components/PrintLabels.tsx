import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Label {
  tire_id: number;
  customer_name: string;
  car_registration_number: string;
  tire_size: string;
  tire_manufacturer: string;
  tire_position: string;
}

export default function PrintLabels() {
  const { id } = useParams(); // Get client id from URL
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
    <div>
      <h1>Print tire labels</h1>
      {labels.length > 0 ? (
        <div>
          {labels.map(label => (
            <div key={label.tire_id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
              <p>Tire ID: {label.tire_id}</p>
              <p>Customer Name: {label.customer_name}</p>
              <p>Car Registration Number: {label.car_registration_number}</p>
              <p>Tire Size: {label.tire_size}</p>
              <p>Tire Manufacturer: {label.tire_manufacturer}</p>
              <p>Tire Position: {label.tire_position}</p>
            </div>
          ))}
          <button onClick={handlePrint}>Print</button> 
        </div>
      ) : (
        <p>There are no labels for this customer.</p>
      )}
    </div>
  );
}
