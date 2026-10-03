# BCOW System Architecture

## 📐 System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BCOW SYSTEM ARCHITECTURE                    │
└─────────────────────────────────────────────────────────────────────┘

                           🌐 FRONTEND
                    (React + Vite @ Port 5173)
                              │
                              │ HTTP/CORS
                              ▼
           ┌──────────────────────────────────────────┐
           │   🔗 CORS Configuration (Port 3000)      │
           │   - Automatic Token Injection            │
           │   - Error Handling & Redirect            │
           │   - Request/Response Interceptors        │
           └──────────────────────────────────────────┘
                              │
                              │ REST API
                              ▼
    ┌────────────────────────────────────────────────────────┐
    │            🖥️  EXPRESS BACKEND                         │
    │            (Node.js @ Port 3000)                       │
    │                                                        │
    │  ┌────────────────────────────────────────────┐       │
    │  │  MIDDLEWARE LAYER                          │       │
    │  │  - CORS Handler                            │       │
    │  │  - JWT Authentication                      │       │
    │  │  - Request Validation                      │       │
    │  │  - Role-Based Authorization                │       │
    │  └────────────────────────────────────────────┘       │
    │                      ▼                                │
    │  ┌────────────────────────────────────────────┐       │
    │  │  ROUTING LAYER                             │       │
    │  ├─ /api/auth        (Authentication)        │       │
    │  ├─ /api/admin       (Admin Operations)      │       │
    │  ├─ /api/contractor  (Contractor Ops)        │       │
    │  └─ /api/worker      (Worker Ops)            │       │
    │  └────────────────────────────────────────────┘       │
    │                      ▼                                │
    │  ┌────────────────────────────────────────────┐       │
    │  │  BUSINESS LOGIC LAYER                      │       │
    │  │  - Authentication & Authorization          │       │
    │  │  - Attendance Management                   │       │
    │  │  - Wage Calculation                        │       │
    │  │  - Dispute Handling                        │       │
    │  │  - Compliance Scoring                      │       │
    │  └────────────────────────────────────────────┘       │
    │                      ▼                                │
    │  ┌────────────────────────────────────────────┐       │
    │  │  DATA ACCESS LAYER (Models/Mongoose)      │       │
    │  ├─ Admin                                     │       │
    │  ├─ Contractor                               │       │
    │  ├─ Worker                                   │       │
    │  ├─ Site                                     │       │
    │  ├─ Attendance                               │       │
    │  ├─ Wage                                     │       │
    │  └─ Dispute                                  │       │
    │  └────────────────────────────────────────────┘       │
    └────────────────────────────────────────────────────────┘
                              │
                              │ MongoDB Driver
                              ▼
    ┌────────────────────────────────────────────────────────┐
    │         🗄️  MONGODB DATABASE                           │
    │         (bcow_db)                                      │
    │                                                        │
    │  Collections:                                         │
    │  ├─ admins           (System administrators)          │
    │  ├─ contractors      (Construction firms)             │
    │  ├─ workers          (Labour workforce)               │
    │  ├─ sites            (Project sites)                  │
    │  ├─ attendances      (Daily records)                  │
    │  ├─ wages            (Payroll records)                │
    │  └─ disputes         (Grievance/Issues)               │
    │                                                        │
    │  Indexes:                                             │
    │  ├─ Unique: email, licence, aadharNo, mobileNumber   │
    │  ├─ Foreign Keys: site references, contractor refs    │
    │  └─ Date: createdAt, updatedAt, deletedAt            │
    └────────────────────────────────────────────────────────┘
