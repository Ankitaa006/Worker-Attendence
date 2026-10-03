# BCOW Backend - Building and Construction Workers Management System

A comprehensive Node.js/Express/MongoDB backend for managing construction workers, contractors, sites, attendance, wages, and disputes.

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Features](#features)

## 📁 Project Structure

```
BCOW_BACKEND/
├── models/              # MongoDB Models
│   ├── Admin.js
│   ├── Contractor.js
│   ├── Worker.js
│   ├── Site.js
│   ├── Attendance.js
│   ├── Wage.js
│   └── Dispute.js
├── routes/              # API Routes
│   ├── auth.js         # Authentication routes
│   ├── admin.js        # Admin routes
│   ├── contractor.js   # Contractor routes
│   └── worker.js       # Worker routes
├── middleware/          # Express Middleware
│   └── auth.js         # JWT authentication & authorization
├── utils/              # Utility Functions
│   └── helpers.js      # Helper functions
├── config/             # Configuration files
├── .env                # Environment variables
├── .gitignore          # Git ignore file
├── package.json        # Node dependencies
└── server.js           # Main server file
```

## 📦 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🚀 Installation

1. **Clone or navigate to the backend directory:**
   ```bash
   cd BCOW_BACKEND
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create and configure .env file:**
   ```bash
   cp .env.example .env
   ```

## ⚙️ Environment Configuration

Edit `.env` file with your configuration:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/bcow_db
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bcow_db

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Optional: Email Configuration
# EMAIL_SERVICE=gmail
# EMAIL_USER=your_email@gmail.com
# EMAIL_PASSWORD=your_app_password

# File Upload
MAX_FILE_SIZE=5242880
```

### Getting MongoDB Running:

**Local MongoDB:**
```bash
# Windows (if installed)
mongod

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

**MongoDB Atlas (Cloud):**
1. Create account at mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Replace MONGODB_URI in .env

## ▶️ Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`

**Check server health:**
```bash
curl http://localhost:3000/api/health
```

## 📡 API Endpoints

### Authentication Routes

#### Admin Signup
```
POST /api/auth/admin/signup
Body: {
  organizationName: string,
  contactName: string,
  officialMail: string (unique),
  password: string
}
```

#### Admin Login
```
POST /api/auth/admin/login
Body: {
  officialMail: string,
  password: string
}
Response: { token, user }
```

#### Contractor Signup
```
POST /api/auth/contractor/signup
Body: {
  firmName: string,
  contactPerson: string,
  phoneNumber: number,
  email: string,
  licence: string (unique)
}
Response: { token, loginId, password }
```

#### Contractor Login
```
POST /api/auth/contractor/login
Body: {
  loginId: string,
  password: string
}
Response: { token, user }
```

#### Worker Login
```
POST /api/auth/worker/login
Body: {
  workerId: string,
  accessPin: string
}
Response: { token, user }
```

### Admin Routes (Protected)

#### Get Dashboard Stats
```
GET /api/admin/dashboard
Response: { activeSites, totalWorkers, totalContractors, activeDisputes }
```

#### Compliance Overview
```
GET /api/admin/compliance-overview
Response: [{ firmName, compliance, activeWorkers, ... }]
```

#### Contractors Directory
```
GET /api/admin/contractors
POST /api/admin/contractors (Add new contractor)
PUT /api/admin/contractors/:id/suspend
```

#### Disputes Management
```
GET /api/admin/disputes
PUT /api/admin/disputes/:id/resolve
Body: { resolution: string }
```

#### Sites Management
```
GET /api/admin/sites
POST /api/admin/sites (Register new site)
```

#### Labour Audit
```
GET /api/admin/labour-audit
```

### Contractor Routes (Protected)

#### Dashboard
```
GET /api/contractor/dashboard
Response: { totalWorkers, todayAttendance }
```

#### Attendance Management
```
POST /api/contractor/attendance
Body: { workerId, date, status, overtimeHours }

GET /api/contractor/attendance?date=YYYY-MM-DD
```

#### Workers Directory
```
GET /api/contractor/workers
POST /api/contractor/workers (Add new worker)
Body: { name, role, dailyWage, mobileNumber, aadharNo, assignedSite }
```

#### Wage Management
```
GET /api/contractor/wages/:workerId
POST /api/contractor/wages (Generate wage slip)
Body: { workerId, month }

GET /api/contractor/payment-ledger
PUT /api/contractor/wages/:id/disburse
```

### Worker Routes (Protected)

#### Worker Profile
```
GET /api/worker/profile
```

#### Attendance Logs
```
GET /api/worker/attendance?month=YYYY-MM
Response: { data: [], stats: { totalPresent, totalAbsent, totalOvertime, ... } }
```

#### Wage Slip
```
GET /api/worker/wage-slip
Response: { month, daysWorked, overtimeHours, grossEarnings, netPayable, ... }
```

#### Payment Receipts
```
GET /api/worker/payment-receipts
```

#### Report Issues/Disputes
```
POST /api/worker/disputes
Body: { title, description, category }

GET /api/worker/disputes
```

## 💾 Database Models

### Admin
- officialMail (unique)
- password (hashed)
- name
- role (admin, super_admin)

### Contractor
- firmName
- contactPerson
- phoneNumber
- email
- licence (unique)
- assignedSite (reference to Site)
- compliance (0-100)
- loginId (auto-generated)
- password (hashed)
- status (active, suspended, inactive)
- activeWorkers

### Worker
- name
- role
- dailyWage
- mobileNumber (unique)
- aadharNo (unique)
- assignedSite
- assignedContractor
- workerId (unique)
- accessPin
- attendance
- totalEarnings
- status

### Site
- project
- city
- category
- totalFund
- minWage
- workforceCapacity
- assignedContractor
- status (active, inactive, completed)

### Attendance
- worker
- site
- contractor
- date
- status (present, absent, leave, half-day)
- overtimeHours
- dayWage
- overtimeWage

### Wage
- worker
- site
- contractor
- month
- daysWorked
- overtimeHours
- regularDayWage
- overtimeWage
- grossEarnings
- cashAdvanced
- netPayable
- status (pending, processed, paid)
- disbursedAt

### Dispute
- caseId (unique)
- worker
- contractor
- site
- title
- description
- category
- status (open, under_review, resolved, closed)
- severity
- resolution
- raisedAt
- resolvedAt

## ✨ Features

✅ Role-based authentication (Admin, Contractor, Worker)
✅ JWT token-based security
✅ CORS enabled for frontend integration
✅ Complete attendance management
✅ Wage calculation and payroll management
✅ Dispute tracking and resolution
✅ Compliance scoring
✅ Site and contractor management
✅ Worker registration and management
✅ Payment ledger and receipts
✅ Error handling and validation

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Role-based authorization
- Request validation
- CORS protection
- Secure environment variables

## 📝 Notes

- All timestamps are stored in UTC
- Compliance is calculated as: (0.35 × Wage) + (0.25 × Cess) + (0.25 × Payout) + (0.15 × Disposal)
- BOCW Cess = 0.01 × Total Gross Earnings
- Overtime wage = Daily wage × 1.5 × Overtime hours
- Login IDs and passwords for contractors are auto-generated for security

## 🆘 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify database credentials

**CORS Error:**
- Ensure CORS_ORIGIN in .env matches frontend URL
- Default is http://localhost:5173 for Vite frontend

**Token Expiration:**
- Tokens expire based on JWT_EXPIRE setting (default 7d)
- User needs to login again after expiration

## 📄 License

ISC

## 👨‍💻 Authors

BCOW Development Team

---

**Support:** For issues or questions, please refer to the documentation or contact the development team.
