import React, { useState } from "react";
import { issueCategoryHed } from "../assets/worker";

const ReportIsuue = () => {

  const today = new Date().toISOString().split("T")[0];
  const [issueCategory, setIsuueCategory] = useState("");
  const [dateIncident, setDateIncident] = useState(today);
  const [explainProblem, setExplainProbelem] = useState("");

 

  return (
    <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between mx-auto px-3 sm:px-4 py-2">
      {/* raise attendence or wage */}
      <div className="w-full lg:w-5/8 flex flex-col items-start justify-center border border-gray-300 rounded-lg shadow-lg px-8 py-4">
        {/* header */}
        <div className="flex flex-row items-center justify-center gap-2">
          <span className="w-11 h-11 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
            ⚠️
          </span>
          <span>
            <h1 className="font-bold text-md">
              Raise Attendance or Wage Grievance
            </h1>
            <p className="text-xs text-gray-500">
              If there is any discrepancy in attendance or payment, please
              report it immediately.
            </p>
          </span>
        </div>

        {/* form */}
        <form className="w-full space-y-4 mt-4">
          {/* name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#12264b]">
              Issue Category
              <span className="ml-1 text-slate-500">*</span>
            </label>
            <select
              value={issueCategory}
              onChange={(e) => setIsuueCategory(e.target.value)}
              className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
            >
              {issueCategoryHed.map((isu) => (
                <option key={isu.id} value={isu.title}>
                  {isu.title}
                </option>
              ))}
            </select>
          </div>

          {/* tade role and daily wage */}

          {/* Trade Role */}

          <div className="w-full">
            <label className="mb-2 block text-sm font-semibold text-[#12264b]">
              Date of Incident
              <span className="ml-1 text-slate-500">*</span>
            </label>
            <input
              type="date"
              value={dateIncident}
              onChange={(event) => setDateIncident(event.target.value)}
              placeholder={"8-9-12"}
              className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
            />
          </div>

          {/* Dily wage */}
          <div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#12264b]">
                Daily Wage Rate
                <span className="ml-1 text-slate-500">*</span>
              </label>
              <textarea
                type="text"
                placeholder="e.g. On Saturday 5th Sep, I worked 2 hours extra for slab pouring till 8 PM, but it is not shown in my overtime."
                value={explainProblem}
                onChange={(event) => setExplainProbelem(event.target.value)}
                className="w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
                rows={4}
              />
            </div>
          </div>

          {/* mobile number and Aadhar */}

          {/* buttons */}
          <div className="w-full flex flex-row items-end justify-end gap-2">
            <button className="w-full px-4 py-3 bg-orange-600 hover:bg-orange-800 text-white text-sm font-semibold rounded-lg transition shadow cursor-pointer">
              📢 Submit Grievance to Labour Officer
            </button>
          </div>
        </form>
      </div>
      {/* Bcow and your active ticket */}
      <div>hi</div>
    </div>
  );
};

export default ReportIsuue;
