import mongoose from 'mongoose';

// Parse and sanitize MongoDB URI
const parseMongoURI = (uri) => {
  try {
    const sanitizedUri = uri.replace(
      /(mongodb:\/\/)([^:]+):([^@]+)@/,
      (match, protocol, username, password) => {
        const encodedUsername = encodeURIComponent(username);
        const encodedPassword = encodeURIComponent(password);
        return `${protocol}${encodedUsername}:${encodedPassword}@`;
      }
    );
    return sanitizedUri;
  } catch (error) {
    console.error('Error parsing MongoDB URI:', error);
    return uri;
  }
};

const uri = parseMongoURI(process.env.MONGO_URI);

if (!uri) {
  console.error('MongoDB URI is not provided!');
  process.exit(1);
}

// Singleton pattern to reuse the MongoDB connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const db = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: {
      version: '1',
      strict: true,
      deprecationErrors: true,
    },
    maxPoolSize: 10,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });

  cachedDb = db;
  console.log('MongoDB connected successfully');
  return cachedDb;
}

// Define schema and model
const mapDataSchema = new mongoose.Schema({
  mapName: { type: String, required: true },
  src: { type: String, required: true },
  hotspots: [{
    name: { type: String, required: true },
    description: { type: String, required: true },
    top: { type: String, required: true },
    left: { type: String, required: true },
  }],
}, { 
  collection: 'map_data',
  timestamps: true 
});

const MapData = mongoose.model('MapData', mapDataSchema);

// Handler function
export async function handler(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const db = await connectToDatabase();

    console.log('Connection state:', mongoose.connection.readyState);
    const dbName = mongoose.connection.db.databaseName || 'Unknown database';
    console.log('Connected to database:', dbName);

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));

    const mongooseResults = await MapData.find({}).lean().exec();
    console.log('Mongoose query results count:', mongooseResults.length);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Cache-Control': 'public, max-age=300'
      },
      body: JSON.stringify({
        success: true,
        data: mongooseResults
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
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({ 
        success: false,
        error: err.message 
      }),
    };
  }
}

// Connection event handlers
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});
