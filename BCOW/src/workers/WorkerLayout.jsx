import { Outlet } from "react-router-dom";
import WorkerHeader from "../components/WorkerHeader";

import WorkerDashboard from "./WorkerDashboard";
import PageHeader from "./PageHeader";
import { useNavigate } from "react-router-dom";

const WorkerLayout = () => {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 p-6 text-center">
        <p className="text-sm text-slate-700">Please sign in to access the worker portal.</p>
        <button type="button" onClick={() => navigate("/")} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
          Go to sign in
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <WorkerHeader />
        <WorkerDashboard />
        <PageHeader />
        <Outlet />
      </div>
    </>
  );
};

export default WorkerLayout;
