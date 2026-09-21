import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import WageCalCard from "../cards/wageCalCard";
import { siteDashboardData, wageCalculation } from "../assets/contractor";

const Dashboard = () => {
  const navigate = useNavigate();

  const { activeSiteId, setIsAuthOpen } = useOutletContext();
  
  

  const [attendenceData, setAttendenceData] = useState([]);

  // Get the selected site's data
  const siteData = siteDashboardData[activeSiteId];

  // Check whether the selected site has dashboard data
  const hasSiteData = siteData !== null && siteData !== undefined;

  // If site has data, use its wageCalculation.
  // Otherwise use the existing wageCalculation only as a card template.
  const dashboardWageData = hasSiteData
    ? siteData.wageCalculation || []
    : wageCalculation;

  // Get attendance data only when the selected site has data
  const siteAttendenceData = hasSiteData ? siteData.attendencePunch || [] : [];

  useEffect(() => {
    setAttendenceData(siteAttendenceData);
  }, [activeSiteId, siteData]);

  // Toggle attendance
  const toggleAttendence = (id) => {
    setAttendenceData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Present (P)" ? "Absent (A)" : "Present (P)",
            }
          : item,
      ),
    );
  };

  // Mark all workers present
  const markAllPresent = () => {
    setAttendenceData((prev) =>
      prev.map((item) => ({
        ...item,
        status: "Present (P)",
      })),
    );
  };

  // Calculation
  // const totalWorkers = attendenceData.length;

  const presentWorkers = attendenceData.filter(
    (item) => item.status === "Present (P)",
  );

  const totalPresent = presentWorkers.length;

  const totalDailyAccrual = presentWorkers.reduce(
    (total, item) => total + Number(item.dailyWage || 0),
    0,
  );

  // Update dashboard calculation cards dynamically
  const calculatedWageData = dashboardWageData.map((item) => {
    if (!hasSiteData) {
      return {
        ...item,
        calc: "",
      };
    }

    // Present on Site Today
    if (item.id === 1) {
      return {
        ...item,
        calc: `${totalPresent} `,
      };
    }

    // Today's Wage Accrual
    if (item.id === 2) {
      return {
        ...item,
        calc: `₹${totalDailyAccrual.toLocaleString("en-IN")}`,
      };
    }

    return item;
  });

  return (
    <div className="flex flex-col items-center justify-start px-4 sm:px-6 pt-32 lg:pt-16 bg-gray-100 min-h-screen">
      {/* calculation list */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:pt-10 lg:px-10">
        {calculatedWageData.map((item) => (
          <WageCalCard
            key={item.id}
            title={item.title}
            calc={item.calc}
            desc={item.desc}
            comment={item.opt}
            icon={item.icon}
            payNow={item.payNow}
            col={item.commentCol}
            colBg={item.colBg}
            colIcon={item.colIcon}
            textCal={item.textCal}
            valueCol={item.valueCol}
          />
        ))}
      </div>

      {/* Today's Attendance Quick-Punch and labour law */}
      <div className="w-full flex flex-col lg:flex-row items-start justify-center py-8 px-1 lg:pr-10 gap-8">
        {/* left side */}
        <div className="w-full lg:w-2/3 bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm lg:ml-9">
          {/* upper section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Today's Attendance Quick-Punch
              </h1>

              <p className="text-xs text-slate-500">
                Mark or verify attendance for workers currently on site.
              </p>
            </div>

            <div className="flex flex-row gap-3">
              <button
                onClick={markAllPresent}
                disabled={attendenceData.length === 0}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1 shadow-sm ${
                  attendenceData.length === 0
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
                }`}
              >
                <span>✓</span>
                <span>Mark All Present</span>
              </button>

              <button
                onClick={() => navigate("/contractor/mark-attendence")}
                className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200 transition cursor-pointer"
              >
                Detailed Roster →
              </button>
            </div>
          </div>

          {/* table */}
          <div className="w-full overflow-x-auto mt-5">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">
                    Labourer
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">
                    Category
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">
                    Daily Wage
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">
                    Status
                  </th>

                  <th className="px-4 py-3 text-right text-xs font-bold text-slate-600 uppercase">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {attendenceData.length > 0 ? (
                  attendenceData.map((item) => {
                    const isPresent = item.status === "Present (P)";

                    return (
                      <tr
                        key={item.id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition"
                      >
                        {/* Labourar */}
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900">
                              {item.labourer}
                            </span>

                            <span className="text-[11px] text-slate-400 mt-0.5">
                              {item.laburId}
                            </span>
                          </div>
                        </td>

                        {/* category */}
                        <td className="px-4 py-3 text-sm text-slate-800">
                          {item.category}
                        </td>

                        {/* Daily Wage */}
                        <td className="px-4 py-3">
                          <span className="text-sm font-bold text-slate-900">
                            ₹{item.dailyWage}/d
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${
                              isPresent
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>

                        {/* action */}
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => toggleAttendence(item.id)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md text-xs font-semibold transition cursor-pointer"
                          >
                            Toggle
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="h-[300px] text-center text-sm text-slate-400"
                    >
                      No attendance data available for this site.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* right side */}
        <div className="w-full lg:w-1/3 flex flex-col">
          {/* Labour Law Minimum Wage Alert */}
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
            {/* Upper section */}
            <div className="flex flex-row items-start justify-center gap-2">
              {/* logo */}
              <span className="text-2xl">⚖️</span>

              {/* title and desc */}
              <div>
                {/* title */}
                <h1 className="text-sm font-bold text-amber-900">
                  Labour Law Minimum Wage Alert
                </h1>

                {/*desc  */}
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                  State Revised Daily Wage Floor:{" "}
                  <strong>₹520 (Unskilled) / ₹780 (Skilled).</strong> All
                  workers on this site currently meet or exceed statutory rates.
                </p>
              </div>
            </div>

            {/* lower section */}
            <div className="flex flex-row items-center justify-between ml-10 mt-2">
              <p className="text-xs text-amber-900 font-semibold">
                BOCW Cess: Active (1%)
              </p>

              <p className="text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold">
                Compliant
              </p>
            </div>
          </div>

          {/* Direct Worker Enrolment */}
          <div className="flex flex-col items-start justify-center mt-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-5 shadow-sm space-y-3">
            {/* direct and instant */}
            <div className="w-full flex flex-row justify-between">
              {/* title */}
              <h1 className="font-bold text-sm text-white">
                Direct Worker Enrolment
              </h1>

              {/* desc */}
              <span className="text-xs bg-orange-600 px-2 py-0.5 rounded text-white font-medium">
                Instant
              </span>
            </div>

            <p className="text-xs text-slate-300">
              New labourer arrived at the gate? Register their Aadhaar reference
              and trade rate to record attendance immediately.
            </p>

            {/* add button */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg text-xs transition shadow flex items-center justify-center space-x-2 cursor-pointer"
            >
              <p>+ Add New Worker to Site</p>
            </button>
          </div>

          {/* Pending Wage Query */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-start justify-between gap-2 mt-4">
            <div className="flex flex-row gap-2">
              <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold">
                1
              </span>

              <div>
                <h1 className="text-xs font-bold text-slate-800">
                  Pending Wage Query
                </h1>

                <p className="text-[11px] text-slate-500">
                  Ramesh Kumar flagged 2h OT missing
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/review")}
              className="text-xs text-orange-600 font-semibold hover:underline cursor-pointer"
            >
              Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
