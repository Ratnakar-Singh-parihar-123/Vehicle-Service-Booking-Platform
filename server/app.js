const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const path = require('path');

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');
const serviceRoutes = require('./routes/services');
const serviceCenterRoutes = require('./routes/serviceCenters');
const adminRoutes = require('./routes/admin');
const errorHandler = require('./middleware/errorHandler');

const app = express();

/* ─────────────────────────────── SECURITY ─────────────────────────────── */
app.use(helmet());

/* ────────────────────────────────  CORS  ──────────────────────────────── */
const allowedOrigins = [
  process.env.CLIENT_URL,   // Production frontend (Render/Vercel/Netlify)
  'http://localhost:3000',  // Local React frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.warn(`❌ CORS blocked request from: ${origin}`);
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

/* ────────────────────────────── RATE LIMITING ─────────────────────────── */
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: { success: false, message: 'Too many requests, try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

/* ───────────────────────────── REQUEST PARSERS ────────────────────────── */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/* ──────────────────────────────── LOGGING ────────────────────────────── */
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

/* ───────────────────────────── HEALTH CHECK ──────────────────────────── */
app.get('/api/health', (_req, res) =>
  res.status(200).json({
    success: true,
    message: '✅ Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  })
);

/* ─────────────────────────────── API ROUTES ──────────────────────────── */
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/service-centers', serviceCenterRoutes);
app.use('/api/admin', adminRoutes);

/* ─────────────────────────────── 404 HANDLER ─────────────────────────── */
app.all('/api/*', (req, res) =>
  res.status(404).json({
    success: false,
    message: `API route ${req.originalUrl} not found`,
  })
);

/* ───────────────────────────── STATIC FILES ──────────────────────────── */
// React frontend build serve karna (monorepo style Render deploy)
const __dirnamePath = path.resolve();
app.use(express.static(path.join(__dirnamePath, 'client', 'build')));

// Catch-all for React Router
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirnamePath, 'client', 'build', 'index.html'));
});

/* ───────────────────────────── GLOBAL ERRORS ─────────────────────────── */
app.use(errorHandler);

module.exports = app;