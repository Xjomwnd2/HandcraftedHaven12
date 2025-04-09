const express = require('express');
const app = express();

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to Handcrafted Haven Backend!');
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

// Export the Express app for Vercel
module.exports = app;