# Daily Wage Labour Attendance & Payment Platform

A full-stack workforce management platform designed to digitize **daily wage labour attendance, wage calculation, worker management, and payment tracking** for construction contractors and site managers.

The platform replaces traditional manual registers with a centralized digital system that helps contractors manage workers across multiple construction sites, calculate wages accurately, and maintain transparent payment records.

---

## 📌 Project Overview

Construction sites often depend on paper-based attendance registers and manual wage calculations. This can result in:

* Attendance errors
* Incorrect wage calculations
* Payment disputes
* Difficulty managing workers across multiple sites
* Poor visibility into pending wages
* Time-consuming record keeping

This platform provides a centralized solution for managing the complete workforce lifecycle:

**Workers → Sites → Attendance → Wages → Payments → Reports**

---

## 🎯 Objectives

### Primary Objectives

* Digitize daily worker attendance
* Automate wage calculation
* Track worker payments and pending dues
* Manage workers across multiple construction sites
* Reduce manual errors and payment disputes
* Maintain transparent workforce records

### Secondary Objectives

* Maintain worker work history
* Generate attendance and wage reports
* Improve labour record keeping
* Support labour-law compliance requirements
* Provide contractors with a simple workforce management interface

---

## ✨ Key Features

### 👷 Contractor Dashboard

* Overview of active construction sites
* Total workers
* Attendance summary
* Wage summary
* Pending payments
* Quick attendance actions
* Labour-law related alerts

### 🏗️ Site Management

Contractors can manage workers according to their assigned construction site.

Example sites:

* Metro Corridor Line 3
* Greenfield Heights Phase II
* NH-48 Flyover Widening Project

The active site can be changed from the contractor dashboard.

---

### 👥 Worker Management

Manage complete worker profiles including:

* Worker name
* Labour ID
* Category / trade
* Mobile number
* Aadhaar information
* Daily wage
* Assigned construction site
* Work history

Supported worker categories include:

* Skilled Mason
* Electrician
* Carpenter
* Bar Bender
* Plumber
* Helper / Labourer

---

### 📅 Attendance Management

Contractors can record daily attendance for workers.

Supported attendance states:

* **Present**
* **Absent**
* **Half Day**
* **Overtime**

The attendance module calculates the worker's payable amount according to their attendance and wage rate.

---

### 💰 Wage Calculation

The wage calculation module automatically determines worker earnings based on:

```text
Daily Wage
+
Overtime
+
Attendance
=
Total Earnings
```

Example:

```text
Daily Wage      : ₹850
Attendance      : Present
OT Hours        : 2
OT Rate         : ₹106/hour

Regular Wage    : ₹850
Overtime Wage   : ₹212

Total Wage      : ₹1,062
```

The system can also calculate:

* Daily earnings
* Weekly earnings
* Total earnings
* Overtime earnings
* Pending wages
* Paid wages

---

### 💳 Payment Tracking

Contractors can record payments made to workers.

Payment information includes:

* Worker
* Amount paid
* Payment date
* Payment mode
* Payment note
* Remaining dues

Supported payment modes can include:

* Cash
* UPI
* Bank Transfer

> Digital payment processing itself is outside the initial project scope. The platform records and tracks payment information.

---

### 🧾 Payment Slip / Wage Voucher

Workers' payment records can be represented through a payment slip containing:

* Worker information
* Labour ID
* Trade
* Attendance
* Wage details
* Overtime
* Amount paid
* Payment mode
* Payment date

The system can generate a printable/downloadable payment voucher.

---

### 📊 Reports & Records

The platform maintains records for:

* Attendance
* Worker wages
* Overtime
* Payments
* Pending dues
* Worker history

These records can be used by contractors for workforce monitoring and reporting.

---

### 🔐 Authentication & Security

The application is designed with secure authentication practices including:

* Login / registration
* Protected routes
* Authentication-based access
* Input validation
* Secure database operations
* Role-based access architecture

---

