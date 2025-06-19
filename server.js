require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const contactRoutes = require('./backend/routes/contact');
const cors = require('cors');
const path = require('path');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Serve static files (e.g., CSS, JS, images) if any
app.use(express.static(path.join(__dirname)));
// Routes
app.use('/api/contact', contactRoutes);
// Root route for index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});
// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL, {
}).then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
