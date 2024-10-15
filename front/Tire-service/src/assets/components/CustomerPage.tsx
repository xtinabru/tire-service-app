import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { FaTrash } from 'react-icons/fa';

export default function CustomerPage() {
  const { id } = useParams(); // get ID of the client from URL
  const [customer, setCustomer] = useState(null);
  const [tires, setTires] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); //  use useNavigate for navigation

  useEffect(() => {
    fetchCustomer(); // Upload data - first render 
    fetchTires(); // upload data about tires 
  }, [id]);

  // Function to get clients data
  const fetchCustomer = () => {
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
  };

  // Function to get tires data
 const fetchTires = () => {
    fetch(`http://localhost:3000/customers/${id}/tires`)
      .then(response => response.json())
      .then(data => {
        setTires(data);
        if (customer) {
          setCustomer(prevCustomer => ({
            ...prevCustomer,
            number_of_tires: data.length, // renew the quantity
          }));
        }
      })
      .catch(error => {
        console.error('Error fetching tires:', error);
      });
  };

  // function to delete tire  
  const handleDeleteTire = (tireId) => {
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
  useEffect(() => {
    if (customer) {
      setCustomer(prevCustomer => ({
        ...prevCustomer,
        number_of_tires: tires.length, // renew the quantity of tires
      }));
    }
  }, [tires]); // This useEffect works when tires [] is changes 

  // Loading state handler
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleAddTire = () => {
    navigate(`/customers/${id}/add-tire`); 
  };

  return (
    <div>
      <h1>Customer Details</h1>
      <p>Name: {customer.customer_name}</p>
      <p>Car Registration Number: {customer.car_registration_number}</p>
      <p>Car Model: {customer.car_model}</p>
      <p>Warehouse Name: {customer.warehouse_name}</p>
      <p>Number of Tires: {customer.number_of_tires}</p>

      <h2>Tires</h2>
      {tires.length > 0 ? (
        <ul>
          {tires.map(tire => (
            <li key={tire.id}>
              {tire.tire_size} - {tire.tire_manufacturer} ({tire.tire_position})

          <button onClick={() => handleDeleteTire(tire.id)} 
          style={{ marginLeft: '10px', border: 'none', 
          background: 'none', cursor: 'pointer' }}>
                <FaTrash color="red" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tires found for this customer.</p>
      )}

      <button onClick={handleAddTire}>Add Tire</button> 
    </div>
  );
}
