const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  const mongoURL = process.env.HOST;

  if (!mongoURL) {
    throw new Error('MongoDB URI is undefined. Please check your .env file.');
  }

  try {
    await mongoose.connect(mongoURL);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
