import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import WorkerViewCard from "../cards/WorkerViewCard";
import useApiData from "../utils/useApiData";

const LabourDirectory = () => {
  const navigate = useNavigate();
  const { activeSiteId, setIsAuthOpen, workersRefresh } = useOutletContext();
  const [isPaySlipOpen, setIsPaySlipOpen] = useState(false);
  const [selectedWorkerId, setSelectedWorkerId] = useState("");
  const { data, loading, error, refresh } = useApiData("/contractor/workers");
  const workers = Array.isArray(data) ? data : [];
  const siteWorkers = workers.filter((worker) => !activeSiteId || worker.assignedSite?._id === activeSiteId);
  const selectedWorker = siteWorkers.find((worker) => worker._id === selectedWorkerId);

  useEffect(() => {
    if (workersRefresh) refresh();
  }, [workersRefresh, refresh]);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 pt-32 sm:px-6 lg:px-8 lg:pt-16">
        <div className="my-6 flex w-full max-w-7xl flex-col items-start justify-between gap-5 rounded-lg border border-gray-300 bg-white p-5 sm:p-6 lg:flex-row lg:items-center lg:gap-8">
          <div className="w-full px-1 sm:px-2">
            <h1 className="text-xl font-bold text-black sm:text-2xl">Labour Directory & Skill Registry</h1>
            <p className="mt-1 max-w-3xl text-sm leading-5 text-gray-600">Manage workforce profiles, trade roles, and daily wage records.</p>
          </div>
          <button onClick={() => setIsAuthOpen(true)} className="w-full whitespace-nowrap rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 lg:w-auto">
            + Register New Labour
          </button>
        </div>
        {error && <p role="alert" className="w-full max-w-7xl text-sm text-red-700">{error}</p>}
        {loading ? (
          <p className="mt-6 text-sm text-slate-500">Loading workers...</p>
        ) : siteWorkers.length === 0 ? (
          <p className="mt-6 text-sm text-slate-500">No workers are registered for this site.</p>
        ) : (
          <div className="grid w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {siteWorkers.map((worker) => (
              <WorkerViewCard
                key={worker._id}
                workerName={worker.name}
                workerId={worker.workerId}
                trade={worker.role}
                mobile={worker.mobileNumber}
                aadhar={worker.aadharNo?.slice(-4) || "—"}
                wage={worker.dailyWage}
                onPayWage={() => navigate("/contractor/payment-leadger")}
                onViewPaySlip={() => {
                  setSelectedWorkerId(worker._id);
                  setIsPaySlipOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>
      {isPaySlipOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" onClick={() => setIsPaySlipOpen(false)}>
          <div className="w-full max-w-md rounded-xl bg-white p-5" onClick={(event) => event.stopPropagation()}>
            <h2 className="font-bold text-slate-900">{selectedWorker?.name || "Worker"}</h2>
            <p className="mt-2 text-sm text-slate-600">Daily wage: ₹{selectedWorker?.dailyWage ?? 0}</p>
            <p className="mt-2 text-sm text-slate-600">Attendance and payroll records are available from the attendance and wage tools.</p>
            <button type="button" onClick={() => setIsPaySlipOpen(false)} className="mt-4 rounded bg-slate-900 px-4 py-2 text-sm text-white">Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default LabourDirectory;