## 🧩 Application Modules

The platform is divided into the following major modules:

```text
Authentication
     │
     ▼
Contractor Dashboard
     │
     ├── Site Management
     │
     ├── Worker Management
     │
     ├── Attendance
     │
     ├── Wage Calculation
     │
     └── Payment Tracking
              │
              ▼
        Payment History
```

---

## 📄 Main Pages

The application contains interconnected pages such as:

1. Login / Registration
2. Contractor Dashboard
3. Labour Directory
4. Add Worker
5. Mark Attendance
6. Wage Calculator
7. Payment Ledger
8. Payment Slip
9. Admin Panel

---

## 🔄 Contractor Workflow

```text
Register / Login
       │
       ▼
Contractor Dashboard
       │
       ▼
Select Construction Site
       │
       ▼
Add / Manage Workers
       │
       ▼
Mark Daily Attendance
       │
       ▼
Calculate Wages
       │
       ▼
Record Worker Payment
       │
       ▼
Generate Payment Slip
       │
       ▼
Track Payment History & Dues
```

---

## 🛠️ Technology Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Tailwind CSS
* React Router
* React Icons

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* JWT Authentication

### Document Generation

* React PDF / PDF generation

### Deployment

Frontend:

* Vercel

Backend:

* Render

Database:

* MongoDB Atlas

---

## 📁 Project Structure

```text
Daily-Wage-Labour-Management/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── cards/
│   │   ├── pages/
│   │   ├── constructor/
│   │   ├── assets/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── backend/
│   │
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🗃️ Core Data Models

### Worker

```javascript
{
  workerName: String,
  labourId: String,
  category: String,
  mobile: String,
  aadhar: String,
  dailyWage: Number,
  assignedSite: String
}
```

### Attendance

```javascript
{
  workerId: String,
  date: Date,
  status: String,
  overtimeHours: Number
}
```

### Payment

```javascript
{
  workerId: String,
  amount: Number,
  paymentMode: String,
  paymentDate: Date,
  paymentNote: String
}
```

### Site

```javascript
{
  siteName: String,
  location: String,
  contractorId: String,
  workers: Array
}
```

---

## 💵 Example Wage Configuration

| Trade             | Daily Wage |
| ----------------- | ---------: |
| Skilled Mason     |       ₹850 |
| Electrician       |       ₹900 |
| Carpenter         |       ₹820 |
| Bar Bender        |       ₹850 |
| Plumber           |       ₹850 |
| Helper / Labourer |       ₹580 |

> Wage values are demonstration/project data and can be configured according to the applicable wage structure.

---

## 📈 Example Attendance Calculation

Suppose a worker has:

```text
Worker       : Ramesh Kumar
Trade        : Skilled Mason
Daily Wage   : ₹850
Status       : Present
OT Hours     : 2
OT Rate      : ₹106/hour
```

Calculation:

```text
Regular Wage
= ₹850

Overtime
= 2 × ₹106
= ₹212

Total
= ₹850 + ₹212
= ₹1,062
```

---

## 📊 Dashboard Information

The contractor dashboard can provide an overview of:

* Total workers
* Present workers
* Absent workers
* Total daily wages
* Overtime wages
* Pending payments
* Active construction site
* Recent payment activity
* Attendance status

---

## 🔒 Non-Functional Requirements

### Security

* Secure authentication
* Protected API endpoints
* Input validation
* Secure database access

### Performance

* Fast page navigation
* Efficient API requests
* Optimized database queries
* Responsive UI

### Usability

The interface is designed to be:

* Simple
* Responsive
* Easy to understand
* Suitable for users with limited digital literacy

### Scalability

The architecture allows the platform to expand to:

* Multiple contractors
* Multiple sites
* Thousands of workers
* Additional administrative modules

---

## 📱 Responsive Design

The application is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile devices

The contractor interface adapts to different screen sizes for on-site usage.

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/TheFrustrator/YOUR-REPOSITORY.git
```

