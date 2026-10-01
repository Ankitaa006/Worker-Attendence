import React from "react";
import { FaCircle, FaBuilding, FaRegUser } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { IoShieldCheckmark } from "react-icons/io5";
import {
  digitalWorkspace,
  frequentAskQuestion,
  regulatory,
} from "../assets/workforceManagement";
import WorkfoeceManagement from "../cards/WorkfoeceManagement";
import { IoIosCheckmark } from "react-icons/io";

const LabourStandard = () => {
  return (
    <main className="w-full flex flex-col items-center justify-start">
      {/* first about section */}
      <div className="w-full lg:w-3/5 bg-slate-50 border rounded-md border-gray-100 mx-2.5 my-6 px-12 py-12 space-y-8 mt-28">
        {/* guidline */}
        <div className="w-fit flex flex-row items-center gap-1.5 bg-slate-200 border border-gray-600/15 rounded-full px-3.5 py-1.5">
          <FaCircle size={9} color="green" />
          <p className="text-[12px] text-[#1E293B]">
            <span className="font-semibold">National Labour Standards</span> •
            BOCW Welfare Act 1996 • Form XIV Certified
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-3">
          <div className="w-full flex flex-col space-y-2.5">
            {/* title */}
            <h1 className="lg:text-xl text-3xl text-slate-900 font-black">
              National Daily Wage Labour Attendance, Wage Audit & Welfare
              Platform
            </h1>
            {/* description */}
            <p className="lg:text-xs text-sm font-normal text-gray-600">
              ShramikSetu replaces informal paper rolls and cash leakage across
              construction infrastructure projects with biometric-ready
              attendance rolls, real-time minimum wage enforcement, verifiable
              Form XIV settlement vouchers, and statutory 1% BOCW welfare cess
              tracking.
            </p>
            {/* 3 columns */}
            <div className="w-ful h-full grid grid-cols-3 items-start justify-start space-y-2 gap-4">
              {/* 100% Minimum Wage */}
              <span className="flex flex-col space-y-1 items-start justify-center bg-gray-100 border border-gray-500/20 rounded-2xl px-4 py-3">
                <p className="text-xs text-[#047857] font-bold uppercase">
                  100% Minimum Wage
                </p>
                <h1 className="text-[11px] text-slate-500">
                  Automated wage floor auditing against central & state
                  statutory minimums.
                </h1>
              </span>
              {/* Rule 78(2)(b) Vouchers */}
              <span className="flex flex-col space-y-1 items-start justify-center bg-gray-100 border border-gray-500/20 rounded-2xl px-4 py-3">
                <p className="text-xs text-blue-700 font-bold uppercase">
                  Rule 78(2)(b) Vouchers
                </p>
                <h1 className="text-[11px] text-slate-500">
                  Official printable Form XIV payment slips with thumb signature
                  verification.
                </h1>
              </span>
              {/* 1% Welfare Cess */}
              <span className="flex flex-col space-y-1 items-start justify-center bg-gray-100 border border-gray-500/20 rounded-2xl px-4 py-3">
                <p className="text-xs text-amber-700 font-bold uppercase">
                  1% Welfare Cess
                </p>
                <h1 className="text-[11px] text-slate-500">
                  Automated building cess escrow calculation on all gross
                  disbursements.
                </h1>
              </span>
            </div>
          </div>
          {/* border small */}
          <br />

          {/* Rolebase gateways */}
          <div className="w-full flex flex-col gap-2 mt-4">
            {/* Secure Role-Based Gateways */}
            <div className="w-full flex flex-row items-center justify-between bg-slate-100 border border-slate-500/35 rounded-xl px-2 py-2">
              <p className="text-[12px] font-mono font-bold text-[#64748B] uppercase">
                Secure Role-Based Gateways
              </p>
              <p className="text-[10px] font-mono text-[#94A3B8] uppercase">
                STRICT RBAC GATEWAY
              </p>
            </div>
            {/* Principal Employer / Labour Commissioner */}
            <div className="w-full flex flex-row items-center justify-start bg-slate-100 border border-slate-500/35 rounded-xl px-2 py-2 gap-3 hover:border-slate-500 cursor-pointer">
              <span className="bg-black rounded-xl px-2.5 py-2.5 mx-2 my-1">
                <IoShieldCheckmark color="yellow" width={5} height={5} />
              </span>
              <span className="cursor-pointer transition">
                <h1 className="text-sm font-bold text-slate-900 hover:text-blue-700">
                  Principal Employer / Labour Commissioner
                </h1>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Project oversight, contractor onboarding & cess ledger audit
                </p>
              </span>
            </div>
            {/* Contractor Agency (ठेकेदार) */}
            <div className="w-full flex flex-row items-center justify-start bg-slate-100 border border-slate-500/35 rounded-xl px-2 py-2 gap-3 hover:border-slate-500 cursor-pointer">
              <span className="bg-blue-700 rounded-xl px-2.5 py-2.5 mx-2 my-1">
                <FaBuilding color="white" width={5} height={5} />
              </span>
              <span className="cursor-pointer transition">
                <h1 className="text-sm font-bold text-slate-900 hover:text-blue-700">
                  Contractor Agency
                </h1>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Site muster roll, worker enrollment & wage vouchers
                </p>
              </span>
            </div>
            {/* Labourer Self-Service (श्रमिक सेवा) */}
            <div className="w-full flex flex-row items-center justify-start bg-slate-100 border border-slate-500/35 rounded-xl px-2 py-2 gap-3 hover:border-slate-500 cursor-pointer">
              <span className="bg-emerald-700 rounded-xl px-2.5 py-2.5 mx-2 my-1">
                <FaRegUser color="white" width={5} height={5} />
              </span>
              <span className="cursor-pointer transition">
                <h1 className="text-sm font-bold text-slate-900 hover:text-blue-700">
                  Labourer Self-Service
                </h1>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Daily attendance, earnings, slip and audio summary
                </p>
              </span>
            </div>
            {/* securty note */}
            <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-center space-x-2">
              <CiLock color="orange" />
              <h1 className="text-emerald-700 font-bold">Security Standard:</h1>
              <h1>
                Individual session authorization enforced. Private records
                protected.
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Cryptographic Access & Governance Model */}
      <div className="w-full lg:w-3/5 bg-slate-900 text-white rounded-md mx-2.5 my-6 px-12 py-12 sm:p-10 space-y-3">
        {/* Cryptographic Access & Governance Model */}
        <h1 className="text-[11px] font-bold uppercase tracking-wider text-amber-400 font-mono">
          Cryptographic Access & Governance Model
        </h1>
        <h1>Strict Multi-Tier Scoped Credential Hierarchy</h1>
        <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
          To eliminate ghost workers and prevent contractor collusion, login
          credentials follow a strict parent-child authorization model.
          Contractors receive isolated identities bound to their registering
          Principal Admin, and workers receive tamper-evident PINs.
        </p>
        <div className="grid lg:grid-cols-3 gap-2">
          {/* Admin Provisions Site & Contractor */}
          <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-xl space-y-3">
            <h1 className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
              01
            </h1>
            <h1 className="font-bold text-sm text-white">
              1. Admin Provisions Site & Contractor
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Principal Employer defines construction project parameters,
              budget, and statutory floor wage. The system deterministically
              computes a unique Scoped Contractor ID and password.
            </p>
            <p className="text-[10px] text-slate-400">
              *If the contractor works under another Admin, an entirely separate
              unique credential pair is issued.
            </p>
          </div>
          {/*2. Contractor Enrolls Workforce  */}
          <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-xl space-y-3">
            <h1 className="w-8 h-8 rounded-lg bg-blue-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-xs">
              02
            </h1>
            <h1 className="font-bold text-sm text-white">
              2. Contractor Enrolls Workforce
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Licensed agencies maintain daily muster punches (Present 1.0,
              Half-day 0.5, Absent, and Overtime). Enrolling a worker generates
              a unique Worker ID and 4-digit Aadhaar access PIN.
            </p>
            <p className="text-[10px] text-slate-400">
              *Daily rates are automatically verified against the site's
              statutory minimum wage floor.
            </p>
          </div>
          {/* Worker Verifies & Receives Vouchers */}
          <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-xl space-y-3">
            <h1 className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
              03
            </h1>
            <h1 className="font-bold text-sm text-white">
              3. Worker Verifies & Receives Vouchers
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Labourers access their mobile self-service portal to verify days
              worked, hear Hindi voice readouts, review Form XIV vouchers, and
              raise dispute tickets in case of discrepancies.
            </p>
            <p className="text-[10px] text-slate-400">
              *Full statutory protection with 48h grievance escalation to the
              Labour Inspectorate.
            </p>
          </div>
        </div>
      </div>

      {/* Functional Scope & Modules */}
      <div className="w-full lg:w-3/5 my-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <span className="inline-flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            Functional Scope & Modules
          </span>

          <h1 className="max-w-3xl text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Comprehensive Digital Workforce Management
          </h1>

          <p className="max-w-2xl text-xs sm:text-sm text-slate-500 leading-6">
            Engineered to cover the complete lifecycle of daily wage
            construction operations from site boundaries to final settlement
            receipts.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-8 sm:mt-10">
          {digitalWorkspace.map((item) => (
            <div key={item.id} className="h-full">
              <WorkfoeceManagement
                icon={item.icon}
                color={item.col}
                title={item.title}
                description={item.description}
                type1={item.type.type1}
                type2={item.type.type2}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Legislative & Regulatory Framework Alignment */}
      <div className="w-full lg:w-3/5 bg-slate-50 border rounded-md border-gray-100 mx-2.5 mt-6 px-12 py-12">
        {/* title */}
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">
            Legislative & Regulatory Framework Alignment
          </h1>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
            ✓ 100% Statutory Adherence
          </span>
        </div>

        {/* description */}
        <p className="text-xs text-slate-500 font-hindi mt-0.5">
          Indian labor laws and minimum wage standards compliance
        </p>
        {/* blocks */}
        <div className="grid lg:grid-cols-3 py-8 gap-4">
          {regulatory.map((rule) => (
            <div
              className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 mt-4"
              key={rule.id}
            >
              <h1 className="font-bold text-slate-900 text-sm block">
                {rule.title}
              </h1>
              <p className="text-slate-600 leading-relaxed">{rule.desc}</p>
              <p className="text-[10px] text-slate-400 font-mono">{rule.act}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Platform FAQ & Helpdesk */}
      <div className="w-full lg:w-3/5 bg-slate-50 border rounded-md border-gray-100 mx-2.5 mt-6 px-12 py-12">
        {/* title */}
        <p className="text-xs text-slate-500 font-hindi mt-0.5">
          Platform FAQ & Helpdesk
        </p>
        <h1 className="text-xl font-bold text-slate-900">
          Frequently Asked Questions
        </h1>

        {/* description */}

        {/* blocks */}
        <div className="grid lg:grid-cols-2 py-4 gap-4">
          {frequentAskQuestion.map((rule) => (
            <div
              className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 mt-4"
              key={rule.id}
            >
              <h1 className="font-bold text-slate-900 text-sm block">
                {rule.title}
              </h1>
              <p className="text-slate-600 leading-relaxed">{rule.desc}</p>
              <p className="text-[10px] text-slate-400 font-mono">{rule.act}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment of Wages Act 1936 Rule 78 */}
      <div className="w-full lg:w-3/5 bg-slate-50 border rounded-md border-gray-100 mx-2.5 my-6 px-12 py-12 space-y-8">
        {/* guidline */}
        <div className="w-fit flex flex-row items-center gap-1.5 bg-slate-200 border border-gray-600/15 rounded-full px-3.5 py-1.5">
          <FaCircle size={9} color="green" />
          <p className="text-[12px] text-[#1E293B]">
            <span className="font-semibold">BOCW Act 1996</span> • Payment of
            Wages Act 1936 Rule 78
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-3">
          <div className="w-full flex flex-col space-y-2.5">
            {/* title */}
            <h1 className="lg:text-xl text-3xl text-slate-900 font-black">
              Statutory Digital Attendance, Real-Time Wages & Transparent
              Payouts for Construction Labour
            </h1>
            {/* description */}
            <p className="lg:text-xs text-sm font-normal text-gray-600">
              A verifiable workforce platform replacing manual paper muster
              rolls with biometric-ready daily attendance, automated overtime
              computation, Form XIV settlement slips, and 1% state welfare cess
              tracking.
            </p>
            {/* 3 check marks */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-slate-500 font-medium">
              <span className="flex flex-row items-center">
                <IoIosCheckmark size={28} />
                <p>Zero Wage Discrepancies</p>
              </span>
              <span className="flex flex-row items-center">
                <IoIosCheckmark size={28} />
                <p>Aadhaar Scoped PINs</p>
              </span>
              <span className="flex flex-row items-center">
                <IoIosCheckmark size={28} />
                <p>Printable Form XIV Vouchers</p>
              </span>
            </div>
          </div>
          {/* border small */}
          <br />

          {/* Rolebase gateways */}
          <div className="w-full flex flex-col gap-2">
            {/* Secure Role-Based Gateways */}
            <div className="w-full flex flex-row items-center justify-between bg-slate-100 border border-slate-500/35 rounded-xl px-2 py-2">
              <p className="text-[12px] font-mono font-bold text-[#64748B] uppercase">
                Authorized Portal Logins
              </p>
              <p className="text-[10px] font-mono text-[#94A3B8] uppercase">
                SECURE 256-BIT SSL
              </p>
            </div>
            {/* Principal Employer / Labour Commissioner */}
            <div className="w-full flex flex-row items-center justify-start bg-slate-100 border border-slate-500/35 rounded-xl px-2 py-2 gap-3 hover:border-slate-500 cursor-pointer">
              <span className="bg-black rounded-xl px-2.5 py-2.5 mx-2 my-1">
                <IoShieldCheckmark color="yellow" width={5} height={5} />
              </span>
              <span className="cursor-pointer transition">
                <h1 className="text-sm font-bold text-slate-900 hover:text-blue-700">
                  Principal Employer / Admin
                </h1>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Govt Commissioner, Project Owner & Cess Auditor
                </p>
              </span>
            </div>
            {/* Contractor Agency  */}
            <div className="w-full flex flex-row items-center justify-start bg-slate-100 border border-slate-500/35 rounded-xl px-2 py-2 gap-3 hover:border-slate-500 cursor-pointer">
              <span className="bg-blue-700 rounded-xl px-2.5 py-2.5 mx-2 my-1">
                <FaBuilding color="white" width={5} height={5} />
              </span>
              <span className="cursor-pointer transition">
                <h1 className="text-sm font-bold text-slate-900 hover:text-blue-700">
                  Licensed Contractor Agency
                </h1>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Muster roll manager, worker enrolment & pay slips
                </p>
              </span>
            </div>
            {/* Labourer Self-Service (श्रमिक सेवा) */}
            <div className="w-full flex flex-row items-center justify-start bg-slate-100 border border-slate-500/35 rounded-xl px-2 py-2 gap-3 hover:border-slate-500 cursor-pointer">
              <span className="bg-emerald-700 rounded-xl px-2.5 py-2.5 mx-2 my-1">
                <FaRegUser color="white" width={5} height={5} />
              </span>
              <span className="cursor-pointer transition">
                <h1 className="text-sm font-bold text-slate-900 hover:text-blue-700">
                  Labourer Self-Service
                </h1>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Daily attendance, earnings, slip and audio summary
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Governance Architecture */}
      <div className="w-full lg:w-3/5 bg-slate-900 text-white rounded-md mx-2.5 my-6 px-12 py-12 sm:p-10 space-y-3">
        {/* Cryptographic Access & Governance Model */}
        <h1 className="text-[11px] font-bold uppercase tracking-wider text-amber-400 font-mono">
          Security & Governance Architecture
        </h1>
        <h1>
          Hierarchical Governance: Admin → Contractor → Labour Credentials
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
          To prevent contractor collusion and protect unorganized daily wage
          earners, all contractor logins are deterministically scoped to their
          registering Principal Admin, and workers receive tamper-evident PINs
          based on Aadhaar digits.
        </p>
        <div className="grid lg:grid-cols-3 gap-2">
          {/* Admin Provisions Site & Contractor */}
          <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-xl space-y-3">
            <h1 className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
              01
            </h1>
            <h1 className="font-bold text-sm text-white">
              Admin Authorizes Site & Agency
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Admin registers project site boundaries, allocates funds, and
              onboards the contractor. The system automatically computes a
              unique scoped login ID.
            </p>
          </div>
          {/*2. Contractor Enrolls Workforce  */}
          <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-xl space-y-3">
            <h1 className="w-8 h-8 rounded-lg bg-blue-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-xs">
              02
            </h1>
            <h1 className="font-bold text-sm text-white">
              Contractor Manages Muster Roll
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Agency records daily attendance (Present, Half-Day, Absent, OT)
              and registers workers. System issues a unique worker portal access
              key.
            </p>
          </div>
          {/* Worker Verifies & Receives Vouchers */}
          <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-xl space-y-3">
            <h1 className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
              03
            </h1>
            <h1 className="font-bold text-sm text-white">
              Worker Verification & Pay Slip
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Workers verify days worked, accrued balances, and speech readouts
              on their mobile phones, backed by official Form XIV payment
              receipts.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LabourStandard;
