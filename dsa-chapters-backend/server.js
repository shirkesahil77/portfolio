// /server.js
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const connectDB = require("./src/config/db");
const topicRoutes = require("./src/core/dsaTopics/routes/topic-routes");
// const { errorHandler } = require("./middleware/errorMiddleware");
const securityRoutes = require('./src/core/security/routes/security-routes');

require('dotenv').config(); // Load environment variables from .env

const app = express();
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// app.use(bodyParser.json())

// Use topic routes
app.use('/api/auth', securityRoutes);
app.use("/api", topicRoutes);

// Error handler middleware
// app.use(errorHandler);


// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
