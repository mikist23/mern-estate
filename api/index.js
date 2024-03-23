import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
import path from 'path';

dotenv.config();
const __dirname = path.resolve();

const app = express();

app.use(cookieParser());
app.use(express.json());

// Serve static files from the 'client/dist' directory
app.use(express.static(path.join(__dirname, '/client/dist')));

// Define routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Catch-all route handler to serve index.html for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// MongoDB connection
mongoose.connect(process.env.Mongo)
  .then(() => {
    console.log("Connected to MongoDB!");
    // Start the server after successful MongoDB connection
    app.listen(3000, () => {
      console.log("Server running on port 3000!");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
