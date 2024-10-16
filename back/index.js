// Import required modules
const express = require('express');
const mysql = require('mysql2'); // MySQL driver
const cors = require('cors'); // For Cross-Origin Resource Sharing
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config(); // Load .env configuration

// Check if essential environment variables are loaded
if (!process.env.DB_USER || !process.env.DB_PASS) {
  console.error('No .env file loaded or missing DB credentials');
  process.exit(1);
}

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request body

// Create MySQL connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

// Test database connection
db.query('SELECT 1 + 1 AS solution', (err, results) => {
  if (err) console.error('Error:', err);
  else console.log('Test result:', results[0].solution); // Expect 2
});

/*********************************************************************/
// Home route
app.get('/', (req, res) => {
  res.send('Hello! This is a server for tire collection');
});

/*********************************************************************/
// Get all customers or filter by name or registration number
app.get('/customers', (req, res) => {
  const { name, registration } = req.query;
  let query = 'SELECT * FROM customers';
  const conditions = [];
  const params = [];

  // Apply filters if provided
  if (name) {
    conditions.push('customer_name LIKE ?');
    params.push(`%${name}%`);
  }
  if (registration) {
    conditions.push('car_registration_number LIKE ?');
    params.push(`%${registration}%`);
  }
  if (conditions.length) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  // Execute the query
  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

/*********************************************************************/
// Create a new customer
app.post('/customers', (req, res) => {
  const {
    customer_name,
    car_registration_number,
    car_model,
    tire_size,
    tire_manufacturer,
    warehouse_name,
    number_of_tires
  } = req.body;

  // Validate required fields
  if (!customer_name || !car_registration_number || !number_of_tires || !car_model || !tire_size || !tire_manufacturer || !warehouse_name) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  const query = `
    INSERT INTO customers (customer_name, car_registration_number, car_model, tire_size, tire_manufacturer, warehouse_name, number_of_tires)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    customer_name,
    car_registration_number,
    car_model,
    tire_size,
    tire_manufacturer,
    warehouse_name,
    number_of_tires
  ];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ id: results.insertId, message: 'Customer tire set added successfully' });
  });
});

/*********************************************************************/
// Get a specific customer by ID
app.get('/customers/:id', (req, res) => {
  const customerId = req.params.id;
  const query = 'SELECT * FROM customers WHERE id = ?';

  db.query(query, [customerId], (err, results) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(results[0]);
  });
});

/*********************************************************************/
// Add tire info for a customer
<<<<<<< HEAD
app.post('/customers/:id/tires', (req, res) => {
    const { tire_size, tire_manufacturer, tire_position } = req.body;

    // Проверка на наличие обязательных полей
    if (!tire_size || !tire_manufacturer || !tire_position) {
        console.error('Received body:', req.body); // Логируем полученные данные
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    // SQL запрос для добавления новой шины
    const query = `INSERT INTO tires (tire_size, tire_manufacturer, tire_position, customer_id) VALUES (?, ?, ?, ?)`;
    
    db.query(query, [tire_size, tire_manufacturer, tire_position, req.params.id], (err, results) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ id: results.insertId, tire_size, tire_manufacturer, tire_position });
    });
});



=======
// Add tire info for a customer
app.post('/customers/:id/tires', (req, res) => {
  const { tire_size, tire_manufacturer, tire_position } = req.body;

  // Проверка на наличие обязательных полей
  if (!tire_size || !tire_manufacturer || !tire_position) {
      console.error('Received body:', req.body); // Логируем полученные данные
      return res.status(400).json({ error: 'Required fields are missing' });
  }

  // SQL запрос для добавления новой шины
  const query = `INSERT INTO tires (tire_size, tire_manufacturer, tire_position, customer_id) VALUES (?, ?, ?, ?)`;
  
  db.query(query, [tire_size, tire_manufacturer, tire_position, req.params.id], (err, results) => {
      if (err) {
          console.error('Error:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(201).json({ id: results.insertId, tire_size, tire_manufacturer, tire_position });
  });
});

>>>>>>> e2bff07335aee00196e79728f8fb67425d9608d3
/*********************************************************************/
// Get all tires for a specific customer
app.get('/customers/:id/tires', (req, res) => {
  const customerId = req.params.id;
  const query = 'SELECT * FROM tires WHERE customer_id = ?';

  db.query(query, [customerId], (err, results) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'No tires found for this customer' });
    }
    res.json(results);
  });
});

/*********************************************************************/
// Delete a customer
app.delete('/customers/:id', (req, res) => {
  const customerId = req.params.id;
  const query = 'DELETE FROM customers WHERE id = ?';

  db.query(query, [customerId], (err, results) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Customer deleted successfully' });
  });
});

/*********************************************************************/
// Delete a specific tire for a customer
app.delete('/customers/:customerId/tires/:tireId', (req, res) => {
  const { customerId, tireId } = req.params;
  const query = 'DELETE FROM tires WHERE id = ? AND customer_id = ?';

  db.query(query, [tireId, customerId], (err, results) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Tire not found for this customer' });
    }
    res.json({ message: 'Tire deleted successfully' });
  });
});

/*********************************************************************/
// route to get tire labels for a specific customer
app.get('/customers/:id/tires/labels', (req, res) => {
  const customerId = req.params.id; // get the customer id from the request

  // SQL query to get tire labels for a specific customer
  const query = `
    SELECT 
      tires.id AS tire_id,
      customers.customer_name,
      customers.car_registration_number,
      tires.tire_size,
      tires.tire_manufacturer,
      tires.tire_position
    FROM 
      tires
    JOIN 
      customers ON tires.customer_id = customers.id
    WHERE 
      customers.id = ?;
  `;

  // Run the query
  db.query(query, [customerId], (err, results) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    // Send the results in JSON format
    res.json(results);
  });
});
/*********************************************************************/
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
