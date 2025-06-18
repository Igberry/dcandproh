require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const contactRoutes = require('./backend/routes/contact');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL, {
}).then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
