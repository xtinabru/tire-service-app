import React from 'react'
import CustomerForm from '../assets/components/CustomerForm'
import CustomerList from '../assets/components/CustomerList'
import TireList from '../assets/components/TireList'

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Tire Service!</h1>
      <CustomerForm/>
      <h2>Customer List</h2>
      <CustomerList/>
      <h2>Available tires</h2>
      <TireList/>
    </div>
  )
}
