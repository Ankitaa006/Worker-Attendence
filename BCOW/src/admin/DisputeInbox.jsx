import { useState } from "react";
import api from "../utils/api";
import useApiData from "../utils/useApiData";

const DisputeInbox = () => {
  const { data, loading, error, refresh } = useApiData("/admin/disputes");
  const [actionError, setActionError] = useState("");
  const disputes = Array.isArray(data) ? data : [];
  const unresolved = disputes.filter((dispute) => dispute.status !== "resolved" && dispute.status !== "closed");

  const handleResolve = async (dispute) => {
    const resolution = window.prompt("Enter the resolution for this dispute:");
    if (!resolution?.trim()) return;

    setActionError("");
    try {
      await api.put(`/admin/disputes/${dispute._id}/resolve`, { resolution: resolution.trim() });
      refresh();
    } catch (requestError) {
      setActionError(requestError.response?.data?.message || requestError.message);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-4 sm:px-4">
      {error && <p role="alert" className="mb-3 text-sm text-red-700">{error}</p>}
      {actionError && <p role="alert" className="mb-3 text-sm text-red-700">{actionError}</p>}
      {loading ? (
        <p className="mt-8 text-center text-sm text-slate-500">Loading disputes...</p>
      ) : unresolved.length === 0 ? (
        <div className="mt-10 flex w-full items-center justify-center text-sm text-gray-500">
          No open dispute tickets.
        </div>
      ) : unresolved.map((dispute) => (
        <article key={dispute._id} className="m-3 flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex w-full flex-col justify-between gap-2 border-b border-amber-50 p-1 sm:flex-row">
            <div>
              <h2 className="text-[15px] font-bold text-black">{dispute.title}</h2>
              <p className="text-xs text-gray-500">
                {dispute.worker?.name || "Worker"} · {dispute.site?.project || "Site not assigned"} · {dispute.raisedAt ? new Date(dispute.raisedAt).toLocaleString() : ""}
              </p>
            </div>
            <span className="h-fit rounded-lg border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-950">
              {dispute.status} · {dispute.category}
            </span>
          </div>
          <div className="flex w-full flex-col justify-between gap-3 p-1 sm:flex-row sm:items-start">
            <div className="mt-2">
              <p className="text-xs text-gray-700">{dispute.description}</p>
              <p className="mt-2 font-mono text-[10px] text-gray-500">Case ID: {dispute.caseId}</p>
            </div>
            <button
              onClick={() => handleResolve(dispute)}
              type="button"
              className="rounded-lg bg-green-700 p-2 text-xs font-bold text-white hover:bg-green-800"
            >
              Mark Resolved
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default DisputeInbox;
