# Vehicle Service Booking Platform

A comprehensive MERN stack application for booking vehicle services with user authentication, service center management, and admin panel.

## Features

- User Registration and Login
- Service Booking (Repair, Oil Change, etc.)
- Date, Time Slot, and Pickup Location selection
- Service Center Dashboard
- Booking Status Tracking (Pending, In Progress, Completed)
- Admin Panel for managing service centers and services
- Email Notifications
- Responsive UI with Dark Mode support

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: React Context API
- **Styling**: Tailwind CSS with Dark Mode

## Project Structure

```
vehicle-service-booking-platform/
├── client/                          # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── common/
│   │   │   │   ├── Header.js
│   │   │   │   ├── Footer.js
│   │   │   │   ├── Sidebar.js
│   │   │   │   ├── LoadingSpinner.js
│   │   │   │   └── Modal.js
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.js
│   │   │   │   ├── RegisterForm.js
│   │   │   │   └── ProtectedRoute.js
│   │   │   ├── booking/
│   │   │   │   ├── BookingForm.js
│   │   │   │   ├── BookingCard.js
│   │   │   │   ├── ServiceSelector.js
│   │   │   │   ├── DateTimePicker.js
│   │   │   │   └── LocationPicker.js
│   │   │   ├── dashboard/
│   │   │   │   ├── CustomerDashboard.js
│   │   │   │   ├── ServiceCenterDashboard.js
│   │   │   │   └── AdminDashboard.js
│   │   │   └── ui/
│   │   │       ├── Button.js
│   │   │       ├── Input.js
│   │   │       ├── Card.js
│   │   │       └── ThemeToggle.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── BookService.js
│   │   │   ├── MyBookings.js
│   │   │   ├── Profile.js
│   │   │   └── NotFound.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   ├── BookingContext.js
│   │   │   └── ThemeContext.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useBooking.js
│   │   │   └── useTheme.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── bookingService.js
│   │   │   └── userService.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── helpers.js
│   │   │   └── validation.js
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   └── components.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env
├── server/                          # Express Backend
│   ├── config/
│   │   ├── database.js
│   │   ├── jwt.js
│   │   └── email.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── bookingController.js
│   │   ├── serviceController.js
│   │   ├── serviceCenterController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   ├── models/
│   │   ├── User.js
│   │   ├── ServiceCenter.js
│   │   ├── Service.js
│   │   ├── Booking.js
│   │   └── Admin.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── bookings.js
│   │   ├── services.js
│   │   ├── serviceCenters.js
│   │   └── admin.js
│   ├── utils/
│   │   ├── emailService.js
│   │   ├── validators.js
│   │   └── helpers.js
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vehicle-service-booking-platform
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**

   **Backend (.env in server directory):**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/vehicle-service-booking
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:3000
   ```

   **Frontend (.env in client directory):**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Start the Development Servers**

   **Backend (Terminal 1):**
   ```bash
   cd server
   npm run dev
   ```

   **Frontend (Terminal 2):**
   ```bash
   cd client
   npm start
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## Database Schemas

### User Schema
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  phone: String (required),
  role: String (enum: ['customer', 'service_center', 'admin']),
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  profileImage: String,
  isEmailVerified: Boolean,
  isActive: Boolean,
  serviceCenterId: ObjectId (ref: ServiceCenter),
  preferences: {
    notifications: { email: Boolean, sms: Boolean },
    theme: String (enum: ['light', 'dark', 'system'])
  }
}
```

### ServiceCenter Schema
```javascript
{
  name: String (required),
  description: String,
  owner: ObjectId (ref: User, required),
  contact: {
    email: String (required),
    phone: String (required),
    website: String
  },
  address: {
    street: String (required),
    city: String (required),
    state: String (required),
    zipCode: String (required),
    coordinates: { latitude: Number, longitude: Number }
  },
  services: [ObjectId] (ref: Service),
  operatingHours: {
    [day]: { isOpen: Boolean, openTime: String, closeTime: String }
  },
  rating: { average: Number, count: Number },
  isVerified: Boolean,
  isActive: Boolean,
  licenseNumber: String (required),
  capacity: Number
}
```

### Service Schema
```javascript
{
  name: String (required),
  description: String (required),
  category: String (enum: ['Oil Change', 'Brake Service', ...]),
  basePrice: Number (required),
  estimatedDuration: Number (minutes),
  vehicleTypes: [String] (enum: ['Car', 'Motorcycle', ...]),
  serviceCenterPricing: [{
    serviceCenter: ObjectId (ref: ServiceCenter),
    price: Number,
    discount: Number,
    isAvailable: Boolean
  }],
  isActive: Boolean,
  popularity: Number
}
```

