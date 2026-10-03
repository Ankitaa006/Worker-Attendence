import useApiData from "../utils/useApiData";

const ComplianceOverview = () => {
  const { data, loading, error } = useApiData("/admin/compliance-overview");
  const contractors = Array.isArray(data) ? data : [];

  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-4 sm:px-4">
      <div className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-1 p-3 text-xs sm:flex-row">
          <p className="font-bold text-black">Contractor & Site Compliance Scorecard</p>
          <p className="text-gray-500">Live contractor records and compliance status</p>
        </div>
        {error && <p role="alert" className="px-4 pb-3 text-sm text-red-700">{error}</p>}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse">
            <thead>
              <tr className="bg-slate-100 text-xs">
                {["CONTRACTOR", "ACTIVE SITE", "WORKERS", "COMPLIANCE", "CONTACT", "STATUS"].map((heading) => (
                  <th key={heading} className="px-5 py-4 text-left font-semibold text-slate-900">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="p-6 text-center text-sm text-slate-500">Loading contractors...</td></tr>
              ) : contractors.length === 0 ? (
                <tr><td colSpan="6" className="p-6 text-center text-sm text-slate-500">No contractor records found.</td></tr>
              ) : contractors.map((contractor) => (
                <tr key={contractor._id} className="border-b border-slate-200 text-xs last:border-0">
                  <td className="px-5 py-4 font-semibold text-slate-900">{contractor.firmName}</td>
                  <td className="px-5 py-4 text-slate-700">{contractor.assignedSite?.project || "Not assigned"}</td>
                  <td className="px-5 py-4 text-slate-700">{contractor.activeWorkers ?? 0}</td>
                  <td className="px-5 py-4 font-semibold text-slate-700">{contractor.compliance ?? 0}%</td>
                  <td className="px-5 py-4 text-slate-700">{contractor.email || contractor.phoneNumber}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${contractor.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                      {contractor.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComplianceOverview;
