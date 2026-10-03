import { useMemo } from "react";
import api from "./api";
import useApiData from "./useApiData";

const localDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const useContractorRoster = (siteId) => {
  const date = localDateKey(new Date());
  const workersRequest = useApiData("/contractor/workers");
  const attendanceRequest = useApiData(`/contractor/attendance?date=${date}`);

  const rows = useMemo(() => {
    const workers = Array.isArray(workersRequest.data) ? workersRequest.data : [];
    const records = Array.isArray(attendanceRequest.data) ? attendanceRequest.data : [];
    const byWorker = new Map(records.map((record) => [record.worker?._id || record.worker, record]));
    return workers
      .filter((worker) => !siteId || worker.assignedSite?._id === siteId)
      .map((worker) => {
        const attendance = byWorker.get(worker._id);
        const status = attendance?.status === "present"
          ? "Present (P)"
          : attendance?.status === "half-day"
            ? "Half Day (H)"
            : attendance?.status === "absent"
              ? "Absent (A)"
              : "Not Marked";
        return {
          id: worker._id,
          labourer: worker.name,
          laburId: worker.workerId,
          category: worker.role,
          dailyWage: String(worker.dailyWage ?? 0),
          status,
          ot: Number(attendance?.overtimeHours || 0),
          attendanceId: attendance?._id,
        };
      });
  }, [workersRequest.data, attendanceRequest.data, siteId]);

  const markAttendance = async (worker, status, overtimeHours = worker.ot) => {
    const backendStatus = status === "Present (P)"
      ? "present"
      : status === "Half Day (H)"
        ? "half-day"
        : "absent";

    await api.post("/contractor/attendance", {
      workerId: worker.id,
      date,
      status: backendStatus,
      overtimeHours: backendStatus === "absent" ? 0 : Number(overtimeHours || 0),
    });
    workersRequest.refresh();
    attendanceRequest.refresh();
  };

  return {
    rows,
    loading: workersRequest.loading || attendanceRequest.loading,
    error: workersRequest.error || attendanceRequest.error,
    markAttendance,
  };
};

export default useContractorRoster;
