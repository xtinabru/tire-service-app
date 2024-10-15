import React from 'react';
import { useParams } from 'react-router-dom';
import TireForm from './TireForm';

export default function CustomerPage() {
  const { id } = useParams(); // 
  const currentCustomerId = Number(id); 

  return (
    <div>
      <h1>Customer Details</h1>
      <TireForm customerId={currentCustomerId} />
    </div>
  );
}
