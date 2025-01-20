import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;  // Make sure MONGO_URI is set as an environment variable

if (!uri) {
  console.error('MongoDB URI is not provided!');
  process.exit(1);  // Exit if MongoDB URI is not found
}

// Mongoose connection setup with logging
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Define schema and model with explicit collection name (map_data)
const mapDataSchema = new mongoose.Schema({
  mapName: { type: String, required: true },
  src: { type: String, required: true },
  hotspots: [{
    name: { type: String, required: true },
    description: { type: String, required: true },
    top: { type: String, required: true },
    left: { type: String, required: true },
  }],  
}, { collection: 'map_data' });  // Explicitly defining collection name

const MapData = mongoose.model('MapData', mapDataSchema);

// Handler function
export async function handler(event, context) {
  try {
    console.log('Connection state:', mongoose.connection.readyState);

    // Get current database name safely
    const dbName = mongoose.connection.db.databaseName || 'Unknown database';  // Fallback in case it's not available
    console.log('Connected to database:', dbName);

    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));

    // Perform Mongoose query
    const mongooseResults = await MapData.find({});  // Query using the MapData model
    console.log('Mongoose query results count:', mongooseResults.length);

    // Prepare response format
    return {
      statusCode: 200,
      body: JSON.stringify({
        database: dbName,
        collections: collections.map(c => c.name),
        mongooseResults,
      }),
    };
  } catch (err) {
    console.error('Error occurred:', {
      name: err.name,
      message: err.message,
      stack: err.stack,
    });

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