```

## 👥 User Flow Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    USER AUTHENTICATION FLOW                   │
└──────────────────────────────────────────────────────────────┘

ADMIN USER:
  1. Email & Password Signup
  2. Credentials stored (password hashed)
  3. Login → Token Generated → Dashboard Access
  4. Protected Routes: All admin endpoints require token

CONTRACTOR USER:
  1. Firm Details Signup
  2. Auto-generated: LoginID + Password (encrypted)
  3. Login with LoginID → Token Generated
  4. Protected Routes: Contractor endpoints
  5. Can manage: Workers, Attendance, Wages, Sites

WORKER USER:
  1. Registered by Contractor (no self-signup)
  2. Auto-assigned: WorkerID + PIN (last 4 phone digits)
  3. Login with WorkerID + PIN
  4. Protected Routes: Worker self-service endpoints
  5. Can access: Attendance, Wages, Disputes, Receipts

┌─────────────────────────────────────────────────────────────┐
│               TOKEN & AUTHORIZATION FLOW                     │
└─────────────────────────────────────────────────────────────┘

  User Login
      │
      ▼
  Validate Credentials
      │
      ├─ Invalid → Return 401
      │
      └─ Valid → Generate JWT Token
                 {id, role, expiresIn: 7d}
                      │
                      ▼
                  Store in localStorage
                  (Frontend)
                      │
                      ▼
                  Include in Authorization Header
                  Bearer {token}
                      │
                      ▼
            Backend Middleware Verification
                  ├─ Check Token Exists
                  ├─ Verify Token Signature
                  ├─ Check Expiration
                  └─ Check Role Permissions
                      │
                      ├─ Invalid → 401 Unauthorized
                      │
                      └─ Valid → Process Request
                                 Access Resource
```

## 🔄 Request-Response Cycle

```
┌────────────────────────────────────────────────────────────┐
│            REQUEST FLOW - ADMIN MARKS WORKER PAID           │
└────────────────────────────────────────────────────────────┘

FRONTEND (React Component)
  ├─ User clicks "Disburse Wage"
  ├─ Collects: wageID, paymentMode
  └─ axiosInstance.put('/contractor/wages/{id}/disburse')
           │
           ▼
INTERCEPTOR
  ├─ Checks localStorage for token
  ├─ Adds Header: Authorization: Bearer {token}
  └─ Makes HTTPS Request to http://localhost:3000/api/...
           │
           ▼
BACKEND - REQUEST MIDDLEWARE
  ├─ CORS Check ✓
  ├─ Body Parser ✓
  ├─ Extract Token from Header
  └─ JWT Verification
           │
           ▼
AUTHENTICATION MIDDLEWARE
  ├─ Verify Token Signature
  ├─ Check Expiration
  ├─ Extract: {id (contractorID), role}
  └─ Attach to req.user
           │
           ▼
AUTHORIZATION MIDDLEWARE
  ├─ Check req.user.role === 'contractor' ✓
  └─ Grant Access
           │
           ▼
ROUTE HANDLER - /contractor/wages/:id/disburse
  ├─ req.params.id = wageID
  ├─ req.user.id = contractorID
  ├─ req.body = {paymentMode}
  │
  ├─ BUSINESS LOGIC
  │  ├─ Find Wage by ID
  │  ├─ Verify wage belongs to this contractor
  │  ├─ Update: status = 'paid', disbursedAt = now()
  │  └─ Save to Database
  │
  └─ Return Response
           │
           ▼
RESPONSE
  {
    "success": true,
    "message": "Wage disbursed successfully",
    "data": { /* updated wage object */ }
  }
           │
           ▼
FRONTEND
  ├─ Receive Response (status 200)
  ├─ axiosInstance interceptor processes
  ├─ Component state updates
  ├─ UI refreshes with new data
  └─ Show Success Toast

ERROR SCENARIOS:
  
  401 Unauthorized:
    ├─ No token or Invalid token
    └─ Clear localStorage + Navigate to login
  
  403 Forbidden:
    ├─ User role doesn't have access
    └─ Show access denied message
  
  500 Server Error:
    ├─ Database error or server crash
    └─ Show generic error message
```

## 📊 Data Relationships

