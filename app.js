const express = require('express');
const app = express();
const port = 3000;

// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define a route handler for a custom endpoint
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'silk Smith' }
  ];

  res.json(users);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
