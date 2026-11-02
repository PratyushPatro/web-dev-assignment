const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas (or local MongoDB fallback)
 */
const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  // Check if connection string is missing or contains placeholder values
  if (!mongoUri || mongoUri.includes('<username>') || mongoUri.includes('<password>')) {
    console.warn('\n⚠️  ==============================================================');
    console.warn('⚠️  MONGODB ATLAS IS NOT CONNECTED YET');
    console.warn('👉 Please update your .env file with your actual MongoDB Atlas URI.');
    console.warn('   Example: MONGO_URI=mongodb+srv://myUser:myPass@cluster0.abcde.mongodb.net/studentDB');
    console.warn('   The server is running so you can test GET http://localhost:5000/');
    console.warn('==============================================================\n');
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('👉 Make sure your MongoDB Atlas cluster is active and IP Access is set to 0.0.0.0/0 (Allow from anywhere).');
    return false;
  }
};

module.exports = connectDB;
