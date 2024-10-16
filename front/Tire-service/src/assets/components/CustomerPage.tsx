import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { FaTrash } from 'react-icons/fa';

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
    navigate(`/customers/${id}/tires/labels`); // Перейти на страницу печати меток
  };

  // count the quantity just once during the render 
  const numberOfTires = tires.length;

  return (
    <div>
      <h1>Customer Details</h1>
      {customer ? (
      <>
        <p>Name: {customer.customer_name}</p>
        <p>Car Registration Number: {customer.car_registration_number}</p>
        <p>Car Model: {customer.car_model}</p>
        <p>Number of Tires: {numberOfTires}</p> {/* use the value counted*/}
      </>
      ) : (
        <p>Loading customer data...</p>
      )}

      <div>
        <button onClick={handlePrintLabels}>Print Labels</button> {/* Кнопка для печати */}
      </div>

      <h2>Tire Details</h2>
      {tires.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Tire Size</th>
              <th>Manufacturer</th>
              <th>Position</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tires.map(tire => (
              <tr key={tire.id}>
                <td>{tire.tire_size}</td>
                <td>{tire.tire_manufacturer}</td>
                <td>{tire.tire_position}</td>
                <td>
                  <button onClick={() => handleDeleteTire(tire.id)}>
                    <FaTrash color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tires found for this customer.</p>
      )}

      <button onClick={handleAddTire}>Add Tire</button> 
    </div>
  );
}
