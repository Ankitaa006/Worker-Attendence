import React, { useState } from "react";
import { grievance } from "../assets/admin";

const DisputeInbox = () => {
  const [grievances, setGrievances] = useState(grievance);

  const handleResolve = (id) => {
    setGrievances((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Resolved" } : item,
      ),
    );
  };

  const unresolvedGrievances = grievances.filter(
    (item) => item.status !== "Resolved",
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-4">
      {unresolvedGrievances.length === 0 ? (
        <div className="w-full flex items-center justify-center mt-10">
          <span className="text-gray-500 text-sm font-normal">
            All grievance tickets resolved. 100% compliance.
          </span>
        </div>
      ) : (
        <>
          {unresolvedGrievances.map((dispute) => {
            return (
              <div
                key={dispute.id}
                className="bg-white border border-gray-200 rounded-lg flex flex-col items-center justify-center p-4 m-3"
              >
                <div className="w-full flex flex-row items-start justify-between overflow-x-auto p-1 border-b border-b-amber-50">
                  <span>
                    <h2 className="text-[15px] text-black font-bold">
                      Labour Board Grievance & Attendance Dispute Tickets
                    </h2>

                    <p className="text-xs text-gray-500 font-medium">
                      Labour Grievance Redressal Portal – Mandatory resolution
                      within 48 hours
                    </p>
                  </span>

                  <span className="bg-amber-50 border border-amber-200 text-amber-950 rounded-lg font-semibold text-xs px-4 py-1.5">
                    Citizen Charter: 48h Turnaround
                  </span>
                </div>

                <div className="w-full flex flex-row items-start justify-between gap-2.5 p-1">
                  {/* details */}
                  <div className="w-3/5 flex flex-col items-start gap-2 mt-2">
                    <div className="flex flex-col lg:flex-row items-start">
                      <span className="flex flex-row items-start justify-start gap-2">
                        <p className="text-sm font-bold">{dispute.name}</p>

                        <span className="bg-pink-50 border border-pink-300 rounded-lg text-pink-400 font-bold text-[9px] p-1.5">
                          {dispute.disputeTitle}
                        </span>

                        <p className="text-[13px] text-gray-400">
                          {dispute.date}
                        </p>
                      </span>

                      <p className="text-amber-700 text-xs font-semibold lg:mt-0.5 lg:ml-1">
                        {dispute.status} by Inspector
                      </p>
                    </div>

                    <p className="text-xs font-normal text-gray-700">
                      {dispute.disputeDesc}
                    </p>

                    <p className="text-[10px] font-mono text-gray-500">
                      Case ID: {dispute.caseId} • Workperson ID:{" "}
                      {dispute.workpersonId}
                    </p>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => handleResolve(dispute.id)}
                    className="w-1/5 bg-green-700 hover:bg-green-800 p-2 text-xs font-bold text-white cursor-pointer rounded-lg"
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default DisputeInbox;
