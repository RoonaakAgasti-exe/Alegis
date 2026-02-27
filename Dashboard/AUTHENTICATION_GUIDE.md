# Cybersecurity Dashboard - JWT Authentication Setup Guide

## Complete Authentication Flow Setup

### Prerequisites
- MongoDB (local or cloud)
- Node.js and npm installed
- React and Express running locally

---

## Backend Setup

### 1. Start MongoDB
Make sure MongoDB is running on `mongodb://localhost:27017`

```bash
# If using MongoDB locally, start it with:
mongod
```

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Configure .env
The backend `.env` file is already set up with:
```
MONGO_URI=mongodb://localhost:27017/cybersecurity
JWT_SECRET=supersecretkeyneededforjwtsigning
JWT_EXPIRY=7d
PORT=5000
```

### 4. Start Backend Server
```bash
npm start
# Server runs on http://localhost:5000
```

---

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure .env
The frontend `.env` file is already set up with:
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Frontend Dev Server
```bash
npm run dev
# App runs on http://localhost:5174
```

---

## API Endpoints

### Register (Create Account)
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

---

### Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

---

### Verify Token
**POST** `/api/auth/verify`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Token valid",
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

---

## Feature Overview

### Frontend Features
✓ Sign Up with validation (username, email, password, confirm password)
✓ Login with email and password
✓ JWT token stored in localStorage
✓ User session persistence
✓ Logout functionality
✓ Error handling and messages
✓ Loading states
✓ Dashboard after successful login

### Backend Features
✓ User registration with password hashing (bcryptjs)
✓ Login authentication with JWT token generation
✓ Token verification middleware
✓ Input validation
✓ Duplicate user prevention
✓ Error handling
✓ MongoDB integration

---

## Security Features

1. **Password Hashing**: Passwords are hashed using bcryptjs (10 salt rounds)
2. **JWT Tokens**: Secure token-based authentication with 7-day expiry
3. **Token Storage**: Stored securely in localStorage
4. **CORS**: Enabled for frontend-backend communication
5. **Input Validation**: All inputs validated on both frontend and backend
6. **Error Messages**: Safe error responses without exposing sensitive info

---

## Testing the Flow

### Step 1: Sign Up
1. Visit http://localhost:5174
2. Click "Sign Up"
3. Fill in: Username, Email, Password, Confirm Password
4. Click "CREATE ACCOUNT"
5. Get redirected to Login page

### Step 2: Login
1. Enter your email and password
2. Click "LOGIN"
3. Token is stored in localStorage
4. You'll see the Dashboard with your user info
5. Click "LOGOUT" to end session

### Step 3: Token Verification
- Token is automatically stored after login
- Tokens expire after 7 days
- Session persists on page refresh (if token is valid)

---

## Troubleshooting

### MongoDB Connection Error
```
✗ MongoDB connection error: connect ECONNREFUSED
```
**Solution:** Start MongoDB with `mongod`

### CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:** Backend has CORS enabled. Check both servers are running.

### JWT Token Expired
**Solution:** Log out and log back in to get a new token

### .env Not Loading
**Solution:** Restart the dev server after changing .env files

---

## Project Structure

```
CyberSecurityDashboard/
├── backend/
│   ├── server.js
│   ├── .env
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.js
│   ├── middleware/
│   │   └── verifyToken.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.jsx (Login with JWT)
    │   ├── App.css (Styling)
    │   ├── Signup.jsx (Registration)
    │   ├── Signup.css
    │   └── ...
    ├── .env
    └── package.json
```

---

## Next Steps

- Add email verification
- Implement password reset
- Add user profile management
- Create protected dashboard routes
- Add refresh token mechanism
- Implement rate limiting
- Add 2FA (Two-Factor Authentication)