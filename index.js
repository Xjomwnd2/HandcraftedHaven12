const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serves static files (HTML, CSS, images, etc.)

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Handcrafted Haven!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
