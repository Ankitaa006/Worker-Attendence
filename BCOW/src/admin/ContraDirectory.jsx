import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import AdminSitesCard from "../cards/AdminSitesCard";
import api from "../utils/api";
import useApiData from "../utils/useApiData";

const ContraDirectory = () => {
  const { setIsAuthOpen, contractorRefresh } = useOutletContext();
  const { data, loading, error, refresh } = useApiData("/admin/contractors");
  const [actionError, setActionError] = useState("");
  const contractors = Array.isArray(data) ? data : [];

  useEffect(() => {
    if (contractorRefresh) refresh();
  }, [contractorRefresh, refresh]);

  const toggleStatus = async (contractor) => {
    setActionError("");
    try {
      const action = contractor.status === "active" ? "suspend" : "activate";
      await api.put(`/admin/contractors/${contractor._id}/${action}`);
      refresh();
    } catch (requestError) {
      setActionError(requestError.response?.data?.message || requestError.message);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-4 sm:px-4">
      <div className="flex w-full flex-col items-start justify-between gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm lg:flex-row lg:items-center">
        <div>
          <h1 className="text-xl font-bold text-black">Registered Contractors & Agency Registry</h1>
          <p className="mt-1 text-xs text-gray-500">Manage contractor accounts and their current status.</p>
        </div>
        <button
          onClick={() => setIsAuthOpen(true)}
          type="button"
          className="w-full cursor-pointer rounded-md bg-amber-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-amber-700 lg:w-auto"
        >
          + Add New Contractor
        </button>
      </div>

      {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
      {actionError && <p role="alert" className="mt-3 text-sm text-red-700">{actionError}</p>}

      {loading ? (
        <p className="mt-6 text-center text-sm text-slate-500">Loading contractors...</p>
      ) : contractors.length === 0 ? (
        <p className="mt-6 text-center text-sm text-slate-500">No contractors have been registered.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 items-center justify-center gap-2 lg:grid-cols-3">
          {contractors.map((contractor) => (
            <AdminSitesCard
              key={contractor._id}
              status={contractor.status}
              compliance={contractor.compliance ?? 0}
              title={contractor.firmName}
              contact={contractor.contactPerson}
              liscence={contractor.licence}
              phone={contractor.phoneNumber}
              site={contractor.assignedSite?.project || "Not assigned"}
              workforce={contractor.activeWorkers ?? 0}
              loginId={contractor.loginId}
              onSuspend={() => toggleStatus(contractor)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContraDirectory;
