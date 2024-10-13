import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


interface Customer {
  id: number; 
  customer_name: string;
  car_registration_number: string;
}

export default function CustomerList() {

  // create state for customer list
  const [customers, setCustomers] = useState<Customer[]>([]); 
  const navigate = useNavigate(); // initialized useNavigate

  // use useEffect to to request data from the server

  useEffect(() => {
    fetch('http://localhost:3000/customers')
    .then(response => response.json())
    .then(data => {
      setCustomers(data); // save received data into the state
    })
    .catch(error => {
      console.error('Error fetching customers:', error)
    })
  }, [])

  function handleViewDetails(customerId: number){
    // navigate to the page with the details
    navigate(`/customers/${customerId}`);
  }

  return (
    <div>
      <h2>Our customers</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.customer_name} - {customer.car_registration_number}
            <button onClick={() => handleViewDetails(customer.id)}>
            View Details
          </button>
          </li>
        ))}
      </ul>
    </div>
  );
}