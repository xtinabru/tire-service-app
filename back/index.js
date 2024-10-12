const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json

// route for the home page
app.get('/', (req, res) => {
  res.send('Hello! This is a server for tires collection');
});

// to run the server on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

