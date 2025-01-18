// netlify/functions/getCallouts.js
const mongoose = require('mongoose');
// MongoDB connection string (use environment variable for security)
// Use MongoDB Atlas connection string instead of localhost
const uri = 'mongodb+srv://shivanshpratapsingh0807:AqJar5s8xRsOTVR2@callouts.avphp.mongodb.net/';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// MongoDB connection
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

exports.handler = async function(event, context) {
  try {
    const callouts = await Callout.find();
    return {
      statusCode: 200,
      body: JSON.stringify(callouts)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message })
    };
  }
};
