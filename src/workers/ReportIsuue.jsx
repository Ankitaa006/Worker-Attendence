import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { issueCategoryHed } from "../assets/worker";

const ReportIsuue = () => {
  const location = useLocation();

  // Current date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const [issueCategory, setIsuueCategory] = useState("");
  const [dateIncident, setDateIncident] = useState(today);
  const [explainProblem, setExplainProbelem] = useState("");

  // Get the date sent from AttendenceLog
  useEffect(() => {
    if (location.state?.incidentDate) {
      setDateIncident(location.state.incidentDate);
    }
  }, [location.state]);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      issueCategory,
      dateIncident,
      explainProblem,
    });
  };

  return (
    <div className="w-full max-w-6xl flex flex-col lg:flex-row items-start justify-between mx-auto px-3 sm:px-4 py-2 gap-3.5">
      {/* raise attendance or wage */}
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
        <form onSubmit={handleSubmit} className="w-full space-y-4 mt-4">
          {/* Issue Category */}
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

          {/* Date of Incident */}
          <div className="w-full">
            <label className="mb-2 block text-sm font-semibold text-[#12264b]">
              Date of Incident
              <span className="ml-1 text-slate-500">*</span>
            </label>

            <input
              type="date"
              value={dateIncident}
              onChange={(event) => setDateIncident(event.target.value)}
              className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
            />
          </div>

          {/* Explain Problem */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#12264b]">
              Daily Wage Rate
              <span className="ml-1 text-slate-500">*</span>
            </label>

            <textarea
              placeholder="e.g. On Saturday 5th Sep, I worked 2 hours extra for slab pouring till 8 PM, but it is not shown in my overtime."
              value={explainProblem}
              onChange={(event) => setExplainProbelem(event.target.value)}
              className="w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
              rows={4}
            />
          </div>

          {/* buttons */}
          <div className="w-full flex flex-row items-end justify-end gap-2">
            <button
              type="submit"
              className="w-full px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg transition shadow cursor-pointer"
            >
              📢 Submit Grievance to Labour Officer
            </button>
          </div>
        </form>
      </div>

      {/* BOCW and your active ticket */}
      <div className="w-full lg:w-3/8 flex flex-col items-center justify-start gap-3">
        {/* BOCW Welfare */}
        <div className="w-full flex flex-col items-start justify-center p-4 bg-amber-200/30 border border-amber-400 rounded-lg shadow-lg">
          <span className="font-bold text-amber-900 text-sm flex items-center space-x-1.5">
            <p>🛡️</p>
            <h2>BOCW Welfare Protection</h2>
          </span>

          <p className="text-xs text-amber-800 leading-relaxed font-hindi">
            All registered construction workers are eligible for the
            Government's Minimum Wages Act (1948) and Accident Insurance Scheme
            (₹2,00,000).
          </p>

          <br />

          <span className="w-full flex items-center justify-between mb-3 text-[12px]">
            <p className="text-amber-900 font-medium">Labour Toll-Free:</p>

            <a
              href="tel:14434"
              className="font-mono font-bold text-brand-700 bg-amber-200/70 px-2 py-0.5 rounded"
            >
              14434
            </a>
          </span>

          <span className="w-full flex items-center justify-between text-[12px]">
            <p className="text-amber-900 font-medium">Emergency Ambulance:</p>

            <a
              href="tel:108"
              className="font-mono font-bold text-brand-700 bg-amber-200/70 px-2 py-0.5 rounded"
            >
              108
            </a>
          </span>
        </div>

        {/* Your Active Ticket */}
        <div className="w-full flex flex-col items-start justify-center p-4 space-y-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <h2 className="text-xs font-bold text-slate-700 uppercase">
            Your Active Tickets
          </h2>

          <div className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="w-full flex justify-between items-start">
              <span className="font-bold text-slate-900">
                Overtime Hours Missing
              </span>

              <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">
                Under Review by Labour Inspector
              </span>
            </div>

            <p className="text-[11px] text-slate-600 mt-1">
              Worked 2 hours OT on slab curing till 7 PM.
            </p>

            <p className="text-[11px] text-slate-600 mt-1">
              Ref: DISP-401 • 05 Sep 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIsuue;
