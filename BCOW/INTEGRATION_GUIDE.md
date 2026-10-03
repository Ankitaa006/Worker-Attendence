# Frontend Integration Guide

This document explains how to integrate the BCOW backend with the React frontend.

## 🔗 API Configuration

A pre-configured axios instance is available at `src/utils/api.js` that handles:
- Base URL configuration
- Automatic token injection in headers
- Token refresh and error handling
- Automatic logout on 401 errors

## 📦 Installation

### 1. Install Dependencies

```bash
cd BCOW
npm install
```

This installs axios (added to package.json).

## 🎯 Using API in Components

### Example: Admin Login

```jsx
import { useState } from 'react';
import axiosInstance from '../utils/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post('/auth/admin/login', {
        officialMail: email,
        password
      });
      
      // Save token
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
      
      // Navigate to dashboard
      navigate('/admin/compliance-overview');
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
    </form>
  );
}
```

### Example: Contractor Dashboard

```jsx
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get('/contractor/dashboard');
      setStats(response.data.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Workers: {stats.totalWorkers}</p>
      <p>Today's Attendance: {stats.todayAttendance}</p>
    </div>
  );
}
```

### Example: Mark Attendance

```jsx
import axiosInstance from '../utils/api';

const markAttendance = async (workerId, status, overtimeHours = 0) => {
  try {
    const response = await axiosInstance.post('/contractor/attendance', {
      workerId,
      date: new Date().toISOString().split('T')[0],
      status,
      overtimeHours
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
```

## 🔐 Authentication Flow

### 1. Signup
```jsx
const signup = async (formData, role) => {
  const endpoint = `/auth/${role}/signup`;
  const response = await axiosInstance.post(endpoint, formData);
  return response.data;
};
```

### 2. Login
```jsx
const login = async (credentials, role) => {
  const endpoint = `/auth/${role}/login`;
  const response = await axiosInstance.post(endpoint, credentials);
  localStorage.setItem('token', response.data.token);
  return response.data;
};
```

### 3. Protected Pages
Wrap pages with authentication check:
```jsx
export default function ProtectedRoute({ children, requiredRole }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (!token || user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
}
```

## 📋 Common Operations

### Get Worker Attendance
```jsx
const getAttendance = async (month) => {
  const response = await axiosInstance.get(`/worker/attendance?month=${month}`);
  return response.data.data;
};
```

### Get Wage Slip
```jsx
const getWageSlip = async () => {
  const response = await axiosInstance.get('/worker/wage-slip');
  return response.data.data;
};
```

### Register New Worker
```jsx
const registerWorker = async (workerData) => {
  const response = await axiosInstance.post('/contractor/workers', workerData);
  return response.data.data;
};
```

### Report Dispute
```jsx
const reportDispute = async (disputeData) => {
  const response = await axiosInstance.post('/worker/disputes', {
    title: disputeData.title,
    description: disputeData.description,
    category: disputeData.category
  });
  return response.data;
};
```

### Get Disputes (Admin)
```jsx
const getDisputes = async () => {
  const response = await axiosInstance.get('/admin/disputes');
  return response.data.data;
};
```

### Resolve Dispute
```jsx
const resolveDispute = async (disputeId, resolution) => {
  const response = await axiosInstance.put(`/admin/disputes/${disputeId}/resolve`, {
    resolution
  });
  return response.data.data;
};
```

## 🚀 Starting Both Frontend and Backend

### Terminal 1: Backend
```bash
cd BCOW_BACKEND
npm run dev
# Server runs on http://localhost:3000
```

### Terminal 2: Frontend
```bash
cd BCOW
npm run dev
# Frontend runs on http://localhost:5173
```

## 🔄 Environment Variables for Frontend (Optional)

You can also create a `.env.local` file in the BCOW directory:
```
VITE_API_URL=http://localhost:3000/api
```

Then update `api.js`:
```jsx
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
```

## ⚠️ Important Notes

1. **Token Storage**: Tokens are stored in localStorage. For production, consider using httpOnly cookies.

2. **CORS**: Make sure the backend has `CORS_ORIGIN=http://localhost:5173` in .env

3. **Error Handling**: Always wrap API calls in try-catch blocks

4. **Loading States**: Manage loading states to prevent duplicate submissions

5. **Token Refresh**: Current implementation doesn't have token refresh. Implement refresh token logic if needed.

## 🧪 Testing API Endpoints

Use Postman or cURL to test endpoints:

```bash
# Admin Login
curl -X POST http://localhost:3000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"officialMail":"admin@example.com","password":"password"}'

# Get Dashboard (with token)
curl -X GET http://localhost:3000/api/contractor/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📞 Support

For issues with API integration, check:
1. Backend is running on port 3000
2. .env has correct MONGODB_URI
3. Token is being saved correctly in localStorage
4. CORS_ORIGIN matches your frontend URL