```
┌──────────────────────────────────────────────────────────┐
│           ENTITY RELATIONSHIP DIAGRAM                     │
└──────────────────────────────────────────────────────────┘

CONTRACTOR ──┐
             ├──→ SITE (1:Many)
             │      │
             │      ├──→ WORKER (Many:Many) via assignedSite
             │      │      │
             │      │      ├──→ ATTENDANCE (1:Many)
             │      │      │      │
             │      │      │      ├─ Date
             │      │      │      ├─ Status
             │      │      │      ├─ OvertimeHours
             │      │      │      └─ DailyWage
             │      │      │
             │      │      ├──→ WAGE (1:Many per month)
             │      │      │      │
             │      │      │      ├─ DaysWorked
             │      │      │      ├─ OvertimeHours
             │      │      │      ├─ GrossEarnings
             │      │      │      ├─ NetPayable
             │      │      │      └─ Status (pending/paid)
             │      │      │
             │      │      └──→ DISPUTE (1:Many)
             │      │             │
             │      │             ├─ Title
             │      │             ├─ Category
             │      │             ├─ Status (open/resolved)
             │      │             └─ Resolution
             │      │
             │      └──→ Site Details (minWage, totalFund, etc)
             │
             └──→ Contractor Details (compliance, status)

ADMIN ────────→ Oversees all of above
                ├─ Can create/suspend CONTRACTOR
                ├─ Can view all SITES
                ├─ Can view all WORKERS
                ├─ Can manage DISPUTES
                └─ Can generate REPORTS
```

## 🔐 Security Layers

```
┌────────────────────────────────────────────────┐
│           SECURITY ARCHITECTURE                │
└────────────────────────────────────────────────┘

LAYER 1: NETWORK SECURITY
  ├─ CORS Whitelist (only localhost:5173)
  ├─ No JSONP support
  └─ Only POST/GET/PUT allowed

LAYER 2: AUTHENTICATION
  ├─ Password Hashing (bcryptjs - 10 rounds)
  ├─ JWT Tokens with 7-day expiry
  ├─ Secure token storage (localStorage)
  └─ Token refresh on login

LAYER 3: AUTHORIZATION
  ├─ Role-based Access Control
  │  ├─ Admin: All endpoints
  │  ├─ Contractor: Own site/worker endpoints
  │  └─ Worker: Own attendance/wage endpoints
  ├─ Resource ownership validation
  └─ Action-level permissions

LAYER 4: DATA VALIDATION
  ├─ Request body validation
  ├─ Email/Phone format validation
  ├─ Unique constraint checking
  └─ Type checking (Mongoose schemas)

LAYER 5: DATA PROTECTION
  ├─ Password never returned in responses
  ├─ PII partially masked (aadhar last 4 only)
  ├─ Soft deletes (deletedAt field)
  └─ Audit timestamps (createdAt, updatedAt)

LAYER 6: TRANSPORT SECURITY
  ├─ HTTPS ready (for production)
  ├─ No sensitive data in URLs
  ├─ All sensitive data in request body
  └─ Secure cookie options (production-ready)
```

## 📈 Scalability & Performance

```
CURRENT SETUP:
  ├─ Single MongoDB instance
  ├─ Single Express server
  ├─ In-memory session management
  └─ Suitable for development/small teams

SCALING OPPORTUNITIES:
  1. Database
     ├─ MongoDB Atlas (managed)
     ├─ Read replicas for reporting
     └─ Indexes on frequently queried fields
  
  2. Backend
     ├─ Load balancing (Nginx)
     ├─ Process clustering (PM2)
     └─ Caching layer (Redis)
  
  3. Frontend
     ├─ CDN distribution
     ├─ Code splitting
     └─ Lazy loading components
  
  4. Infrastructure
     ├─ Docker containerization
     ├─ Kubernetes orchestration
     └─ CI/CD pipeline
```

## 🚀 Deployment Architecture (Future)

```
┌─────────────────────────────────────────────────────┐
│              PRODUCTION DEPLOYMENT                  │
└─────────────────────────────────────────────────────┘

USERS (HTTPS)
  │
  ├─→ CDN (Frontend static files)
  │
  ├─→ Load Balancer (Nginx/HAProxy)
  │
  ├─→ Backend Cluster (Node.js)
  │   ├─ Instance 1 (port 3000)
  │   ├─ Instance 2 (port 3000)
  │   └─ Instance N (port 3000)
  │
  ├─→ Cache Layer (Redis)
  │   └─ Sessions, tokens, frequently accessed data
  │
  └─→ Database Layer
      ├─ Primary MongoDB (write)
      ├─ Secondary replicas (read)
      └─ Automated backups

NOTE: Current development setup is simplified for easy startup
```

---

This architecture ensures:
✅ Separation of concerns (Frontend/Backend)
✅ Security at multiple layers
✅ Role-based access control
✅ Scalable database design
✅ RESTful API design
✅ Error handling and validation
✅ Token-based authentication
✅ CORS protection
