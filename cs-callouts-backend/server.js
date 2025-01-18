// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Use CORS middleware to allow requests from the frontend
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/callouts', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

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
    res.json(callouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
