export const adminLinks = [
  { id: 1, title: "Compliance Overview", path: "compliance-overview" },
  { id: 2, title: "Contract Directory", path: "contarctor-overview" },
  { id: 3, title: "Dispute Inbox", path: "dispute-inbox" },
  { id: 4, title: "Sites Directory", path: "sites-directory" },
  { id: 5, title: "Funds & 1% BOCW Case", path: "funds-case" },
  { id: 6, title: "Labour Audit", path: "labour-audit" },
];

export const AdmincardData = [
  {
    id: 1,
    title: "Monitored Construction Sites",
    data: "3 Active",
    desc: "All sites connected to geo-roster",
    dataCol: "black",
    descCol: "green-700",
  },
  {
    id: 2,
    title: "Total Enrolled Workers",
    data: "64 Workers",
    desc: "100% Aadhaar/ID verified",
    dataCol: "black",
    descCol: "gray-500",
  },
  {
    id: 3,
    title: "BOCW 1% Cess Accrued",
    data: "₹4,280",
    desc: "Ready for State Welfare Remittance",
    dataCol: "orange-400",
    descCol: "gray-500",
  },
  {
    id: 4,
    title: "Statutory Minimum Wage Violations",
    data: "0 Cases",
    desc: "Full compliance across contractors",
    dataCol: "green-700",
    descCol: "green-700",
  },
];

export const complianceScoreboard = [
  {
    id: 1,
    siteName: "Metro Corridor Line 3 (Tower B)",
    contractor: "Apex Buildcon Infrastructures Ltd",
    laborForce: "20",
    passed: "100",
    minWage: "550",
    payScore: "94",
    disputeOpen: "1",
    status: "Approved",
  },
  {
    id: 2,
    siteName: "Greenfield Heights Phase II",
    contractor: "Shiv Shakti Construction Works",
    laborForce: "26",
    passed: "100",
    minWage: "520",
    payScore: "98",
    disputeOpen: "0",
    status: "Approved",
  },
  {
    id: 3,
    siteName: "NH-48 Flyover Widening Project",
    contractor: "National Roadways Infra Corp",
    laborForce: "18",
    passed: "100",
    minWage: "550",
    payScore: "82",
    disputeOpen: "0",
    status: "watchlist",
  },
];

export const contractorAgencyDetails = [
  {
    id: 1,
    status: "Active",
    compliance: "96",
    title: "Apex Buildcon Infrastructures Ltd",
    contact: "Virendra Oberoi",
    liscence: "DL-BOCW-2023-8812",
    phone: "9811204891",
    site: "Metro Corridor Line 3",
    workforce: "12",
  },
  {
    id: 2,
    status: "Active",
    compliance: "98",
    title: "Shiv Shakti Construction Works",
    contact: "Shivkumar Sharma",
    liscence: "HR-BOCW-2024-4091",
    phone: "9871145290",
    site: "Greenfield Heights Phase II",
    workforce: "0",
  },
  {
    id: 3,
    status: "Active",
    compliance: "88",
    title: "National Roadways Infra Corp",
    contact: "Baljit Singh Dhillon",
    liscence: "DL-BOCW-2022-1102",
    phone: "9920194812",
    site: "NH-48 Flyover Widening Project",
    workforce: "0",
  },
];

export const grievance = [
  {
    id: 1,
    name: "Ramesh Kumar",
    disputeTitle: "Overtime Hours Missing",
    date: "05 Sep 2026",
    status: "Under Review",
    disputeDesc:
      "On Saturday 5th Sep worked 2 hours extra on slab casting till 7 PM, but overtime units were omitted from supervisor register.",
    caseId: "DISP-401",
    workpersonId: "SHR-101",
  },
];
