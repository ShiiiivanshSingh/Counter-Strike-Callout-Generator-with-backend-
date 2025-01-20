import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;  // Make sure MONGO_URI is set as an environment variable

if (!uri) {
  console.error('MongoDB URI is not provided!');
  process.exit(1);  // Exit if MongoDB URI is not found
}

// Singleton pattern to reuse the MongoDB connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    // Return the cached connection if it exists
    return cachedDb;
  }

  // Otherwise, establish a new connection and cache it
  const db = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedDb = db;
  console.log('MongoDB connected successfully');
  return cachedDb;
}

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
}, { collection: 'map_data' });

const MapData = mongoose.model('MapData', mapDataSchema);

// Handler function for the serverless function
export async function handler(event, context) {
  try {
    const db = await connectToDatabase();  // Connect to the DB

    console.log('Connection state:', mongoose.connection.readyState);

    // Get the current database name
    const dbName = mongoose.connection.db.databaseName || 'Unknown database';  // Fallback if databaseName isn't available
    console.log('Connected to database:', dbName);

    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));

    // Perform Mongoose query
    const mongooseResults = await MapData.find({});
    console.log('Mongoose query results count:', mongooseResults.length);

    // Prepare and send the response
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
