# BCOW Project - Complete Startup Guide

## 🎯 Quick Start (5 Minutes)

### Step 1: Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows - if MongoDB is installed
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `BCOW_BACKEND/.env` with your connection string

### Step 2: Start Backend Server

```bash
cd "d:\ankita\Unified Mentor\BCOW_BACKEND"
npm run dev
```

**Expected Output:**
```
╔═══════════════════════════════════════╗
║     BCOW Backend Server Started       ║
║     Port: 3000                        ║
║     Environment: development          ║
╚═══════════════════════════════════════╝
✓ MongoDB connected successfully
```

### Step 3: Start Frontend

**In a new terminal:**
```bash
cd "d:\ankita\Unified Mentor\BCOW"
npm run dev
```

**Expected Output:**
```
  ➜  Local:   http://localhost:5173/
```

### Step 4: Test the Connection

Open browser and test the health endpoint:
```
http://localhost:3000/api/health
```

You should see:
```json
{
  "status": "Server is running",
  "timestamp": "2026-10-03T...",
  "port": 3000
}
```

---

## 📝 User Registration Flow

### For Admin Users:

1. **Sign Up**
   - Navigate to landing page
   - Click "Admin Sign Up"
   - Fill form with:
     - Organization Name
     - Contact Name
     - Official Email
     - Password
   - Submit

2. **Login**
   - Email: (your registered email)
   - Password: (your password)
   - Access admin dashboard

### For Contractors:

1. **Sign Up**
   - Click "Contractor Sign Up"
   - Fill form with:
     - Firm Name
     - Contact Person
     - Phone Number
     - Email
     - Licence Number
   - **Auto-generated credentials will appear:**
     - Login ID (save this!)
     - Password (save this!)

2. **Login**
   - Login ID: (auto-generated from signup)
   - Password: (auto-generated from signup)
   - Access contractor dashboard

### For Workers:

1. **Workers are registered by contractors**
   - Contractor: Navigate to "Labour Directory"
   - Click "Add New Worker"
   - Fill form with:
     - Name
     - Role
     - Daily Wage
     - Mobile Number
     - Aadhar Number
     - Assigned Site

2. **Auto-generated worker credentials:**
   - Worker ID: WID-[contractorId]-[timestamp]
   - Access PIN: Last 4 digits of phone number

3. **Worker Login**
   - Worker ID: (from registration)
   - Access PIN: (4-digit PIN from registration)

---

## 🔐 Environment Configuration

### Backend (.env)

Located at: `BCOW_BACKEND/.env`

```env
# Server
PORT=3000
NODE_ENV=development

# Database - Choose ONE:

# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/bcow_db

# MongoDB Atlas (Cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bcow_db?retryWrites=true&w=majority

# Security
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d

# Frontend Connection
CORS_ORIGIN=http://localhost:5173
```

### Frontend

Frontend automatically connects to `http://localhost:3000/api`

To change, edit: `BCOW/src/utils/api.js`

---

## 📊 Testing API Endpoints

### Using Postman or cURL:

#### 1. Admin Login
```bash
curl -X POST http://localhost:3000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "officialMail": "admin@example.com",
    "password": "password123"
  }'
```

#### 2. Contractor Login
```bash
curl -X POST http://localhost:3000/api/auth/contractor/login \
  -H "Content-Type: application/json" \
  -d '{
    "loginId": "AAAA1234XXXX",
    "password": "ContPassword123"
  }'
```

