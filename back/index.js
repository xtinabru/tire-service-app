const express = require('express');
const mysql = require('mysql2'); // to connect to mysql database
const cors = require('cors'); // import CORS
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();// to use .env file

if (!process.env.DB_USER || !process.env.DB_PASS) {
  console.error('No .env file loaded');
  process.exit(1); // exit the program
}

app.use(cors()); // allow request from any source
app.use(express.json()); // for parsing application/json

//create connection to database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// connect to database
db.connect((err) => {
  if (err) {
    throw err; // if there is an error, throw an error
  }
  console.log('Connected to database'); // successful connection
});

// check the connection to the database
db.query('SELECT 1 + 1 AS solution', (err, results) => {
  if (err) {
    console.error('Error :', err); // if there is an error, log the error
    return; // exit the function
  }
  console.log('Test result:', results[0].solution); // Expected value: 2
});

 /*********************************************************************/
// route for the home page
app.get('/', (req, res) => {
  res.send('Hello! This is a server for tires collection');
});

 /*********************************************************************/
// route to get all customers
app.get('/customers', (req, res) => {

  // get the query parameters name and registration from the request
  const {name, registration} = req.query; 
  let query = 'SELECT * FROM customers'; // base query

  // if the name query parameter is present
  if (name || registration) {
    query += ' WHERE'; // add a WHERE clause to the query
  }
  // add filtration conditions to the query
  const conditions = []; // array to store the conditions
  const params = []; // array to store the parameters

  // if the name query parameter is present
  if (name) {
    conditions.push('customer_name LIKE ?'); //add a condition to filter by name
    params.push(`%${name}%`); // add the parameter to the array
}
  // if the registration query parameter is present
  if (registration) {
    conditions.push('car_registration_number LIKE ?'); // add a condition to filter by registration
    params.push(`%${registration}%`); // add the parameter to the array
}
  // after adding all the conditions we join them with AND
  query += ' ' + conditions.join(' AND ');

  // then we run the query
  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error :', err); // if there is an error, log the error
      res.status(500).json({error: 'Internal Server Error'}); // send an error response
    } res.json(results); // send the results in JSON format
  });
});

/*********************************************************************/
// route to CREATE a new customer
app.post('/customers', (req, res) => { 
  const {
    customer_name,
    car_registration_number,
    car_model,
    tire_size,
    tire_manufacturer,
    warehouse_name,
    number_of_tires,
  } = req.body;

  // Check if all required fields are present
  if (!customer_name || !car_registration_number || !number_of_tires ||!car_model || !tire_size || !tire_manufacturer || !warehouse_name)
   {return res.status(400).json({ error: 'Required fields are missing' }); 
   // if any of the required fields is missing, send an error response
  }
   // sql query to insert a new customer
  const query = 
  `INSERT INTO customers (customer_name, car_registration_number,
   car_model, tire_size, tire_manufacturer, 
   warehouse_name, number_of_tires)
   VALUES (?, ?, ?, ?, ?, ?, ?)`;

  // parameters for the query
   const params = [
    customer_name,
    car_registration_number,
    car_model || null, //  if the model isn't specified, pass null
    tire_size || null, // if the size isn't specified, pass null
    tire_manufacturer || null, // if the manufacturer isn't specified, pass null
    warehouse_name || null, // if the warehouse isn't specified, pass null
    number_of_tires,];

  // run the query
    db.query(query, params, (err, results) => {
      if (err) {
      console.error('Error:', err); // if there is an error, log the error
      return res.status(500).json({ error: 'Internal Server Error' }); // error
      }
      // send a success response
      res.status(201).json({ id: results.insertId, message: 
        'Customer tire set added successfully' });
  });
});

 /*********************************************************************/
