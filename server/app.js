const express          = require('express');
const cors             = require('cors');
const helmet           = require('helmet');
const morgan           = require('morgan');
const rateLimit        = require('express-rate-limit');
const path             = require('path');
require('dotenv').config();

const authRoutes        = require('./routes/auth');
const userRoutes        = require('./routes/users');
const bookingRoutes     = require('./routes/bookings');
const serviceRoutes     = require('./routes/services');
const serviceCenterRoutes = require('./routes/serviceCenters');
const adminRoutes       = require('./routes/admin');

const errorHandler      = require('./middleware/errorHandler');

const __dirnameResolved = path.resolve();          // clearer name

const app = express();

/* ───────────────────────────────── SECURITY ─────────────────────────────── */
app.use(helmet());

/* ──────────────────────────────────  CORS  ───────────────────────────────── */
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

/* ────────────────────────────── RATE LIMITING ───────────────────────────── */
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1_000, // 15 min
  max:      Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message:  { success: false, message: 'Too many requests, try again later.' },
  standardHeaders: true,
  legacyHeaders:   false,
});
app.use('/api/', limiter);

/* ───────────────────────────── REQUEST PARSERS ──────────────────────────── */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/* ──────────────────────────────── LOGGING ───────────────────────────────── */
app.use(
  morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined')
);

/* ───────────────────────────── HEALTH CHECK ─────────────────────────────── */
app.get('/api/health', (_req, res) =>
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  })
);

/* ─────────────────────────────── API ROUTES ─────────────────────────────── */
app.use('/api/auth',           authRoutes);
app.use('/api/users',          userRoutes);
app.use('/api/bookings',       bookingRoutes);
app.use('/api/services',       serviceRoutes);
app.use('/api/service-centers',serviceCenterRoutes);
app.use('/api/admin',          adminRoutes);

/* ───────────────────────────── FRONT-END STATIC ─────────────────────────── */
app.use(express.static(path.join(__dirnameResolved, 'client', 'build')));

/* 
   ⚠️ 1. React catch-all MUST come *after* API routes
         (you already did that) but BEFORE the 404 handler.
*/
app.get('*', (_req, res) =>
  res.sendFile(
    path.join(__dirnameResolved, 'client', 'build', 'index.html')
  )
);

/* ─────────────────────────────── 404 HANDLER ────────────────────────────── */
/* ⚠️ 2. This handler is *never reached* because the catch-all above grabs
         every GET request.  Either:
         a) delete it (recommended—let React show its own 404 page), OR
         b) change it to `app.all('/api/*', …)` so only unknown API paths hit it.
*/
app.all('*', (req, res) =>
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  })
);

/* ───────────────────────────── GLOBAL ERRORS ────────────────────────────── */
app.use(errorHandler);

module.exports = app;
