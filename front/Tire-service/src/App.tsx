// App.tsx (или App.js, в зависимости от вашего проекта)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './assets/components/HomePage';
import CustomerList from './assets/components/CustomerList';
import CustomerPage from './assets/components/CustomerPage';
import TireForm from './assets/components/TireForm';
import TireList from './assets/components/TireList';
import CustomerForms from './assets/components/CustomerForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/:id" element={<CustomerPage />} />
        <Route path="/add-customer" element={<CustomerForms />} />
        <Route path="/customers/:customerId/add-tire" element={<TireForm onTireAdded={() => {}} />} /> 
        <Route path="/tires/:customerId" element={<TireList />} />
      </Routes>
    </Router>
  );
}

export default App;
