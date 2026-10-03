import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import contractorRoutes from './routes/contractor.js';
import workerRoutes from './routes/worker.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3000);

if (
  !process.env.JWT_SECRET ||
  process.env.JWT_SECRET === 'your_jwt_secret_key_here_change_in_production'
) {
  throw new Error('Set JWT_SECRET to a private random value in the backend .env file before starting the server');
}

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contractor', contractorRoutes);
app.use('/api/worker', workerRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'Server is running',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ 
    success: false, 
    message: err.message || 'Internal Server Error' 
  });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bcow_db');
    console.log('✓ MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`
╔═══════════════════════════════════════╗
║     BCOW Backend Server Started       ║
║     Port: ${PORT}                          ║
║     Environment: ${process.env.NODE_ENV || 'development'}        ║
╚═══════════════════════════════════════╝
  `);
    });
  } catch (error) {
    console.error('✗ Backend startup failed:', error);
    process.exitCode = 1;
  }
};

startServer();
