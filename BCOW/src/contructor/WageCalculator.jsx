import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../utils/api";
import useApiData from "../utils/useApiData";

const WageCalculator = () => {
  const { activeSiteId } = useOutletContext();
  const now = new Date();
  const [month, setMonth] = useState(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`);
  const [actionError, setActionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [savingWorker, setSavingWorker] = useState("");
  const { data: workersData } = useApiData("/contractor/workers");
  const { data: wagesData, loading, error, refresh } = useApiData("/contractor/wage-slips");
  const workers = (Array.isArray(workersData) ? workersData : []).filter((worker) => !activeSiteId || worker.assignedSite?._id === activeSiteId);
  const wages = (Array.isArray(wagesData) ? wagesData : []).filter((wage) => !activeSiteId || wage.site?._id === activeSiteId);

  const generate = async (worker) => {
    setSavingWorker(worker._id);
    setActionError("");
    setSuccessMessage("");
    try {
      await api.post("/contractor/wages", { workerId: worker._id, month });
      setSuccessMessage(`Wage slip generated for ${worker.name}.`);
      refresh();
    } catch (requestError) {
      setActionError(requestError.response?.data?.message || requestError.message);
    } finally {
      setSavingWorker("");
    }
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl bg-gray-100 px-4 py-8 pt-32 lg:pt-20">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div><h1 className="text-xl font-bold text-slate-900">Wage Calculator & Wage Slips</h1><p className="text-sm text-slate-500">Calculate from recorded attendance for a selected month.</p></div>
          <input type="month" value={month} onChange={(event) => setMonth(event.target.value)} className="rounded border border-slate-300 px-3 py-2 text-sm" />
        </div>
        {(error || actionError) && <p role="alert" className="mt-3 text-sm text-red-700">{actionError || error}</p>}
        {successMessage && <p role="status" className="mt-3 text-sm text-emerald-700">{successMessage}</p>}
        <h2 className="mt-6 font-semibold text-slate-900">Registered Workers</h2>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-slate-100 text-xs uppercase text-slate-600"><tr><th className="px-3 py-3">Worker</th><th className="px-3 py-3">Role</th><th className="px-3 py-3">Daily Wage</th><th className="px-3 py-3">Action</th></tr></thead>
            <tbody>{workers.map((worker) => {
              const alreadyGenerated = wages.some((wage) => wage.worker?._id === worker._id && new Date(wage.month).toISOString().slice(0, 7) === month);
              return <tr key={worker._id} className="border-b border-slate-100">
                <td className="px-3 py-3">{worker.name}<span className="block text-xs text-slate-400">{worker.workerId}</span></td>
                <td className="px-3 py-3">{worker.role}</td><td className="px-3 py-3">₹{worker.dailyWage}</td>
                <td className="px-3 py-3"><button disabled={alreadyGenerated || savingWorker === worker._id} onClick={() => generate(worker)} className="rounded bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50">{alreadyGenerated ? "Already generated" : savingWorker === worker._id ? "Generating..." : "Generate wage slip"}</button></td>
              </tr>;
            })}</tbody>
          </table>
          {!workers.length && <p className="py-6 text-center text-sm text-slate-500">No workers are registered for this site.</p>}
        </div>
        <h2 className="mt-8 font-semibold text-slate-900">Generated Wage Slips</h2>
        {loading ? <p className="py-4 text-sm text-slate-500">Loading wage slips...</p> : wages.length === 0 ? <p className="py-4 text-sm text-slate-500">No slips have been generated.</p> : (
          <div className="mt-2 overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-slate-100 text-xs uppercase text-slate-600"><tr><th className="px-3 py-3">Worker</th><th className="px-3 py-3">Month</th><th className="px-3 py-3">Days</th><th className="px-3 py-3">Gross</th><th className="px-3 py-3">Net Payable</th><th className="px-3 py-3">Status</th></tr></thead>
            <tbody>{wages.map((wage) => <tr key={wage._id} className="border-b border-slate-100"><td className="px-3 py-3">{wage.worker?.name || "—"}</td><td className="px-3 py-3">{new Date(wage.month).toLocaleDateString(undefined, { month: "long", year: "numeric" })}</td><td className="px-3 py-3">{wage.daysWorked}</td><td className="px-3 py-3">₹{wage.grossEarnings}</td><td className="px-3 py-3">₹{wage.netPayable}</td><td className="px-3 py-3">{wage.status}</td></tr>)}</tbody>
          </table></div>
        )}
      </div>
    </div>
  );
};

export default WageCalculator;