```bash
cd YOUR-REPOSITORY
```

---

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

### 3. Install Backend Dependencies

Open another terminal:

```bash
cd backend
npm install
```

---

### 4. Configure Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

For the frontend, configure your API URL if required:

```env
VITE_API_URL=http://localhost:5000
```

---

### 5. Start Backend

```bash
cd backend
npm run dev
```

---

### 6. Start Frontend

```bash
cd frontend
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🧪 Testing Checklist

Before deployment, verify:

* [ ] User registration works
* [ ] Login works
* [ ] Protected routes work
* [ ] Site selection works
* [ ] Worker creation works
* [ ] Worker information can be updated
* [ ] Attendance can be marked
* [ ] Present / absent / half-day states work
* [ ] Overtime is calculated correctly
* [ ] Wage calculation is accurate
* [ ] Payments can be recorded
* [ ] Payment history is displayed
* [ ] Pending dues are calculated correctly
* [ ] Payment slips can be generated
* [ ] Responsive layout works
* [ ] API validation works
* [ ] Database operations work correctly

---

## 📌 Project Scope

### Phase 1 — Included

* User registration and login
* Contractor dashboard
* Construction site management
* Worker management
* Attendance tracking
* Wage calculation
* Payment tracking
* Payment history
* Admin management
* Reports

### Phase 1 — Not Included

* Biometric attendance
* Direct UPI/payment processing
* Automated government compliance filing
* Dedicated mobile application

---

## 🔮 Future Enhancements

### 📱 Mobile Application

Develop dedicated Android and iOS applications for contractors and site managers.

### 🟢 QR Attendance

Workers could scan a site-specific QR code to record attendance.

### 👆 Biometric Attendance

Integrate biometric devices for automated attendance.

### 💳 Digital Payments

Future versions could integrate:

* UPI
* Bank transfers
* Payment gateways

### 🏛️ Government Compliance

Future versions may provide automated labour compliance reports and documentation.

### 🌐 Multi-Language Support

Support regional languages to improve accessibility for workers and contractors.

### 🤖 Smart Analytics

Analytics could identify:

* Attendance patterns
* Labour shortages
* Overtime trends
* Payment delays
* Workforce costs

---

## 📊 Key Performance Indicators

The platform can measure:

* Number of registered contractors
* Number of active construction sites
* Number of workers managed
* Attendance records created
* Payments recorded
* Pending wage amount
* Payment tracking accuracy
* Contractor engagement

---

## 🎯 Expected Impact

The platform is designed to improve:

**Transparency**

Workers and contractors have clearer records of attendance, wages, and payments.

**Accuracy**

Automated calculations reduce errors caused by manual wage calculation.

**Efficiency**

Contractors spend less time maintaining paper registers and calculating wages.

**Record Keeping**

Digital records make historical attendance and payment information easier to access.

**Workforce Management**

Contractors can manage workers across multiple construction sites from a centralized system.

---

## 📚 Reference & Compliance Resources

The project is designed around general construction workforce management requirements and can be aligned with applicable labour regulations.

* Ministry of Labour and Employment
* Building and Other Construction Workers Welfare Boards
* International Labour Organization

> Labour rules, minimum wages, welfare requirements, and compliance obligations vary by jurisdiction and can change over time. Production deployments should validate applicable requirements against current official regulations.

---

## 👨‍💻 Developer

**Sudip Bhunia**

Full Stack Developer | React Developer | MERN Stack

### Connect

* Portfolio: https://sudip-bhunia.netlify.app/
* LinkedIn: https://www.linkedin.com/in/sudip-bhunia-9ba541285/
* GitHub: https://github.com/TheFrustrator

---

## ⭐ Project Status

```text
Development Status: Active Development
Project Type: Full Stack Web Application
Domain: Construction Workforce Management
Architecture: MERN Stack
```

---

## 📄 License

This project is developed for educational, portfolio, and project-evaluation purposes.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
