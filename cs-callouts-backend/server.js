const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();  // Load environment variables

const app = express();
const PORT = 5000;

// Use CORS middleware to allow requests from the frontend
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (e.g., images) from the "public" directory
app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));

// MongoDB connection (using environment variable)
const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Callout schema
const calloutSchema = new mongoose.Schema({
  mapName: { type: String, required: true },
  calloutName: { type: String, required: true },
  description: { type: String, required: true },
  top: { type: Number, required: true },
  left: { type: Number, required: true }
});

// Model
const Callout = mongoose.model('Callout', calloutSchema);

// Routes to fetch callouts from MongoDB
app.get('/api/callouts', async (req, res) => {
  try {
    const callouts = await Callout.find();
    console.log(callouts);  // Log the fetched callouts for debugging
    res.json(callouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
