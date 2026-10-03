import useApiData from "../utils/useApiData";

const PaymentReceipts = () => {
  const { data, loading, error } = useApiData("/worker/payment-receipts");
  const receipts = Array.isArray(data) ? data : [];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-3.5 px-3 py-2 sm:px-4 lg:flex-row lg:items-start">
      <div className="my-2 w-full rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
        <h2 className="text-base font-bold text-slate-900 sm:text-lg">Payment Settlements & Handover Receipts</h2>
        <p className="text-xs text-slate-500">Complete record of your recorded payments</p>
        {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
        <div className="w-full overflow-x-auto py-3">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 font-bold uppercase text-slate-700">
              <tr>
                <th className="px-3 py-3">Payment ID</th>
                <th className="px-3 py-3">Date & Time</th>
                <th className="px-3 py-3 text-right">Amount Received</th>
                <th className="px-3 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {loading ? (
                <tr><td colSpan="4" className="p-6 text-center text-slate-500">Loading receipts...</td></tr>
              ) : receipts.length === 0 ? (
                <tr><td colSpan="4" className="p-6 text-center text-slate-500">No payments have been recorded.</td></tr>
              ) : receipts.map((receipt) => (
                <tr key={receipt._id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-3 py-3 font-mono font-bold text-slate-800">{receipt._id}</td>
                  <td className="px-3 py-3 text-slate-500">{receipt.disbursedAt ? new Date(receipt.disbursedAt).toLocaleString() : "—"}</td>
                  <td className="px-3 py-3 text-right font-black text-emerald-600">₹{receipt.netPayable ?? 0}</td>
                  <td className="px-3 py-3 text-center"><span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">{receipt.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipts;
