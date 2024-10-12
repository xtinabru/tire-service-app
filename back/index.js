const express = require('express');
const mysql = require('mysql2'); // to connect to mysql database
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();// to use .env file

if (!process.env.DB_USER || !process.env.DB_PASS) {
  console.error('No .env file loaded');
  process.exit(1); // exit the program
}

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
  console.log('Результат запроса:', results[0].solution); // Expected value: 2
});

 /*************************************************/

// route for the home page
app.get('/', (req, res) => {
  res.send('Hello! This is a server for tires collection');
});

// to run the server on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

