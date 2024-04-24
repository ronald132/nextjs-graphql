/*** 
Connects to mongoDB at MONGO_URI 
***/

import mongoose, { ConnectOptions } from 'mongoose'

const MONGO_URI = process.env.MONGO_URI || ''

if (!MONGO_URI.length) {
  throw new Error(
    'Please define the MONGO_URI environment variable in (.env.local)'
  )
}

// A global variable maintains a connection accross hot reloads
// it prevents connections growing exponentially
let cached = global.mongoose
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect(): Promise<any> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    // explicity type as ConnectOtions to check for available properties
    const opts: ConnectOptions = {
      bufferCommands: false,
      maxIdleTimeMS: 10000,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 20000,
    }

    // use a Promise to wait for the established connection
    // this is not instant, it is asynchronouse
    cached.promise = mongoose.connect(MONGO_URI, opts)
  }

  try {
    cached.conn = await cached.promise
  } catch (err) {
    throw new Error(String(err))
  }
}

export default dbConnect
