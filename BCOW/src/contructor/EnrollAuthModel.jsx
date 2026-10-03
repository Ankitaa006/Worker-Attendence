import { useState } from "react";
import api from "../utils/api";

const EnrollAuthModel = ({ isOpen, onClose, onRegistered, sites = [] }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [dailyWage, setDailyWage] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [assignedSite, setAssignedSite] = useState("");
  const [credentials, setCredentials] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setName("");
    setRole("");
    setDailyWage("");
    setMobileNumber("");
    setAadharNo("");
    setAssignedSite("");
    setCredentials(null);
    setError("");
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const response = await api.post("/contractor/workers", {
        name: name.trim(),
        role: role.trim(),
        dailyWage: Number(dailyWage),
        mobileNumber: mobileNumber.trim(),
        aadharNo: aadharNo.trim(),
        ...(assignedSite ? { assignedSite } : {}),
      });
      setCredentials(response.data.data.credentials);
      onRegistered?.();
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || "Unable to register worker.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-[#071126]/60 px-4 py-6 backdrop-blur-[4px] sm:px-6" onClick={handleClose}>
      <div className="relative my-auto w-full max-w-[440px] overflow-hidden rounded-[20px] border border-white/80 bg-white px-6 py-4" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={handleClose} aria-label="Close" className="absolute right-5 top-5 z-20">×</button>
        {credentials ? (
          <div className="pt-5">
            <h1 className="text-lg font-bold text-slate-900">Worker registered</h1>
            <p className="mt-2 text-sm text-slate-600">Share these credentials privately; the access PIN is shown only once.</p>
            <div className="mt-4 rounded-lg bg-slate-100 p-4 font-mono text-sm">
              <p>Worker ID: {credentials.workerId}</p>
              <p className="mt-2">Access PIN: {credentials.accessPin}</p>
            </div>
            <button type="button" onClick={async () => navigator.clipboard.writeText(`Worker ID: ${credentials.workerId}\nAccess PIN: ${credentials.accessPin}`)} className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Copy credentials</button>
            <button type="button" onClick={handleClose} className="ml-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white">Done</button>
          </div>
        ) : (
          <>
            <h1 className="text-lg font-bold text-slate-900">Enroll Worker</h1>
            <p className="text-xs text-slate-500">The access PIN is generated from the worker's mobile number.</p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <label className="block text-sm font-semibold text-slate-800">Full Name
                <input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-slate-50 px-3" />
              </label>
              <label className="block text-sm font-semibold text-slate-800">Trade / Role
                <input required value={role} onChange={(event) => setRole(event.target.value)} className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-slate-50 px-3" />
              </label>
              <label className="block text-sm font-semibold text-slate-800">Daily Wage (₹)
                <input required type="number" min="1" step="0.01" value={dailyWage} onChange={(event) => setDailyWage(event.target.value)} className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-slate-50 px-3" />
              </label>
              <label className="block text-sm font-semibold text-slate-800">Mobile Number
                <input required type="tel" pattern="[0-9]{10}" maxLength={10} autoComplete="tel" value={mobileNumber} onChange={(event) => setMobileNumber(event.target.value)} className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-slate-50 px-3" />
              </label>
              <label className="block text-sm font-semibold text-slate-800">Aadhaar Number
                <input required inputMode="numeric" pattern="[0-9]{12}" maxLength={12} value={aadharNo} onChange={(event) => setAadharNo(event.target.value)} className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-slate-50 px-3" />
              </label>
              <label className="block text-sm font-semibold text-slate-800">Assigned Site
                <select required value={assignedSite} onChange={(event) => setAssignedSite(event.target.value)} className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-slate-50 px-3">
                  <option value="" disabled>Select a site</option>
                  {sites.map((site) => <option key={site._id} value={site._id}>{site.project}</option>)}
                </select>
              </label>
              {error && <p role="alert" className="rounded bg-red-50 p-2 text-sm text-red-700">{error}</p>}
              <div className="flex justify-end gap-2">
                <button type="button" onClick={handleClose} className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Cancel</button>
                <button disabled={submitting} type="submit" className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{submitting ? "Saving..." : "Save & Add to Roster"}</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EnrollAuthModel;
