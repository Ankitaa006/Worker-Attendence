# 🚀 BCOW Backend - Quick Reference Card

## ⚡ 30-Second Start

```bash
# Terminal 1: Backend
cd BCOW_BACKEND
npm run dev

# Terminal 2: Frontend  
cd BCOW
npm run dev
```

✅ Backend: http://localhost:3000
✅ Frontend: http://localhost:5173

## 📝 Key Files Locations

| File | Location | Purpose |
|------|----------|---------|
| Server Config | `BCOW_BACKEND/.env` | Database, JWT, CORS settings |
| Main Server | `BCOW_BACKEND/server.js` | Express app entry point |
| API Config (Frontend) | `BCOW/src/utils/api.js` | Axios setup with auth |
| Models | `BCOW_BACKEND/models/` | MongoDB schemas |
| Routes | `BCOW_BACKEND/routes/` | API endpoints |
| Middleware | `BCOW_BACKEND/middleware/auth.js` | JWT & role checks |

## 🔑 Essential Credentials

### Test Admin Account
```
Email: admin@example.com
Password: password123
```

### Test Contractor
```
LoginID: auto-generated (see after signup)
Password: auto-generated (see after signup)
```

### Test Worker
```
WorkerID: auto-assigned by contractor
PIN: Last 4 digits of phone number
```

## 📡 API Quick Test

### Health Check
```bash
curl http://localhost:3000/api/health
```

### Admin Login
```bash
curl -X POST http://localhost:3000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"officialMail":"admin@example.com","password":"password123"}'
```

### Get Token (from above response)
```bash
TOKEN="<copy token from response>"
```

### Test Protected Route
```bash
curl -X GET http://localhost:3000/api/admin/dashboard \
  -H "Authorization: Bearer $TOKEN"
```

## 🔧 .env Configuration

```env
# Must Change These:
MONGODB_URI=mongodb://localhost:27017/bcow_db
JWT_SECRET=change_this_to_random_string

# Frontend Connection:
CORS_ORIGIN=http://localhost:5173

# Port:
PORT=3000
```

## 📊 Database Models Quick Reference

| Model | Fields | Notes |
|-------|--------|-------|
| **Admin** | email, password, role | Sign up to get started |
| **Contractor** | firmName, licence, loginId, password | Auto-generated credentials |
| **Worker** | name, role, workerId, accessPin | Registered by contractor |
| **Site** | project, city, minWage, status | Created by admin |
| **Attendance** | worker, date, status, overtime | Marked daily by contractor |
| **Wage** | worker, month, daysWorked, netPayable | Generated monthly |
| **Dispute** | worker, title, category, status | Reported by worker, resolved by admin |

## 🌐 Route Summary

### Authentication (No auth needed)
```
POST   /api/auth/admin/signup
POST   /api/auth/admin/login
POST   /api/auth/contractor/signup
POST   /api/auth/contractor/login
POST   /api/auth/worker/login
```

### Admin Routes (Protected)
```
GET    /api/admin/dashboard
GET    /api/admin/compliance-overview
GET    /api/admin/contractors
POST   /api/admin/contractors
GET    /api/admin/sites
POST   /api/admin/sites
GET    /api/admin/disputes
PUT    /api/admin/disputes/:id/resolve
GET    /api/admin/labour-audit
```

### Contractor Routes (Protected)
```
GET    /api/contractor/dashboard
POST   /api/contractor/attendance
GET    /api/contractor/attendance
GET    /api/contractor/workers
POST   /api/contractor/workers
GET    /api/contractor/wages/:id
POST   /api/contractor/wages
PUT    /api/contractor/wages/:id/disburse
GET    /api/contractor/payment-ledger
```

### Worker Routes (Protected)
```
GET    /api/worker/profile
GET    /api/worker/attendance
GET    /api/worker/wage-slip
GET    /api/worker/payment-receipts
POST   /api/worker/disputes
GET    /api/worker/disputes
```

## 🛠️ Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Check if running
curl http://localhost:3000/api/health

# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| **MongoDB Connection Error** | Ensure mongod running: `mongod` or Docker |
| **CORS Error** | Check `.env`: `CORS_ORIGIN=http://localhost:5173` |
| **Port 3000 in use** | `taskkill /PID <PID> /F` or change PORT in .env |
| **401 Unauthorized** | Login first to get token, include in headers |
| **Token Expired** | User needs to login again |
| **Cannot find module** | Run `npm install` in BCOW_BACKEND |

## 📚 Documentation Files

```
d:\ankita\Unified Mentor\
├── STARTUP_GUIDE.md          ← Full startup instructions
├── BACKEND_SETUP_SUMMARY.md  ← Complete setup overview
├── ARCHITECTURE.md           ← System design & flows
├── BCOW_BACKEND/
│   └── README.md             ← API documentation
└── BCOW/
    └── INTEGRATION_GUIDE.md  ← Frontend integration
```

## ✅ Checklist Before Running

- [ ] Node.js installed
- [ ] MongoDB running (or connection string ready)
- [ ] `BCOW_BACKEND/.env` configured
- [ ] Dependencies installed (`npm install` in BCOW_BACKEND)
- [ ] Port 3000 is free
- [ ] Port 5173 is free

## 💡 Pro Tips

1. **Use Postman/Insomnia** for API testing
2. **Browser DevTools** → Application → LocalStorage to see tokens
3. **Use `npm run dev`** for auto-reload on file changes
4. **Check console logs** for helpful error messages
5. **Test health endpoint first** to verify backend is running

## 🔐 Authentication Flow (Simple)

1. User registers/logins → GET token
2. Token stored in `localStorage`
3. `axiosInstance` auto-adds to headers
4. Backend verifies token in middleware
5. Route handler executes
6. Response returned with data

## 📈 Quick Performance Check

```javascript
// In browser console:
console.log('Token:', localStorage.getItem('token'));
console.log('User:', localStorage.getItem('user'));

// If empty, user is not logged in
```

## 🎯 Next: Build Frontend Pages

Now that backend is ready, build these pages:

### Admin Dashboard
- Fetch `/api/admin/dashboard` 
- Display: Sites, Workers, Contractors, Disputes

### Contractor Dashboard
- Fetch `/api/contractor/dashboard`
- Display: Workers, Attendance, Wages

### Worker Dashboard
- Fetch `/api/worker/profile`
- Display: Attendance, Wage Slip, Disputes

### Forms
- Signup (Admin/Contractor)
- Login (all roles)
- Add Worker, Mark Attendance, Report Dispute

## 🚀 Ready to Roll!

Backend ✅ Frontend ✅ Database ✅ CORS ✅ Auth ✅

**Start building! Happy coding! 🎉**

---

**Last Updated:** 2026-10-03
**Version:** 1.0
**Backend Port:** 3000
**Status:** Production Ready ✅
