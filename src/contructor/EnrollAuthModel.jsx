import React, { useEffect, useState } from "react";
import { sites, tradeRoleData } from "../assets/contractor";
import { useNavigate } from "react-router-dom";

const EnrollAuthModel = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [tradeRole, setTradeRole] = useState("Skilled Mason");

  const navigate = useNavigate();
  const [dailyWage, setDailyWage] = useState("850");

  const [mobileNum, setMobileName] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [assigneSite, setAssigneSet] = useState(sites[0]?.title || "");

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    const selected = tradeRoleData.find(
      (item) => item.tradeRole === selectedRole,
    );

    setTradeRole(selectedRole);
    setDailyWage(selected ? selected.wage : "");
  };

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
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-[#071126]/60 px-4 py-6 backdrop-blur-[4px] sm:px-6"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-[440px] overflow-hidden rounded-[20px] border border-white/80 bg-white px-6 py-4"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-8 w-8 items-center justify-center"
        >
          x
        </button>

        <div className="flex flex-col items-start justify-center">
          <h1 className="text-lg font-bold text-slate-900">
            Enrol New Daily Wage Worker
          </h1>
          <p className="text-xs text-slate-500 font-hindi">
            New Labour Registration Form
          </p>
          <br />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#12264b]">
              Full Name
              <span className="ml-1 text-slate-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Lakhpat Singh"
              className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
            />
          </div>

          {/* tade role and daily wage */}
          <div className="flex flex-row items-center justify-between gap-2">
            {/* Trade Role */}

            <div className="w-1/2">
              <label className="mb-2 block text-sm font-semibold text-[#12264b]">
                Trade Role
                <span className="ml-1 text-slate-500">*</span>
              </label>
              <div>
                <select
                  value={tradeRole}
                  onChange={handleRoleChange}
                  className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
                >
                  {tradeRoleData.map((item) => (
                    <option key={item.id} value={item.tradeRole}>
                      {item.tradeRole}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dily wage */}
            <div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#12264b]">
                  Daily Wage Rate
                  <span className="ml-1 text-slate-500">*</span>
                </label>
                <input
                  type="number"
                  value={dailyWage}
                  readOnly
                  className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
                />
              </div>
            </div>
          </div>
          {/* mobile number and Aadhar */}
          <div className="flex flex-row gap-2">
            {/* Trade Role */}
            <div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#12264b]">
                  Mobile Number:
                  <span className="ml-1 text-slate-500">*</span>
                </label>
                <input
                  type="number"
                  value={mobileNum}
                  onChange={(event) => setMobileName(event.target.value)}
                  placeholder="9876543210"
                  className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
                />
              </div>
            </div>
            {/* Dily wage */}
            <div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#12264b]">
                  Aadhaar No:
                  <span className="ml-1 text-slate-500">*</span>
                </label>
                <input
                  type="number"
                  value={aadharNo}
                  onChange={(event) => setAadharNo(event.target.value)}
                  placeholder="7845 7456 1287 6945"
                  className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
                />
              </div>
            </div>
          </div>
          {/* Assigne to Site */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#12264b]">
              Assign to Site:
              <span className="ml-1 text-slate-500">*</span>
            </label>
            <select
              value={assigneSite}
              onChange={(event) => setAssigneSet(event.target.value)}
              className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
            >
              {sites.map((item) => (
                <option key={item.id} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          {/* buttons */}
          <div className="flex flex-row items-end justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition"
            >
              Cancel
            </button>
            <button className="px-4 py-1 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg transition shadow">
              Save & Add to Roster
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollAuthModel;
