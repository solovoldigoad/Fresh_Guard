# MongoDB Integration Setup Guide

## Prerequisites

1. **MongoDB Installation**
   - Download and install MongoDB Community Server from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud) for a simpler setup

2. **Node.js** 
   - Make sure Node.js is installed (version 14+ recommended)

## Setup Instructions

### Option 1: Local MongoDB (Recommended for Development)

1. **Install MongoDB Community Server**
   ```bash
   # Windows: Download installer from MongoDB website
   # macOS: brew install mongodb/brew/mongodb-community
   # Ubuntu: Follow MongoDB installation guide
   ```

2. **Start MongoDB Service**
   ```bash
   # Windows: MongoDB should start automatically as a service
   # macOS/Linux: 
   sudo systemctl start mongod
   # OR
   brew services start mongodb/brew/mongodb-community
   ```

3. **Verify MongoDB is running**
   ```bash
   # Connect to MongoDB shell
   mongosh
   # You should see MongoDB connection successful
   ```

### Option 2: MongoDB Atlas (Cloud Database)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/atlas
   - Sign up for a free account

2. **Create a Cluster**
   - Choose the free tier (M0 Sandbox)
   - Select your preferred cloud provider and region

3. **Setup Database Access**
   - Create a database user with username/password
   - Add your IP address to the IP whitelist (or use 0.0.0.0/0 for development)

4. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

5. **Update Backend Environment**
   - Update `backend/.env` file:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/smart-herbal-sprinkler?retryWrites=true&w=majority
   ```

## Running the Application

### 1. Start MongoDB (if using local installation)
```bash
# Make sure MongoDB is running
mongosh --eval "db.runCommand('ping')"
```

### 2. Start Backend Server
```bash
cd backend
npm run dev
```
You should see:
- `🚀 Server running in development mode on port 3000`
- `MongoDB Connected: localhost` (or Atlas URL)

### 3. Test Backend API
```bash
# Test health endpoint
curl http://localhost:3000/health

# Expected response:
{
  "success": true,
  "message": "Smart Herbal Sprinkler API is running",
  "timestamp": "2025-01-01T12:00:00.000Z",
  "environment": "development"
}
```

### 4. Start React Native App
```bash
# In the root directory
npx expo start
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (requires token)

### Example Signup Request
```json
{
  "fullName": "John Doe",
  "phoneNumber": "1234567890",
  "address": "123 Main St, City, State",
  "password": "securePassword123",
  "role": "warehouse_staff"
}
```

### Example Login Request
```json
{
  "phoneNumber": "1234567890",
  "password": "securePassword123",
  "role": "warehouse_staff"
}
```

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  fullName: String,
  phoneNumber: String (unique),
  address: String,
  password: String (hashed),
  role: String (enum: 'warehouse_staff', 'admin'),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Ensure MongoDB service is running
   - Check connection string in `.env` file
   - For Atlas: verify IP whitelist and credentials

2. **Backend Server Won't Start**
   - Check if port 3000 is available
   - Verify all npm packages are installed: `npm install`
   - Check environment variables in `.env`

3. **React Native Can't Connect to Backend**
   - Ensure backend is running on `http://localhost:3000`
   - For Android Emulator, you might need to use `http://10.0.2.2:3000`
   - For iOS Simulator, use `http://localhost:3000`

4. **Password Hashing Issues**
   - Make sure bcryptjs is installed: `npm install bcryptjs`
   - Check User model pre-save middleware

### Network Configuration for React Native

If testing on a physical device, update the API base URL in `src/config/api.js`:
```javascript
const API_CONFIG = {
  BASE_URL: __DEV__ 
    ? 'http://YOUR_LOCAL_IP:3000/api'  // Replace with your computer's IP
    : 'https://your-production-api.com/api',
};
```

## Production Deployment

### Environment Variables for Production
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/smart-herbal-sprinkler-prod?retryWrites=true&w=majority
JWT_SECRET=your_very_secure_jwt_secret_for_production
NODE_ENV=production
```

### Security Considerations
1. Use strong JWT secrets in production
2. Enable MongoDB authentication
3. Use HTTPS for API endpoints
4. Implement rate limiting
5. Validate and sanitize all inputs
6. Use environment-specific database names