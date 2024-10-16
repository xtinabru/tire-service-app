import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Customer {
  id: number; 
  customer_name: string;
  car_registration_number: string;
}

export default function CustomerList() {

  // create state for customer list
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate(); // initialized useNavigate

  // use useEffect to request data from the server
  useEffect(() => {
    fetch('http://localhost:3000/customers')
      .then(response => response.json())
      .then(data => {
        setCustomers(data); // save received data into the state
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  function handleViewDetails(customerId: number) {
    // navigate to the page with the details
    navigate(`/customers/${customerId}`);
  }

  // Filter customers based on the search term
  const filteredCustomers = customers.filter(customer => 
    customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    customer.car_registration_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Our customers</h2>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name or registration number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '300px' }}
      />
      <ul>
        {/* Use filteredCustomers instead of customers */}
        {filteredCustomers.map((customer) => (
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
