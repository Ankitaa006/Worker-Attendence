import useApiData from "../utils/useApiData";

const FundCase = () => {
  const { data, loading, error } = useApiData("/admin/funds-ledger");
  const payments = Array.isArray(data) ? data : [];

  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-4 sm:px-4">
      <div className="rounded-lg border border-gray-300 bg-white p-4">
        <h3 className="text-sm font-bold text-black lg:text-base">Project Funds, Disbursements & 1% BOCW Cess Ledger</h3>
        <p className="text-xs text-gray-500">Paid wage records and calculated 1% construction welfare cess.</p>
        <div className="w-full overflow-x-auto pt-4">
          {error ? (
            <p role="alert" className="py-6 text-center text-sm text-red-700">{error}</p>
          ) : loading ? (
            <p className="py-6 text-center text-sm text-slate-500">Loading ledger...</p>
          ) : payments.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-500">No wage disbursements have been recorded.</p>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-100 font-bold uppercase text-slate-600">
                <tr>
                  {["Payment Date", "Site", "Contractor", "Worker", "Gross Wage", "1% BOCW Cess", "Status"].map((heading) => (
                    <th key={heading} className="px-3 py-2.5">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {payments.map((payment) => (
                  <tr key={payment._id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-3 py-2.5">{payment.disbursedAt ? new Date(payment.disbursedAt).toLocaleDateString() : "—"}</td>
                    <td className="px-3 py-2.5">{payment.site?.project || "—"}</td>
                    <td className="px-3 py-2.5">{payment.contractor?.firmName || "—"}</td>
                    <td className="px-3 py-2.5">{payment.worker?.name || "—"}</td>
                    <td className="px-3 py-2.5">₹{payment.grossEarnings ?? 0}</td>
                    <td className="px-3 py-2.5">₹{payment.bocwCess ?? 0}</td>
                    <td className="px-3 py-2.5">{payment.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default FundCase;
