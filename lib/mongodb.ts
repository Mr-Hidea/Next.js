import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

const MONGODB_USERNAME = 'vofadipe';
const MONGODB_PASSWORD = 'uEhA4EdV76sVnXVC';
const MONGODB_CLUSTER_NAME = 'Advantagetest1';
const MONGODB_DATABASE_NAME = 'bf1vlv2';

const MONGODB_URI = process.env.MONGODB_URI || `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER_NAME}.${MONGODB_DATABASE_NAME}.mongodb.net/`;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/**
 * Global is used to maintain a cached connection across hot reloads in development.
 * This prevents connections growing exponentially during API Route usage.
 */
interface Global {
  mongoose?: { conn: mongoose.Connection | null; promise: Promise<typeof mongoose> | null };
  _mongoClientPromise?: Promise<MongoClient> | null;
}

declare var global: Global;

let cachedMongoose = global.mongoose;
let cachedMongoClient = global._mongoClientPromise;

if (!cachedMongoose) {
  cachedMongoose = global.mongoose = { conn: null, promise: null };
}

if (!cachedMongoClient) {
  cachedMongoClient = global._mongoClientPromise = null;
}

const connectToDatabase = async () => {
  if (cachedMongoose?.conn) {
    return cachedMongoose.conn;
  }

  if (!cachedMongoose?.promise) {
    const opts = {
      bufferCommands: false,
    };

    cachedMongoose.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cachedMongoose.conn = await cachedMongoose.promise;
  return cachedMongoose.conn;
};

const connectToMongoClient = async () => {
  const options = {};

  if (process.env.NODE_ENV === 'development') {
    if (!cachedMongoClient) {
      const client = new MongoClient(MONGODB_URI, options);
      cachedMongoClient = global._mongoClientPromise = client.connect();
    }
    return cachedMongoClient;
  } else {
    const client = new MongoClient(MONGODB_URI, options);
    return client.connect();
  }
};

export { connectToDatabase, connectToMongoClient };