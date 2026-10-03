import { useState } from "react";
import api from "../utils/api";
import useApiData from "../utils/useApiData";

const ContructorRegistry = ({ isOpen, onClose, onRegistered }) => {
  const { data, loading: sitesLoading, error: sitesError } = useApiData("/admin/sites");
  const sites = Array.isArray(data) ? data : [];
  const [firmName, setFirmName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [licence, setLicence] = useState("");
  const [assignedSite, setAssignedSite] = useState("");
  const [credentials, setCredentials] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setFirmName("");
    setContactPerson("");
    setPhoneNumber("");
    setEmail("");
    setLicence("");
    setAssignedSite("");
    setCredentials(null);
    setError("");
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await api.post("/admin/contractors", {
        firmName: firmName.trim(),
        contactPerson: contactPerson.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim().toLowerCase(),
        licence: licence.trim(),
        ...(assignedSite ? { assignedSite } : {}),
      });
      setCredentials(response.data.data.credentials);
      onRegistered?.();
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || "Unable to register contractor.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-[#071126]/60 px-4 py-6 backdrop-blur-[4px] sm:px-6" onClick={handleClose}>
      <div className="relative my-auto w-full max-w-[440px] rounded-[20px] border border-white/80 bg-white px-6 py-5" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={handleClose} aria-label="Close" className="absolute right-5 top-4 text-xl">×</button>
        {credentials ? (
          <div className="pt-4">
            <h1 className="text-lg font-bold text-slate-900">Contractor registered</h1>
            <p className="mt-2 text-sm text-slate-600">Copy and securely share these one-time credentials. The password cannot be viewed again.</p>
            <div className="mt-4 rounded-lg bg-slate-100 p-4 font-mono text-sm">
              <p>Login ID: {credentials.loginId}</p>
              <p className="mt-2 break-all">Temporary password: {credentials.password}</p>
            </div>
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(`Login ID: ${credentials.loginId}\nTemporary password: ${credentials.password}`);
              }}
              className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Copy credentials
            </button>
            <button type="button" onClick={handleClose} className="ml-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white">Done</button>
          </div>
        ) : (
          <>
            <h1 className="pr-8 text-lg font-bold text-slate-900">Register New Contractor Agency</h1>
            <p className="mt-1 text-xs text-slate-500">The initial password is generated securely and shown once.</p>
            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <label className="block text-sm font-semibold text-slate-800">
                Company / Firm Name
                <input required value={firmName} onChange={(event) => setFirmName(event.target.value)} className="mt-1 h-10 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm" />
              </label>
              <label className="block text-sm font-semibold text-slate-800">
                Contact Person
                <input required value={contactPerson} onChange={(event) => setContactPerson(event.target.value)} className="mt-1 h-10 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm" />
              </label>
              <label className="block text-sm font-semibold text-slate-800">
                Phone Number
                <input required type="tel" autoComplete="tel" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} className="mt-1 h-10 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm" />
              </label>
              <label className="block text-sm font-semibold text-slate-800">
                Official Email
                <input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 h-10 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm" />
              </label>
              <label className="block text-sm font-semibold text-slate-800">
                Labour Licence / Registration
                <input required value={licence} onChange={(event) => setLicence(event.target.value)} className="mt-1 h-10 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm" />
              </label>
              <label className="block text-sm font-semibold text-slate-800">
                Assigned Site (optional)
                <select value={assignedSite} disabled={sitesLoading} onChange={(event) => setAssignedSite(event.target.value)} className="mt-1 h-10 w-full rounded-md border border-slate-300 bg-slate-50 px-3 text-sm">
                  <option value="">Not assigned</option>
                  {sites.map((site) => <option key={site._id} value={site._id}>{site.project}</option>)}
                </select>
              </label>
              {sitesError && <p className="text-xs text-amber-700">Sites are unavailable; you can register without assigning one.</p>}
              {error && <p role="alert" className="rounded bg-red-50 p-2 text-sm text-red-700">{error}</p>}
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={handleClose} className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Cancel</button>
                <button disabled={submitting} type="submit" className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{submitting ? "Registering..." : "Register Contractor"}</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContructorRegistry;
