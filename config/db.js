const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas (or local MongoDB fallback)
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    // Beginner-friendly check for unconfigured or placeholder connection string
    if (!mongoUri || mongoUri.includes('<username>') || mongoUri.includes('<password>')) {
      console.error('❌ Configuration Error: MONGO_URI is missing or contains placeholder values (<username> / <password>).');
      console.error('👉 Please update your .env file with your actual MongoDB Atlas connection string before starting the server.');
      console.error('   Example: MONGO_URI=mongodb+srv://myUser:mySecretPassword@cluster0.abcde.mongodb.net/studentDB?retryWrites=true&w=majority\n');
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('👉 Make sure your MongoDB Atlas cluster is active and your current IP address is whitelisted (0.0.0.0/0).');
    // Exit process with failure code
    process.exit(1);
  }
};

module.exports = connectDB;
