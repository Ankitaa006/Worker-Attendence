export const digitalWorkspace = [
  {
    id: 1,
    icon: "🏗️",
    col: "slate-900",
    title: "Site Registration & Wage Floors",
    description:
      "Admins register infrastructure projects, assign geofences, and apply configured minimum daily wage rates.",
    type: {
      type1: "• Capacity allocation & safety threshold",
      type2: "• Automated statutory compliance scoring",
    },
  },
  {
    id: 2,
    icon: "📅",
    col: "blue-700",
    title: "Digital Muster Roll",
    description:
      "Eliminates tamperable paper registers. One-click batch attendance with support for Full Day (1.0), Half Day (0.5), Absent (0.0), and overtime hours.",
    type: {
      type1: "• Instant batch mark present/absent",
      type2: "• Automated statutory compliance scoring",
    },
  },
  {
    id: 3,
    icon: "💰",
    col: "emerald-700",
    title: "Automated Wage Engine",
    description:
      "Printable payment vouchers complying with Section 78(2)(b) of the Payment of Wages Act, including breakdown of hours, rates, and thumb signature blocks.",
    type: {
      type1: "• Automatic advance deductions balance tracking",
      type2: "• Exportable CSV ledgers for site engineers",
    },
  },
  {
    id: 4,
    icon: "🧾",
    col: "indigo-700",
    title: "Statutory Form XIV Wage Slips",
    description:
      "Printable payment vouchers complying with Section 78(2)(b) of the Payment of Wages Act, including breakdown of hours, rates, and thumb signature blocks.",
    type: {
      type1: "• Print-ready CSS (@media print)",
      type2: "• Verifiable audit voucher identifier",
    },
  },
  {
    id: 5,
    icon: "🛡️",
    col: "amber-600",
    title: "1% BOCW Cess Escrow Ledger",
    description:
      "Every wage payment logs a statutory 1% construction welfare cess contribution directly into the State BOCW Welfare escrow record.",
    type: {
      type1: "• Transparent labour welfare fund accounting",
      type2: "• Principal employer compliance protection",
    },
  },
  {
    id: 6,
    icon: "📢",
    col: "rose-600",
    title: "Worker Speech & Grievance Redressal",
    description:
      "Bilingual mobile portal equipped with Hindi text-to-speech audio readouts, 28-day calendar inspection, and a 48h grievance redressal workflow.",
    type: {
      type1: "• Voice synthesizer for low-literacy workers",
      type2: "• Toll-Free 14434 helpline direct integration",
    },
  },
];

export const regulatory = [
  {
    id: 1,
    title: "1. Building & Other Construction Workers Act 1996",
    desc: "Mandates safety welfare escrow, 1% building cess deduction on labour cost, and mandatory accident insurance registration under the State Welfare Board.",
    act: "BOCW Act Central Rules, Part III",
  },
  {
    id: 2,
    title: "2. Contract Labour (Regulation & Abolition) Act 1970",
    desc: "Mandates Form XIV wage slip distribution under Rule 78(2)(b) and holds the Principal Employer jointly responsible for timely payment of wages.",
    act: "Rule 78(2)(b) Muster & Payment Slips",
  },
  {
    id: 3,
    title: "3. Minimum Wages Act 1948 & Wage Code",
    desc: "Prohibits wage settlements below regional floor minimums. The platform automatically blocks entries that breach designated minimum rates.",
    act: "Sec 12 Minimum Wages Compliance",
  },
];

export const frequentAskQuestion = [
  {
    id: 1,
    title: "How do contractors receive their login credentials?",
    desc: "Contractors do not register publicly without authorization. When the Principal Admin onboards a contractor to a project, the platform generates a unique scoped User ID (e.g., CONT-APEX-site1) and password. If that contractor works for a different Admin, a separate scoped credential is generated.",
  },
  {
    id: 2,
    title: "How do unorganized daily labourers access the portal?",
    desc: "When a contractor enrolls a worker, the system assigns an official Worker ID. The worker logs into their self-service portal using their Worker ID and access PIN.",
  },
  {
    id: 3,
    title: "How is the 1% BOCW Welfare Cess accounted for?",
    desc: "Whenever a contractor records a wage payment, the escrow calculation engine automatically calculates 1% of the gross disbursed amount and logs it into the Admin's BOCW Welfare Cess Ledger, ensuring transparent state treasury reconciliation.",
  },
  {
    id: 4,
    title: "What if a worker's overtime or attendance is marked incorrectly?",
    desc: "Labourers can lodge an instant attendance or overtime grievance from their mobile portal. This ticket is instantly routed to the Principal Admin and Labour Inspectorate, with a mandated 48-hour resolution timeframe under BOCW citizen charter rules.",
  },
];


export const roles = [
  {
    id: "admin",
    label: "Admin",
    icon: "⚖️",
  },
  {
    id: "contractor",
    label: "Contractor",
    icon: "👷",
  },
  {
    id: "labourer",
    label: "Labourer",
    icon: "👨‍🔧",
  },
];