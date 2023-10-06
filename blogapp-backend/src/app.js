const express = require('express');
const app = express();
const port = process.env.EXPRESS_PORT || 5000;

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});