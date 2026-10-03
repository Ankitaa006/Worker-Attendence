import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import useContractorRoster from "../utils/useContractorRoster";

const MarkAttendence = () => {
  const { activeSiteId } = useOutletContext();
  const { rows, loading, error, markAttendance } = useContractorRoster(activeSiteId);
  const [query, setQuery] = useState("");
  const [trade, setTrade] = useState("All Trades");
  const [actionError, setActionError] = useState("");
  const [savingWorkerId, setSavingWorkerId] = useState("");
  const trades = [...new Set(rows.map((worker) => worker.category).filter(Boolean))];
  const filteredRows = rows.filter((worker) => (
    `${worker.labourer} ${worker.laburId} ${worker.category}`.toLowerCase().includes(query.toLowerCase().trim()) &&
    (trade === "All Trades" || worker.category === trade)
  ));

  const saveAttendance = async (worker, status, overtime = worker.ot) => {
    setSavingWorkerId(worker.id);
    setActionError("");
    try {
      await markAttendance(worker, status, overtime);
    } catch (requestError) {
      setActionError(requestError.response?.data?.message || requestError.message);
    } finally {
      setSavingWorkerId("");
    }
  };

  const markAll = async (status) => {
    setActionError("");
    try {
      await Promise.all(rows.map((worker) => markAttendance(worker, status)));
    } catch (requestError) {
      setActionError(requestError.response?.data?.message || requestError.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-gray-100 px-4 pt-32 sm:px-6 lg:pt-16">
      <div className="my-8 flex w-full flex-col justify-between gap-3 rounded-md border border-gray-300 bg-white p-4 lg:w-6/7 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-xl font-bold text-black">Daily Attendance Roster</h1>
          <p className="text-sm text-gray-600">Mark full day, half day, absent, and overtime for registered workers.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => markAll("Present (P)")} disabled={loading || rows.length === 0} className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">Mark All Present</button>
          <button onClick={() => markAll("Absent (A)")} disabled={loading || rows.length === 0} className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">Mark All Absent</button>
        </div>
      </div>

      <div className="mb-4 flex w-full flex-col gap-2 rounded-md border border-gray-300 bg-white p-3 sm:flex-row lg:w-6/7">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search worker by name, role, or ID" className="h-9 flex-1 rounded-md border border-gray-300 px-3 text-sm" />
        <select value={trade} onChange={(event) => setTrade(event.target.value)} className="h-9 rounded-md border border-slate-300 bg-slate-50 px-3 text-sm">
          <option>All Trades</option>
          {trades.map((value) => <option key={value}>{value}</option>)}
        </select>
      </div>

      {(error || actionError) && <p role="alert" className="mb-3 w-full text-sm text-red-700">{actionError || error}</p>}
      <div className="mb-10 w-full overflow-x-auto rounded-xl border border-slate-200 bg-white lg:w-6/7">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead><tr className="bg-slate-900 text-xs uppercase text-white">
            <th className="px-4 py-3">Worker</th><th className="px-4 py-3">Trade</th><th className="px-4 py-3">Daily Wage</th><th className="px-4 py-3">Attendance</th><th className="px-4 py-3">OT Hours</th><th className="px-4 py-3">Save</th>
          </tr></thead>
          <tbody>
            {loading ? <tr><td colSpan="6" className="h-40 text-center text-sm text-slate-500">Loading roster...</td></tr>
              : filteredRows.length === 0 ? <tr><td colSpan="6" className="h-40 text-center text-sm text-slate-500">No workers found.</td></tr>
                : filteredRows.map((worker) => (
                  <tr key={worker.id} className="border-b border-slate-100 text-sm">
                    <td className="px-4 py-3 font-semibold">{worker.labourer}<span className="block text-xs text-slate-400">{worker.laburId}</span></td>
                    <td className="px-4 py-3">{worker.category}</td>
                    <td className="px-4 py-3">₹{worker.dailyWage}</td>
                    <td className="px-4 py-3">
                      <select value={worker.status} onChange={(event) => saveAttendance(worker, event.target.value)} disabled={savingWorkerId === worker.id} className="rounded border border-slate-300 px-2 py-1">
                        <option value="Not Marked" disabled>Not Marked</option>
                        <option value="Present (P)">Present</option>
                        <option value="Half Day (H)">Half Day</option>
                        <option value="Absent (A)">Absent</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <input aria-label={`Overtime hours for ${worker.labourer}`} type="number" min="0" step="0.25" defaultValue={worker.ot} onBlur={(event) => saveAttendance(worker, worker.status === "Not Marked" ? "Present (P)" : worker.status, event.target.value)} className="w-20 rounded border border-slate-300 px-2 py-1" />
                    </td>
                    <td className="px-4 py-3">
                      <button type="button" disabled={savingWorkerId === worker.id} onClick={() => saveAttendance(worker, worker.status === "Not Marked" ? "Present (P)" : worker.status)} className="rounded bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50">
                        {savingWorkerId === worker.id ? "Saving..." : "Save"}
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarkAttendence;
