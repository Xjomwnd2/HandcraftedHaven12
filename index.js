const express = require('express');
const app = express();
const port = 3000;

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to Handcrafted Haven Backend!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
