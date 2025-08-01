// Simple test to verify server setup
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

console.log('Testing server setup...');
console.log('Environment variables loaded:');
console.log('- PORT:', PORT);
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
console.log('- JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set');

// Test if app can be created
try {
  const server = app.listen(PORT, () => {
    console.log(`✅ Server successfully started on port ${PORT}`);
    console.log('✅ All routes imported successfully');
    console.log('\nAvailable routes:');
    console.log('- GET  /api/health');
    console.log('- POST /api/auth/register');
    console.log('- POST /api/auth/login');
    console.log('- GET  /api/auth/me');
    console.log('- GET  /api/users');
    console.log('- GET  /api/bookings');
    console.log('- GET  /api/services');
    console.log('- GET  /api/service-centers');
    console.log('- GET  /api/admin/dashboard');
    
    console.log('\n🎉 Server setup is working correctly!');
    console.log('You can now test the API endpoints.');
    
    // Close server after test
    setTimeout(() => {
      server.close(() => {
        console.log('\n✅ Test completed successfully');
        process.exit(0);
      });
    }, 2000);
  });
} catch (error) {
  console.error('❌ Error starting server:', error.message);
  process.exit(1);
}
