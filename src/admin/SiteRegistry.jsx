import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { sites } from "../assets/contractor";
import { assignedLeadContractor, projectCategoryData } from "../assets/admin";

const SiteRegistry = ({ isOpen, onClose }) => {
  const [siteName, setSiteName] = useState("");
  const [city, setCity] = useState("");
  const [projectCategory, setProjectCategory] = useState();
  const [projectFund, setProjectFund] = useState(5000000);
  const [minWage, setMinWage] = useState(550);
  const [workforceCapacity, setWorkforceCapacity] = useState(40);
  const [leadContractor, setLeadContractor] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();

    // Add your save logic here
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-[#071126]/60 px-4 py-6 backdrop-blur-[4px] sm:px-6"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-[535px] max-h-[515px] overflow-hidden rounded-[20px] border border-white/80 bg-white px-6 py-4"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-8 w-8 items-center justify-center font-bold cursor-pointer"
        >
          x
        </button>

        <div className="flex flex-col items-start justify-center">
          <h1 className="text-lg font-bold text-slate-900">
            Register Construction Project Site
          </h1>

          <p className="text-xs text-slate-500 font-hindi">
            New construction site registration and minimum wage determination
          </p>

          <br />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company / Firm Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#12264b]">
              Project / Site Name:
              <span className="ml-1 text-slate-500">*</span>
            </label>

            <input
              type="text"
              value={siteName}
              onChange={(event) => setSiteName(event.target.value)}
              placeholder="e.g. Dwarka Expressway Elevated Sec 84"
              className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
            />
          </div>

          {/* Proprietor / Contact Person and Daily Wage */}
          <div className="flex flex-row items-center justify-between gap-2">
            {/* Proprietor / Contact Person */}
            <div className="w-1/2">
              <label className="mb-2 block text-sm font-semibold text-[#12264b]">
                City / Project Category:
                <span className="ml-1 text-slate-500">*</span>
              </label>

              <input
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="e.g. Gurugram NCR"
                className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
              />
            </div>

            {/* Daily Wage */}
            <div className="w-1/2">
              <label className="mb-2 block text-sm font-semibold text-[#12264b]">
                Project Category
                <span className="ml-1 text-slate-500">*</span>
              </label>

              <select
                value={projectCategory}
                onChange={(event) => setProjectCategory(event.target.value)}
                className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
              >
                {projectCategoryData.map((item) => (
                  <option key={item.id} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Number and Aadhaar */}
          <div className="flex flex-row gap-2">
            {/* Mobile Number */}
            <div className="w-1/2">
              <label className="mb-2 block text-sm font-semibold text-[#12264b]">
                Total Project Fund (₹):
                <span className="ml-1 text-slate-500">*</span>
              </label>

              <input
                type="number"
                value={projectFund}
                onChange={(event) => setProjectFund(event.target.value)}
                placeholder="e.g, 5000000"
                className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
              />
            </div>

            {/* Aadhaar */}
            <div className="w-1/2 ">
              <label className="mb-2 block text-sm font-semibold text-[#12264b]">
                Statutory Min Wage (₹/day):
                <span className="ml-1 text-slate-500">*</span>
              </label>

              <input
                type="number"
                value={minWage}
                onChange={(event) => setMinWage(event.target.value)}
                placeholder="550"
                maxLength={16}
                className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
              />
            </div>
          </div>

          <div className="flex flex-row items-start justify-between gap-2">
            <div className="w-1/2">
              <label className="mb-2 block text-sm font-semibold text-[#12264b]">
                Workforce Capacity:
                <span className="ml-1 text-slate-500">*</span>
              </label>

              <input
                type="number"
                value={workforceCapacity}
                onChange={(event) => setWorkforceCapacity(event.target.value)}
                placeholder="40"
                min={1}
                className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
              />
            </div>
            <div className="w-1/2">
              <label className="mb-2 block text-sm font-semibold text-[#12264b]">
                Assigned Lead Contractor:
                <span className="ml-1 text-slate-500">*</span>
              </label>

              <select
                value={leadContractor}
                onChange={(event) => setLeadContractor(event.target.value)}
                className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
              >
                {assignedLeadContractor.map((item) => (
                  <option key={item.id} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Assign to Site */}

          {/* Buttons */}

          <div className="flex flex-row items-end justify-end gap-2 cursor-pointer">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-slate-100 px-4 py-1 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-orange-600 px-4 py-1 text-sm font-semibold text-white shadow transition hover:bg-orange-700 cursor-pointer"
            >
              Confirm & Register Site
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SiteRegistry;
