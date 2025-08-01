# Deployment Guide

This guide covers various deployment options for the Vehicle Service Booking Platform.

## Table of Contents
1. [Production Environment Setup](#production-environment-setup)
2. [Database Setup](#database-setup)
3. [Backend Deployment](#backend-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Environment Variables](#environment-variables)
6. [SSL Configuration](#ssl-configuration)
7. [Monitoring and Logging](#monitoring-and-logging)

## Production Environment Setup

### Prerequisites
- Node.js 16+ 
- MongoDB 4.4+
- Domain name with DNS access
- SSL certificate (Let's Encrypt recommended)

### Server Requirements
- **Minimum**: 2 CPU cores, 4GB RAM, 20GB storage
- **Recommended**: 4 CPU cores, 8GB RAM, 50GB storage
- Ubuntu 20.04 LTS or similar Linux distribution

## Database Setup

### Option 1: MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Configure network access (whitelist your server IP)
4. Create database user
5. Get connection string

### Option 2: Self-hosted MongoDB
```bash
# Install MongoDB
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod

# Create database and user
mongo
use vehicle-service-booking
db.createUser({
  user: "dbuser",
  pwd: "secure_password",
  roles: ["readWrite"]
})
```

## Backend Deployment

### Option 1: Traditional VPS/Server

1. **Clone and setup**
```bash
git clone <repository-url>
cd vehicle-service-booking-platform/server
npm install --production
```

2. **Environment configuration**
```bash
cp .env.example .env
# Edit .env with production values
```

3. **Process manager (PM2)**
```bash
npm install -g pm2
pm2 start server.js --name "vehicle-service-api"
pm2 startup
pm2 save
```

4. **Nginx reverse proxy**
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option 2: Heroku

1. **Install Heroku CLI**
2. **Create Heroku app**
```bash
cd server
heroku create your-app-name-api
```

3. **Set environment variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_connection_string
heroku config:set JWT_SECRET=your_jwt_secret
```

4. **Deploy**
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### Option 3: Docker

1. **Create Dockerfile** (server/Dockerfile)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

2. **Build and run**
```bash
docker build -t vehicle-service-api .
docker run -p 5000:5000 --env-file .env vehicle-service-api
```

## Frontend Deployment

### Option 1: Netlify (Recommended)

1. **Build the project**
```bash
cd client
npm run build
```

2. **Deploy to Netlify**
- Connect GitHub repository to Netlify
- Set build command: `npm run build`
- Set publish directory: `build`
- Set environment variables in Netlify dashboard

3. **Configure redirects** (client/public/_redirects)
```
/*    /index.html   200
```

### Option 2: Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
cd client
vercel --prod
```

### Option 3: Traditional Web Server

1. **Build the project**
```bash
cd client
npm run build
```

2. **Nginx configuration**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/client/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Environment Variables

### Backend (.env)
```env
# Production settings
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/vehicle-service-booking

# JWT
JWT_SECRET=your-super-secure-jwt-secret-key
JWT_EXPIRE=7d

# CORS
CLIENT_URL=https://yourdomain.com

# Email (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# File uploads (optional)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env.production)
```env
REACT_APP_API_URL=https://api.yourdomain.com/api
REACT_APP_ENV=production
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-key
REACT_APP_STRIPE_PUBLISHABLE_KEY=your-stripe-key
```

## SSL Configuration

### Let's Encrypt with Certbot
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Monitoring and Logging

### Application Monitoring
- Use PM2 for process monitoring
- Set up log rotation
- Monitor memory and CPU usage

### Error Tracking
- Integrate Sentry for error tracking
- Set up alerts for critical errors

### Performance Monitoring
- Use tools like New Relic or DataDog
- Monitor API response times
- Track database performance

### Log Management
```bash
# PM2 logs
pm2 logs vehicle-service-api

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Set secure environment variables
- [ ] Configure CORS properly
- [ ] Use rate limiting
- [ ] Keep dependencies updated
- [ ] Use strong JWT secrets
- [ ] Implement proper input validation
- [ ] Set up firewall rules
- [ ] Regular security audits
- [ ] Database access restrictions

## Backup Strategy

### Database Backups
```bash
# MongoDB backup
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/vehicle-service-booking" --out=/backup/$(date +%Y%m%d)

# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri="$MONGODB_URI" --out="/backup/$DATE"
find /backup -type d -mtime +7 -exec rm -rf {} \;
```

### File Backups
- Regular server snapshots
- Code repository backups
- Configuration file backups

## Performance Optimization

### Backend
- Enable gzip compression
- Use Redis for caching
- Optimize database queries
- Implement pagination
- Use CDN for static assets

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- Bundle analysis
- Service worker for caching

## Troubleshooting

### Common Issues
1. **CORS errors**: Check CLIENT_URL in backend .env
2. **Database connection**: Verify MongoDB URI and network access
3. **JWT errors**: Ensure JWT_SECRET is set and consistent
4. **Build failures**: Check Node.js version compatibility
5. **SSL issues**: Verify certificate installation and renewal

### Health Checks
```bash
# API health check
curl https://api.yourdomain.com/api/health

# Database connection test
mongo "mongodb+srv://cluster.mongodb.net/test" --username user
```
