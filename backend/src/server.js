const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();

// Security: Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});

// Security and utility middlewares
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' })); // In production, replace '*' with actual frontend URL
app.use(express.json({ limit: '1mb' })); // Limit request size to prevent DOS
app.use(morgan('dev'));
app.use('/api', limiter); // Apply rate limiter to all /api routes

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'GreenPrint API is running' });
});

const assessmentRoutes = require('./routes/assessmentRoutes');

const userRoutes = require('./routes/userRoutes');

app.use('/api/assessments', assessmentRoutes);
app.use('/api/users', userRoutes);

// Serve static frontend files from the dist folder
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Route all non-API requests to the React frontend (for client-side routing)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  // Do not leak internal error details to client
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
