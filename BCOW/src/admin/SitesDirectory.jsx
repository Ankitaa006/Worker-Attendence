import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ManageSitesCard from "../cards/ManageSitesCard";
import useApiData from "../utils/useApiData";

const SitesDirectory = () => {
  const { setIsSiteOpen, siteRefresh } = useOutletContext();
  const { data, loading, error, refresh } = useApiData("/admin/sites");
  const sites = Array.isArray(data) ? data : [];

  useEffect(() => {
    if (siteRefresh) refresh();
  }, [siteRefresh, refresh]);

  return (
    <div className="mx-auto w-full max-w-6xl bg-gray-50 px-3 py-4 sm:px-4">
      <div className="flex w-full flex-col items-start justify-between gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm lg:flex-row lg:items-center">
        <div>
          <h1 className="text-xl font-bold text-black">Registered Construction Infrastructure Projects</h1>
          <p className="mt-1 text-xs text-gray-500">Live registered sites, project budgets, and statutory wage floors.</p>
        </div>
        <button
          onClick={() => setIsSiteOpen(true)}
          type="button"
          className="w-full cursor-pointer rounded-md bg-amber-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-amber-700 lg:w-auto"
        >
          + Register New Site
        </button>
      </div>
      {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
      {loading ? (
        <p className="mt-6 text-center text-sm text-slate-500">Loading sites...</p>
      ) : sites.length === 0 ? (
        <p className="mt-6 text-center text-sm text-slate-500">No sites have been registered.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 items-center justify-center gap-2 lg:grid-cols-3">
          {sites.map((site) => (
            <div key={site._id}>
              <ManageSitesCard
                siteId={site._id}
                location={site.city}
                status={site.status}
                title={site.project}
                agency={site.assignedContractor?.firmName || "Not assigned"}
                fund={site.totalFund}
                minWage={site.minWage}
                labourWorkforce={site.currentWorkers ?? 0}
                totalWorker={site.workforceCapacity}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SitesDirectory;
