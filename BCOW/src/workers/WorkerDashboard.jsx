import useApiData from "../utils/useApiData";

const WorkerDashboard = () => {
  const { data: profile, loading, error } = useApiData("/worker/profile");
  const initials = profile?.name
    ?.split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2) || "?";

  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-3">
      <div className="my-3.5 flex w-full flex-col items-start justify-between gap-4 rounded-xl bg-slate-900 px-6 pb-6 pt-6 shadow-xl lg:flex-row lg:items-center lg:mx-3">
        <div className="flex flex-row items-center justify-start gap-3 text-white">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-amber-300/60 bg-gradient-to-tr from-amber-400 to-amber-500 text-2xl font-black text-slate-950 shadow-lg">
            {initials}
          </span>
          <div>
            <h1 className="text-xl font-black tracking-tight sm:text-2xl">
              {loading ? "Loading profile..." : profile?.name || "Worker"}
            </h1>
            {error && <p role="alert" className="text-xs text-red-300">{error}</p>}
            <span className="text-xs text-amber-300">{profile?.role || "Worker"}</span>
            <p className="mt-1 text-xs text-slate-300">Worker ID: {profile?.workerId || "—"}</p>
            <p className="mt-1 text-xs text-slate-300">
              Site: {profile?.assignedSite?.project || "Not assigned"}
              {" · "}
              Contractor: {profile?.assignedContractor?.firmName || "Not assigned"}
            </p>
          </div>
        </div>
        <div className="flex flex-col rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-right">
          <span className="text-xs font-semibold text-slate-400">Your Daily Wage Rate</span>
          <span className="text-2xl font-black text-amber-400">
            {profile?.dailyWage == null ? "—" : `₹${profile.dailyWage} / day`}
          </span>
          {profile?.assignedSite?.minWage != null && (
            <span className="text-[10px] text-emerald-400">
              Site minimum: ₹{profile.assignedSite.minWage} / day
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