### Booking Schema
```javascript
{
  bookingId: String (unique, auto-generated),
  customer: ObjectId (ref: User, required),
  serviceCenter: ObjectId (ref: ServiceCenter, required),
  services: [{
    service: ObjectId (ref: Service),
    price: Number,
    discount: Number,
    finalPrice: Number
  }],
  vehicle: {
    make: String (required),
    model: String (required),
    year: Number (required),
    type: String (enum),
    licensePlate: String (required),
    color: String,
    mileage: Number
  },
  scheduledDateTime: Date (required),
  pickupLocation: {
    type: String (enum: ['service_center', 'customer_location']),
    address: Object,
    instructions: String
  },
  status: String (enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']),
  totalAmount: Number (required),
  paymentStatus: String (enum: ['pending', 'paid', 'failed', 'refunded']),
  timeline: [{ status: String, timestamp: Date, updatedBy: ObjectId, notes: String }],
  rating: { score: Number, review: String, reviewDate: Date }
}
```

## Backend API Routes

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /me` - Get current user profile
- `PUT /profile` - Update user profile
- `PUT /change-password` - Change password
- `POST /logout` - User logout

### User Routes (`/api/users`)
- `GET /` - Get all users (admin only)
- `GET /:id` - Get user by ID
- `PUT /:id` - Update user
- `DELETE /:id` - Delete user (admin only)

### Booking Routes (`/api/bookings`)
- `GET /` - Get user's bookings
- `POST /` - Create new booking
- `GET /:id` - Get booking details
- `PUT /:id` - Update booking
- `PUT /:id/status` - Update booking status
- `DELETE /:id` - Cancel booking
- `POST /:id/rating` - Add rating/review

### Service Routes (`/api/services`)
- `GET /` - Get all services (with filters)
- `GET /:id` - Get service details
- `POST /` - Create service (admin only)
- `PUT /:id` - Update service (admin only)
- `DELETE /:id` - Delete service (admin only)
- `GET /popular` - Get popular services
- `GET /search` - Search services

### Service Center Routes (`/api/service-centers`)
- `GET /` - Get all service centers (with filters)
- `GET /:id` - Get service center details
- `POST /` - Register service center
- `PUT /:id` - Update service center
- `DELETE /:id` - Delete service center
- `GET /:id/bookings` - Get service center bookings
- `GET /:id/services` - Get service center services
- `PUT /:id/verify` - Verify service center (admin only)

### Admin Routes (`/api/admin`)
- `GET /dashboard` - Admin dashboard stats
- `GET /users` - Manage users
- `GET /service-centers` - Manage service centers
- `GET /bookings` - View all bookings
- `GET /analytics` - System analytics

## React Components Structure

### Pages
- **Home** - Landing page with features and CTA
- **Login** - User authentication
- **Register** - User registration
- **Dashboard** - Role-based dashboard (Customer/Service Center/Admin)
- **BookService** - Service booking form
- **MyBookings** - User's booking history
- **Profile** - User profile management

### Components

#### Common Components
- **Header** - Navigation with theme toggle and user menu
- **Footer** - Site footer with links and contact info
- **LoadingSpinner** - Reusable loading indicator
- **Modal** - Reusable modal component

#### Authentication Components
- **LoginForm** - Login form with validation
- **RegisterForm** - Registration form
- **ProtectedRoute** - Route protection based on authentication and roles

#### Booking Components
- **BookingForm** - Multi-step booking form
- **BookingCard** - Booking display card
- **ServiceSelector** - Service selection component
- **DateTimePicker** - Date and time selection
- **LocationPicker** - Location selection with map integration

#### Dashboard Components
- **CustomerDashboard** - Customer overview and quick actions
- **ServiceCenterDashboard** - Service center booking management
- **AdminDashboard** - System overview and management tools

#### UI Components
- **Button** - Styled button variants
- **Input** - Form input components
- **Card** - Content card component
- **ThemeToggle** - Dark/light mode toggle

### Context Providers
- **AuthContext** - Authentication state management
- **ThemeContext** - Theme preference management
- **BookingContext** - Booking state management

### Custom Hooks
- **useAuth** - Authentication utilities
- **useTheme** - Theme management
- **useBooking** - Booking operations

### Services
- **api.js** - Axios configuration and interceptors
- **authService.js** - Authentication API calls
- **bookingService.js** - Booking API calls
- **userService.js** - User management API calls
