// netlify/functions/getCallouts.js
require('dotenv').config();

const mongoose = require('mongoose');
// Check if the URI is being loaded correctly

// Use MongoDB Atlas connection string from environment variables
const uri = process.env.MONGO_URI;
console.log(process.env.MONGO_URI);  
if (!uri) {
  throw new Error("MongoDB connection string (MONGO_URI) is undefined. Set it in your environment variables.");
}

// MongoDB connection (connect once during initialization)
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the callout schema
const calloutSchema = new mongoose.Schema({
  mapName: { type: String, required: true },
  calloutName: { type: String, required: true },
  description: { type: String, required: true },
  top: { type: Number, required: true },
  left: { type: Number, required: true }
});

// Create the Callout model
const Callout = mongoose.model('Callout', calloutSchema);

// Netlify function handler
exports.handler = async function(event, context) {
  try {
    const callouts = await Callout.find();
    return {
      statusCode: 200,
      body: JSON.stringify(callouts),
    };
  } catch (err) {
    console.error("Error fetching callouts:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
