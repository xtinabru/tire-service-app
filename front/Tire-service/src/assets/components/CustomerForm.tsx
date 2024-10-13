import React, {useState} from 'react'

export default function CustomerForms() {

  const [customerName, setCustomerName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [carModel, setCarModel] = useState('');
  const [tireSize, setTireSize] = useState('');
  const [tireManufacturer, setTireManufacturer] = useState('');
  const [warehouseName, setWarehouseName] = useState('');
  const [numberOfTires, setNumberOfTires] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  // clear the form
  const clearForm = () => {
    setCustomerName('');
    setRegistrationNumber('');
    setCarModel('');
    setTireSize('');
    setTireManufacturer('');
    setWarehouseName('');
    setNumberOfTires(0);
  };

  function handleSubmitTheForm(e: React.FormEvent<HTMLFormElement>){

    e.preventDefault(); //  prevent default

    if (numberOfTires < 0) { // check if tires negative number
      alert('Number of tires cannot be negative.');
      return; 
    }

    const customerData = { //  collect data from the state
      customer_name: customerName,
      car_registration_number: registrationNumber,
      car_model: carModel || null, // null if not present
      tire_size: tireSize || null,
      tire_manufacturer: tireManufacturer || null,
      warehouse_name: warehouseName || null,
      number_of_tires: numberOfTires,
    };

    setIsLoading(true); 

    fetch('http://localhost:3000/customers',{
      method: 'POST', 
      headers: {
        'Content-type': 'application/json', // note that the data is in JSON
      },
      body: JSON.stringify(customerData), // object to JSON string
    })
    .then(response => {
      if (!response.ok){
        throw new Error('Network response was not ok');
      }
      return response.json(); // processing the response
    })
    .then(data => {
      console.log('Success:', data);
      alert('Customer added successfully!');
      // clear the form
      clearForm(); 
    })
    .catch((error) => {
      console.error('Error', error)
      alert('Error adding customer: ' + error.message);
    })
    .finally(() =>{
      setIsLoading(false);
    })
  }

  return (
    <div>
      <h2>Add a new customer</h2>
      <form onSubmit={handleSubmitTheForm}>
        <div>
          <label htmlFor="customerName">Name:</label> 
          <input 
          type="text" 
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          />
        </div>

        <div>
          <label htmlFor="registrationNumber">Registration Number:</label>
          <input
            type="text"
            id="registrationNumber"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="carModel">Car Model:</label>
          <input 
          type="text"
          id="carModel"
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
          required
          />
        </div>

        <div>
          <label htmlFor="tireSize">Tire Size:</label>
          <input type="text"
          id="tireSize"
          value={tireSize}
          onChange={(e) => setTireSize(e.target.value)}
          required 
          />
        </div>

        <div>
          <label htmlFor="tireManufacturer">Tire Manufacturer:</label>
          <input type="text" 
          id="tireManufacturer"
          value={tireManufacturer}
          onChange={(e) => setTireManufacturer(e.target.value)}
          required
          />
        </div>

        <div>
          <label htmlFor="warehouseName">Warehouse Name:</label>
          <input
            type="text"
            id="warehouseName"
            value={warehouseName}
            onChange={(e) => setWarehouseName(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="numberOfTires">Number of Tires:</label>
          <input
            type="number"
            id="numberOfTires"
            value={numberOfTires || ''}
            onChange={(e) => setNumberOfTires(e.target.value === '' ? 0 : parseInt(e.target.value, 10))}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}> {isLoading ? 'Adding...' : 'Add Customer'}</button>
        
      </form>
    </div>
  )
}
