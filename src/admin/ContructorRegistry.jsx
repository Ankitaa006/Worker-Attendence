import React, { useEffect, useState } from "react";
import { sites } from "../assets/contractor";
import { useNavigate } from "react-router-dom";

const ContructorRegistry = ({ isOpen, onClose }) => {
  const [companyName, setCompanyName] = useState("");
  const [property, setProperty] = useState("");
  const [dailyWage, setDailyWage] = useState();
  const [email, setEmail] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [license, setLicense] = useState("");
  const [assigneSite, setAssigneSet] = useState(sites[0]?.title || "");

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

    alert(
      "The Contarctor Agency is Registerd succesfully, You can copy the login details from the contarctor site. Thankyou!",
    );
    // Add your save logic here
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
            Register New Contractor Agency
          </h1>

          <p className="text-xs text-slate-500 font-hindi">
            New Contractor Registration and License Approval
          </p>

          <br />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company / Firm Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#12264b]">
              Company / Firm Name:
              <span className="ml-1 text-slate-500">*</span>
            </label>

            <input
              type="text"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              placeholder="e.g. Lakhpat Singh"
              className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
            />
          </div>

          {/* Proprietor / Contact Person and Daily Wage */}
          <div className="flex flex-row items-center justify-between gap-2">
            {/* Proprietor / Contact Person */}
            <div className="w-1/2">
              <label className="mb-2 block text-sm font-semibold text-[#12264b]">
                Proprietor / Contact Person:
                <span className="ml-1 text-slate-500">*</span>
              </label>

              <input
                type="text"
                value={property}
                onChange={(event) => setProperty(event.target.value)}
                placeholder="e.g. Lakhpat Singh"
                className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
              />
            </div>

            {/* Daily Wage */}
            <div className="w-1/2">
              <label className="mb-2 block text-sm font-semibold text-[#12264b]">
                Phone Number
                <span className="ml-1 text-slate-500">*</span>
              </label>

              <input
                type="tel"
                value={dailyWage}
                maxLength={10}
                onChange={(e) => setMobileNum(e.target.value)}
                placeholder="9876543210"
                className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
              />
            </div>
          </div>

          {/* Mobile Number and Aadhaar */}
          <div className="flex flex-row gap-2">
            {/* Mobile Number */}
            <div className="w-1/2">
              <label className="mb-2 block text-sm font-semibold text-[#12264b]">
                Official Email:
                <span className="ml-1 text-slate-500">*</span>
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="e.g, random@frustrator.com"
                className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
              />
            </div>

            {/* Aadhaar */}
            <div className="w-1/2">
              <label className="mb-2 block text-sm font-semibold text-[#12264b]">
                Labour License / GSTIN:
                <span className="ml-1 text-slate-500">*</span>
              </label>

              <input
                type="text"
                value={license}
                onChange={(event) => setLicense(event.target.value)}
                placeholder="LIC-DL-2026-44401"
                maxLength={16}
                className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
              />
            </div>
          </div>

          {/* Assign to Site */}
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

          <div className="w-full bg-amber-100 border border-orange-300 rounded-lg p-2">
            <p className="text-xs text-orange-400">
              <strong>Note: </strong>Onboarding this contractor generates
              initial contractor portal credentials and binds their agency to
              statutory BOCW monthly inspections.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-row items-end justify-end gap-2 cursor-pointer">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-slate-100 px-4 py-1 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-orange-600 px-4 py-1 text-sm font-semibold text-white shadow transition hover:bg-orange-700"
            >
              Register & Onboard Contractor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContructorRegistry;
