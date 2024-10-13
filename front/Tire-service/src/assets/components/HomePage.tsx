import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Customer Management System</h1>
      <Link to="/customers">View Customers</Link>
      <br />
      <Link to="/add-customer">Add New Customer</Link>
      <br />
      <Link to="/add-tire">Add New Tire Information</Link>
    </div>
  );
}

export default HomePage;