#### 3. Get Dashboard (requires token from login)
```bash
curl -X GET http://localhost:3000/api/contractor/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🏗️ Project Structure Reference

```
d:\ankita\Unified Mentor\
├── #Schema Designe.txt          ← Business logic reference
├── BCOW/                         ← Frontend (React + Vite)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── pages/
│   │   ├── components/
│   │   ├── admin/
│   │   ├── contructor/
│   │   ├── workers/
│   │   └── utils/
│   │       └── api.js            ← API configuration
│   ├── package.json              ← Contains axios
│   └── INTEGRATION_GUIDE.md       ← Frontend integration docs
│
├── BCOW_BACKEND/                 ← Backend (Express + MongoDB)
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Contractor.js
│   │   ├── Worker.js
│   │   ├── Site.js
│   │   ├── Attendance.js
│   │   ├── Wage.js
│   │   └── Dispute.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── admin.js
│   │   ├── contractor.js
│   │   └── worker.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   └── helpers.js
│   ├── .env                      ← Configuration (EDIT THIS)
│   ├── .gitignore
│   ├── package.json
│   ├── server.js
│   └── README.md                 ← Detailed API docs
```

---

## ✅ Verification Checklist

- [ ] MongoDB is running
- [ ] Backend started successfully on port 3000
- [ ] Frontend started successfully on port 5173
- [ ] Backend .env file configured
- [ ] CORS_ORIGIN is set to http://localhost:5173
- [ ] Can access http://localhost:3000/api/health
- [ ] Frontend can reach backend (no CORS errors)
- [ ] Can register new admin
- [ ] Can login as admin
- [ ] Admin dashboard loads data

---

## 🐛 Troubleshooting

### MongoDB Connection Error

**Problem:** `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solution:**
```bash
# Check if MongoDB is running
# Windows: Start MongoDB service or run mongod.exe
# Docker: docker start mongodb
# Cloud: Verify MongoDB Atlas connection string
```

### CORS Error in Frontend Console

**Problem:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
1. Check `BCOW_BACKEND/.env` has `CORS_ORIGIN=http://localhost:5173`
2. Restart backend server
3. Clear browser cache (Ctrl+Shift+Delete)

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Windows - find and kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change PORT in .env to 3001, 3002, etc.
```

### Invalid Token Error

**Problem:** 401 Unauthorized, token expired

**Solution:**
- User needs to login again
- Token expires after 7 days (configurable in JWT_EXPIRE)
- Clear localStorage and login fresh

### "No token provided" Error

**Problem:** API returns 401 with "No token provided"

**Solution:**
1. User needs to login first
2. Token should be in localStorage after login
3. Check browser DevTools > Application > Local Storage for "token"

---

## 📱 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* actual data */ },
  "token": "eyJhbGc..." /* optional, only in login */
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🚀 Deployment Considerations

### For Production:

1. **Environment Variables**
   ```bash
   # Use environment variables, not .env file
   # Set in server/hosting platform
   ```

2. **Security**
   - Change JWT_SECRET to a strong random string
   - Use HTTPS (not HTTP)
   - Use environment-specific CORS_ORIGIN

3. **MongoDB**
   - Use MongoDB Atlas (managed cloud)
   - Enable authentication
   - Use connection pooling

4. **Frontend Build**
   ```bash
   cd BCOW
   npm run build
   # Deploy dist/ folder
   ```

5. **Backend**
   ```bash
   cd BCOW_BACKEND
   NODE_ENV=production npm start
   ```

---

## 📞 Quick Help

**Quick Start:** `npm run dev` in BCOW_BACKEND, then BCOW
**Health Check:** http://localhost:3000/api/health
**API Docs:** Read BCOW_BACKEND/README.md
**Integration:** Read BCOW/INTEGRATION_GUIDE.md
**Schema:** Read #Schema Designe.txt

---

## 🎉 You're All Set!

Your BCOW system is now running with:
- ✅ Express backend on port 3000
- ✅ React frontend on port 5173
- ✅ MongoDB database connected
- ✅ CORS enabled for frontend-backend communication
- ✅ JWT authentication for all users
- ✅ Complete role-based access control

### Next Steps:
1. Register as admin
2. Register as contractor
3. Add sites and workers
4. Mark attendance
5. Generate wage slips
6. Manage disputes

Happy coding! 🚀