// route to get a specific customer
app.get('/customers/:id', (req, res) => {
  const customerId = req.params.id; // get the customer id from the request

  // sql query to get a customer by id
  const query = 'SELECT * FROM customers WHERE id = ?';

  // run the query
  db.query(query, [customerId], (err, results) => {
    if (err) {
      console.error('Error:', err); // if there is an error, log the error
      return res.status(500).json({ error: 'Internal Server Error' }); // error
    }
    // if there are no results, send a 404 response
    if (results.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    // send the results in JSON format
    res.json(results[0]);
  });
});

/*********************************************************************/
// route to ADD tires info
app.post('/customers/:id/tires', (req, res) => {
  const customerId = req.params.id; // get the customer id from the request
  // get the tire info from the request 
  const { tire_size, tire_manufacturer, tire_position } = req.body; 

  // Check if all required fields are present
  if (!tire_size || !tire_manufacturer || !tire_position) {
     // if any of the required fields is missing, send an error response
    return res.status(400).json({ error: 'Required fields are missing' }); 
  }
  // sql query to insert a new tire info
  const query = 
  ` INSERT INTO tires (customer_id, tire_size, tire_manufacturer, tire_position)
    VALUES (?, ?, ?, ?)`;

  // parameters for the query
  const params = [customerId,tire_size, tire_manufacturer, tire_position];

  // run the query
  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error:', err); // if there is an error, log the error
      return res.status(500).json({ error: 'Internal Server Error' }); // error
    }
    // send a success response
    res.json({ message: 'Tire info added successfully' });
  });
});
 /*********************************************************************/
// route to get all tires for a specific customer
app.get('/customers/:id/tires', (req, res) => {
  const customerId = req.params.id; // get the customer id from the request

  // sql query to get all tires for a specific customer
  const query = 'SELECT * FROM tires WHERE customer_id = ?';

  // run the query
  db.query(query, [customerId], (err, results) => { 
    if (err) {
      console.error('Error:', err); // if there is an error, log the error
      return res.status(500).json({ error: 'Internal Server Error' }); // error
    }
    // if there are no results, send a 404 response
    if (results.length === 0) {
      return res.status(404).json({ error: 'No tires found for this customer' });
    }
    // send the results in JSON format
    res.json(results);
  });
});

/*********************************************************************/
// route to DELETE a customer
app.delete('/customers/:id', (req, res) => {
  const customerId = req.params.id; // get the customer id from the request 

  // sql query to delete a customer by id
  const query = 'DELETE FROM customers WHERE id = ?';

  // run the query
  db.query(query, [customerId], (err, results) => {
    if (err) {
      console.error('Error:', err); // if there is an error, log the error
      return res.status(500).json({ error: 'Internal Server Error' }); // error
    }
    // send a success response
    res.json({ message: 'Customer deleted successfully' });
  }); 
});

/*********************************************************************/
// route to DELETE a specific tire for a customer
app.delete('/customers/:customerId/tires/:tireId', (req, res) => {
  const { customerId, tireId } = req.params; // get the customer id and tire id from the request

  // sql query to delete a tire by id
  const query = 'DELETE FROM tires WHERE id = ? AND customer_id = ?';

  // run the query
  db.query(query, [tireId, customerId], (err, results) => {
    if (err) {
      console.error('Error:', err); // if there is an error, log the error
      return res.status(500).json({ error: 'Internal Server Error' }); // error
    }
    // check if any rows were affected
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Tire not found for this customer' }); // if no rows were deleted
    }
    // send a success response
    res.json({ message: 'Tire deleted successfully' });
  });
});

 /*********************************************************************/
 app.get('/customers/:id/tires/labels', (req, res) => {
  const customerId = req.params.id; // get the customer id from the request

  // sql query to get all tires for a specific customer with customer and warehouse info
  const query = `
    SELECT 
      tires.id AS tire_id, 
      customers.id AS customer_id,
      customers.customer_name,
      customers.car_registration_number,
      tires.tire_size,
      tires.tire_manufacturer,
      tires.tire_position,
      warehouses.warehouse_name,
      warehouses.warehouse_address,
      warehouses.shelf_location,
      warehouses.contact_person,
      warehouses.contact_phone
    FROM tires
    JOIN customers ON tires.customer_id = customers.id
    JOIN warehouses ON tires.warehouse_id = warehouses.id
    WHERE customers.id = ?`;

  // run the query
  db.query(query, [customerId], (err, results) => {
    // if there is an error, log the error
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Internal Server Error' }); // error
    }
    // if there are no results, send a 404 response
    if (results.length === 0) {
      return res.status(404).json({ error: 'No tires found for this customer' });
    }
    // send the results in JSON format
    res.json(results);
  });
});

 /*********************************************************************/
// to run the server on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

