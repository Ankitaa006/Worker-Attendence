import { useState } from "react";
import api from "../utils/api";
import useApiData from "../utils/useApiData";

const categories = [
  "Metro Transit Corridor",
  "Highway and Flyover",
  "Residential Highrise",
  "Commercial Infrastructure",
  "Industrial Plant",
];

const SiteRegistry = ({ isOpen, onClose, onRegistered }) => {
  const { data, loading } = useApiData("/admin/contractors");
  const contractors = Array.isArray(data) ? data : [];
  const [project, setProject] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [totalFund, setTotalFund] = useState("");
  const [minWage, setMinWage] = useState("");
  const [workforceCapacity, setWorkforceCapacity] = useState("");
  const [assignedContractor, setAssignedContractor] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const close = () => {
    setProject("");
    setCity("");
    setCategory(categories[0]);
    setTotalFund("");
    setMinWage("");
    setWorkforceCapacity("");
    setAssignedContractor("");
    setError("");
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await api.post("/admin/sites", {
        project: project.trim(),
        city: city.trim(),
        category,
        totalFund: Number(totalFund),
        minWage: Number(minWage),
        workforceCapacity: Number(workforceCapacity),
        ...(assignedContractor ? { assignedContractor } : {}),
      });
      onRegistered?.();
      close();
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-[#071126]/60 px-4 py-6 backdrop-blur-[4px] sm:px-6" onClick={close}>
      <div className="relative my-auto w-full max-w-[455px] rounded-[20px] border border-white/80 bg-white px-6 py-4" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={close} aria-label="Close" className="absolute right-5 top-4 text-xl">×</button>
        <h1 className="pr-8 text-lg font-bold text-slate-900">Register Construction Project Site</h1>
        <p className="mt-1 text-xs text-slate-500">Set the project location, budget, wage floor, and capacity.</p>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <label className="block text-sm font-semibold text-slate-800">Project / Site Name
            <input required value={project} onChange={(event) => setProject(event.target.value)} className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-slate-50 px-3" />
          </label>
          <label className="block text-sm font-semibold text-slate-800">City
            <input required value={city} onChange={(event) => setCity(event.target.value)} className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-slate-50 px-3" />
          </label>
          <label className="block text-sm font-semibold text-slate-800">Project Category
            <select required value={category} onChange={(event) => setCategory(event.target.value)} className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-slate-50 px-3">
              {categories.map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <label className="block text-sm font-semibold text-slate-800">Project Fund (₹)
              <input required type="number" min="0" step="0.01" value={totalFund} onChange={(event) => setTotalFund(event.target.value)} className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-slate-50 px-3" />
            </label>
            <label className="block text-sm font-semibold text-slate-800">Minimum Wage / Day
              <input required type="number" min="1" step="0.01" value={minWage} onChange={(event) => setMinWage(event.target.value)} className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-slate-50 px-3" />
            </label>
          </div>
          <label className="block text-sm font-semibold text-slate-800">Workforce Capacity
            <input required type="number" min="1" step="1" value={workforceCapacity} onChange={(event) => setWorkforceCapacity(event.target.value)} className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-slate-50 px-3" />
          </label>
          <label className="block text-sm font-semibold text-slate-800">Assigned Lead Contractor (optional)
            <select disabled={loading} value={assignedContractor} onChange={(event) => setAssignedContractor(event.target.value)} className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-slate-50 px-3">
              <option value="">Not assigned</option>
              {contractors.map((contractor) => <option key={contractor._id} value={contractor._id}>{contractor.firmName}</option>)}
            </select>
          </label>
          {error && <p role="alert" className="rounded bg-red-50 p-2 text-sm text-red-700">{error}</p>}
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={close} className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Cancel</button>
            <button disabled={submitting} type="submit" className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{submitting ? "Saving..." : "Register Site"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SiteRegistry;
