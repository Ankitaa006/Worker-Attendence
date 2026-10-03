import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../utils/api";
import useApiData from "../utils/useApiData";

const PaymentAndLeadger = () => {
  const { activeSiteId } = useOutletContext();
  const { data, loading, error, refresh } = useApiData("/contractor/payment-ledger");
  const [actionError, setActionError] = useState("");
  const [payingId, setPayingId] = useState("");
  const wages = (Array.isArray(data) ? data : []).filter((wage) => !activeSiteId || wage.site?._id === activeSiteId);

  const disburse = async (wage) => {
    setActionError("");
    setPayingId(wage._id);
    try {
      await api.put(`/contractor/wages/${wage._id}/disburse`, {});
      refresh();
    } catch (requestError) {
      setActionError(requestError.response?.data?.message || requestError.message);
    } finally {
      setPayingId("");
    }
  };

  const totalPaid = wages.filter((wage) => wage.status === "paid").reduce((total, wage) => total + Number(wage.netPayable || 0), 0);
  const totalPending = wages.filter((wage) => wage.status !== "paid").reduce((total, wage) => total + Number(wage.netPayable || 0), 0);

  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl bg-gray-100 px-4 py-8 pt-32 lg:pt-20">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Payments & Wage Ledger</h1>
        <p className="text-sm text-slate-500">Track actual wage slips and record their disbursement.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-emerald-50 p-4"><p className="text-xs text-emerald-700">Total Disbursed</p><p className="mt-1 text-xl font-bold text-emerald-800">₹{totalPaid.toLocaleString("en-IN")}</p></div>
          <div className="rounded-lg bg-amber-50 p-4"><p className="text-xs text-amber-700">Pending Payments</p><p className="mt-1 text-xl font-bold text-amber-800">₹{totalPending.toLocaleString("en-IN")}</p></div>
        </div>
        {(error || actionError) && <p role="alert" className="mt-3 text-sm text-red-700">{actionError || error}</p>}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-slate-100 text-xs uppercase text-slate-600"><tr><th className="px-3 py-3">Worker</th><th className="px-3 py-3">Month</th><th className="px-3 py-3">Gross</th><th className="px-3 py-3">Net Payable</th><th className="px-3 py-3">Payment Date</th><th className="px-3 py-3">Status / Action</th></tr></thead>
            <tbody>{loading ? <tr><td colSpan="6" className="py-8 text-center text-slate-500">Loading ledger...</td></tr> : wages.length === 0 ? <tr><td colSpan="6" className="py-8 text-center text-slate-500">No wage records available.</td></tr> : wages.map((wage) => (
              <tr key={wage._id} className="border-b border-slate-100">
                <td className="px-3 py-3">{wage.worker?.name || "—"}<span className="block text-xs text-slate-400">{wage.worker?.workerId}</span></td>
                <td className="px-3 py-3">{new Date(wage.month).toLocaleDateString(undefined, { month: "short", year: "numeric" })}</td>
                <td className="px-3 py-3">₹{wage.grossEarnings}</td><td className="px-3 py-3">₹{wage.netPayable}</td>
                <td className="px-3 py-3">{wage.disbursedAt ? new Date(wage.disbursedAt).toLocaleDateString() : "—"}</td>
                <td className="px-3 py-3">{wage.status === "paid" ? <span className="font-semibold text-emerald-700">Paid</span> : <button disabled={payingId === wage._id} onClick={() => disburse(wage)} className="rounded bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50">{payingId === wage._id ? "Saving..." : "Mark paid"}</button>}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentAndLeadger;
