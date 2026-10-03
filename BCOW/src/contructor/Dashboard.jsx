import { useNavigate, useOutletContext } from "react-router-dom";
import useContractorRoster from "../utils/useContractorRoster";

const Dashboard = () => {
  const navigate = useNavigate();
  const { activeSiteId } = useOutletContext();
  const { rows, loading, error, markAttendance } = useContractorRoster(activeSiteId);
  const presentCount = rows.filter((worker) => worker.status === "Present (P)").length;
  const dailyAccrual = rows.reduce((total, worker) => {
    if (worker.status === "Absent (A)" || worker.status === "Not Marked") return total;
    const base = Number(worker.dailyWage) * (worker.status === "Half Day (H)" ? 0.5 : 1);
    return total + base + Number(worker.ot || 0) * Number(worker.dailyWage) * 1.5;
  }, 0);

  const updateAttendance = async (worker, status) => {
    try {
      await markAttendance(worker, status);
    } catch (requestError) {
      window.alert(requestError.response?.data?.message || requestError.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-gray-100 px-4 pt-32 sm:px-6 lg:pt-16">
      <div className="grid w-full gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {[
          ["Workers on roster", rows.length],
          ["Present today", presentCount],
          ["Today's wage accrual", `₹${dailyAccrual.toLocaleString("en-IN")}`],
          ["Unmarked attendance", rows.filter((worker) => worker.status === "Not Marked").length],
        ].map(([title, value]) => (
          <div key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-500">{title}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{loading ? "…" : value}</p>
          </div>
        ))}
      </div>

      <section className="my-8 w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:mx-9 lg:w-[calc(100%-4.5rem)] lg:p-6">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Today's Attendance</h1>
            <p className="text-xs text-slate-500">Attendance records are saved to the server.</p>
          </div>
          <button onClick={() => navigate("/contractor/mark-attendence")} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">
            Detailed Roster →
          </button>
        </div>
        {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
        {loading ? <p className="py-8 text-center text-sm text-slate-500">Loading roster...</p> : rows.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">No workers registered for this site.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[650px] border-collapse">
              <thead><tr className="bg-slate-50 text-left text-xs uppercase text-slate-600">
                <th className="px-4 py-3">Worker</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Daily Wage</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Action</th>
              </tr></thead>
              <tbody>{rows.map((worker) => (
                <tr key={worker.id} className="border-b border-slate-100 text-sm">
                  <td className="px-4 py-3">{worker.labourer}<span className="block text-xs text-slate-400">{worker.laburId}</span></td>
                  <td className="px-4 py-3">{worker.category}</td>
                  <td className="px-4 py-3">₹{worker.dailyWage}</td>
                  <td className="px-4 py-3">{worker.status}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => updateAttendance(worker, worker.status === "Present (P)" ? "Absent (A)" : "Present (P)")} className="rounded bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                      {worker.status === "Present (P)" ? "Mark Absent" : "Mark Present"}
                    </button>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
