import React, { useEffect, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import {
  OtMoney,
  siteDashboardData,
  sites,
  tradeRoleData,
  wageCalculation,
} from "../assets/contractor";
import { GoDotFill } from "react-icons/go";
import { useOutletContext } from "react-router-dom";

const MarkAttendence = () => {
  const { activeSiteId, setIsAuthOpen } = useOutletContext();

  const [query, setQuery] = useState("");
  const [queryTrade, setQueryTrade] = useState("All Trades");
  const [attendenceData, setAttendenceData] = useState([]);

  const siteData = siteDashboardData[activeSiteId];

  const currentSite = sites.find((site) => site.id === activeSiteId);

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
  const toggleAttendence = (id, status) => {
    setAttendenceData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: status,
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

  const markAllAbsent = () => {
    setAttendenceData((prev) =>
      prev.map((item) => ({
        ...item,
        status: "Absent (A)",
        ot: 0,
      })),
    );
  };

  // Update overtime for individual labourer
  const handleOtChange = (id, value) => {
    const otValue = Math.max(0, Number(value));

    setAttendenceData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ot: otValue,
            }
          : item,
      ),
    );
  };

  // Calculation
  const totalDailyWage = (labour) => {
    // Absent worker gets no wage
    if (labour.status === "Absent (A)") {
      return 0;
    }

    // Find overtime rate for this role
    const otData = OtMoney.find((item) => item.role === labour.category);

    const otRate = Number(otData?.money || 0);

    const dailyWage = Number(labour.dailyWage || 0);

    const overtimeHours = Number(labour.ot || 0);

    // Attendance multiplier
    let attendanceMultiplier = 1;

    if (labour.status === "Half Day (H)") {
      attendanceMultiplier = 0.5;
    }

    const attendanceWage = dailyWage * attendanceMultiplier;

    const overtimePayment = overtimeHours * otRate;

    return attendanceWage + overtimePayment;
  };

  // Calculation

  const presentWorkers = attendenceData.filter(
    (item) => item.status === "Present (P)",
  );

  const totalPresent = presentWorkers.length;

  const totalDailyAccrual = attendenceData.reduce(
    (total, item) => total + totalDailyWage(item),
    0,
  );

  // Search and trade filter
  const filteredAttendanceData = attendenceData.filter((item) => {
    const searchText = query.toLowerCase().trim();

    const matchesSearch =
      item.labourer?.toLowerCase().includes(searchText) ||
      item.category?.toLowerCase().includes(searchText) ||
      item.laburId?.toLowerCase().includes(searchText);

    const matchesTrade =
      queryTrade === "All Trades" || item.category === queryTrade;

    return matchesSearch && matchesTrade;
  });

  // Update dashboard calculation cards dynamically

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const getOverTimeRate = (category) => {
    const otData = OtMoney.find((item) => item.role === category);

    return otData ? Number(otData.money) : 0;
  };

  const calculateGross = (worker) => {
    const dailyWage = Number(worker.dailyWage) || 0;
    const daysWorked = Number(worker.daysWork) || 0;
    const otHours = Number(worker.ot) || 0;

    const otRate = getOverTimeRate(worker.category);

    const regularAmount = dailyWage * daysWorked;
    const overtimeAmount = otRate * otHours;

    return regularAmount + overtimeAmount;
  };

  const calculateNetDue = (worker) => {
    const gross = calculateGross(worker);

    const cashAdvanced = Number(worker.cashAdvanced) || 0;

    return gross - cashAdvanced;
  };

  const exportWageSummary = () => {
    if (!attendenceData.length) return;

    const headers = [
      "Labourer",
      "Labour ID",
      "Trade",
      "Daily Rate",
      "Days Worked",
      "OT Hours",
      "Gross Earned",
      "Cash Advances",
      "Net Balance Due",
    ];

    const rows = attendenceData.map((worker) => {
      const gross = calculateGross(worker);
      const netDue = calculateNetDue(worker);

      return [
        worker.labourer,
        worker.laburId,
        worker.category,
        worker.dailyWage,
        worker.daysWork,
        worker.ot,
        gross.toFixed(2),
        worker.cashAdvanced,
        netDue.toFixed(2),
      ];
    });

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${currentSite?.title || "site"}-wage-summary.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;

    setQueryTrade(selectedRole);
  };

  return (
    <div className="flex flex-col items-center justify-start px-4 sm:px-6 pt-32 lg:pt-16 bg-gray-100 min-h-screen">
      {/* Attendence Header */}
      <div className="w-full lg:w-6/7 flex flex-col lg:flex-row my-8 lg:my-10 bg-white border mx-10 border-gray-300 rounded-md lg:gap-8">
        {/* title and description */}
        <div className="w-full m-4">
          <h1 className="text-xl text-black font-bold">
            Daily Attendance Roster
          </h1>

          <p className="text-sm text-gray-600">
            Toggle Full Day, Half Day (0.5), Absent, or Overtime. Calculations
            sync immediately.
          </p>
        </div>

        {/* title and attendence */}
        <div className="w-full flex flex-row items-center justify-start mx-4 lg:mt-4 mb-4 gap-2">
          {/* time */}
          <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
            <span className="font-semibold text-slate-600">Roster Date:</span>

            <span className="bg-white px-2 py-1 rounded border border-slate-300 text-xs focus:ring-1 focus:ring-amber-500 outline-none font-medium">
              {currentDate}
            </span>
          </div>

          {/* present */}
          <button
            onClick={markAllPresent}
            className="px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300 rounded-lg text-xs font-semibold transition cursor-pointer"
          >
            ✓ Mark All Present
          </button>

          {/* absent */}
          <button
            onClick={markAllAbsent}
            className="px-3 py-2 bg-red-50 text-red-700 hover:bg-red-100 border border-red-300 rounded-lg text-xs font-semibold transition cursor-pointer"
          >
            ✕ Mark All Absent
          </button>

          {/* csv */}
          <button
            type="button"
            onClick={exportWageSummary}
            disabled={!attendenceData.length}
            className="flex px-3 py-2 bg-slate-900 text-white hover:bg-black rounded-lg text-xs font-semibold transition gap-1 cursor-pointer"
          >
            <MdOutlineFileDownload size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {/* search logic */}
      <div className="w-full lg:w-6/7 flex flex-col lg:flex-row items-center justify-between bg-white mx-4 mb-4 lg:gap-20 gap-6 bg-gray-200/25 border border-gray-300 rounded-md p-0.5">
        {/* Search bar and filter */}
        <div className="w-full flex flex-row items-center justify-start gap-2.5 p-3">
          {/* search bar */}
          <div className="w-full bg-white border border-none">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search labourer by name and role..."
              className="h-8 w-full p-0.5 px-2 rounded-md border border-gray-300 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
            />
          </div>

          {/* all trades */}
          <select
            value={queryTrade}
            onChange={handleRoleChange}
            className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
          >
            <option value="All Trades" className="text-sm text-gray-500">
              All Trades
            </option>

            {tradeRoleData.map((item) => (
              <option
                key={item.id}
                value={item.tradeRole}
                className="text-sm text-gray-500"
              >
                {item.tradeRole}
              </option>
            ))}
          </select>
        </div>

        {/* details */}
        <div className="lg:w-full w-full flex flex-row items-center lg:justify-end gap-4 lg:text-sm text-xs font-mono pr-2 overflow-x-auto">
          <span className="flex items-center justify-center whitespace-nowrap">
            <GoDotFill size={20} color="green" />
            Full(1.0)
          </span>

          <span className="flex items-center justify-center whitespace-nowrap">
            <GoDotFill size={20} color="yellow" />
            Half(0.5)
          </span>

          <span className="flex items-center justify-center whitespace-nowrap">
            <GoDotFill size={20} color="red" />
            Absent(0.0)
          </span>

          <span className="flex items-center justify-center whitespace-nowrap">
            <GoDotFill size={20} color="blue" />
            Overtime(+Hrs)
          </span>
        </div>
      </div>

      {/* Table and the leadger */}
      <div className="w-full lg:w-6/7 overflow-x-auto mt-5 rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[1200px] border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase">
                #
              </th>

              <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase">
                Labourer Name (श्रमिक)
              </th>

              <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase">
                Trade Role
              </th>

              <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase">
                Daily Wage Rate
              </th>

              <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase">
                Attendance Status (स्थिति)
              </th>

              <th className="px-4 py-3 text-center text-xs font-bold text-white uppercase">
                OT (Hours)
              </th>

              <th className="px-4 py-3 text-right text-xs font-bold text-white uppercase">
                Today's Wage
              </th>

              <th className="px-4 py-3 text-center text-xs font-bold text-white uppercase">
                Status Audit
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredAttendanceData.length > 0 ? (
              filteredAttendanceData.map((item) => {
                const isPresent = item.status === "Present (P)";

                const isHalfDay = item.status === "Half Day (H)";

                const isAbsent = item.status === "Absent (A)";

                const todayWage = totalDailyWage(item);

                const otData = OtMoney.find(
                  (otItem) => otItem.role === item.category,
                );

                const otRate = Number(otData?.money || 0);

                return (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    {/* id */}
                    <td className="px-4 py-3 text-sm text-slate-800">
                      {item.id}
                    </td>

                    {/* Labourar */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">
                          {item.labourer}
                        </span>

                        <span className="text-[11px] text-slate-400 mt-0.5">
                          श्रमिक • ID: {item.laburId}
                        </span>
                      </div>
                    </td>

                    {/* category */}
                    <td className="px-4 py-3 text-sm text-slate-800">
                      <span className="inline-flex px-2.5 py-1 bg-slate-100 rounded-md text-xs font-medium text-slate-800">
                        {item.category}
                      </span>
                    </td>

                    {/* Daily Wage */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">
                          ₹{Number(item.dailyWage || 0).toLocaleString("en-IN")}
                        </span>

                        <span className="text-[10px] text-slate-400">
                          / day
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <div className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1 gap-1">
                        {/* Present */}
                        <button
                          type="button"
                          onClick={() =>
                            toggleAttendence(item.id, "Present (P)")
                          }
                          className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                            isPresent
                              ? "bg-emerald-600 text-white shadow-sm"
                              : "text-slate-700 hover:bg-emerald-50"
                          }`}
                        >
                          P
                        </button>

                        {/* Half */}
                        <button
                          type="button"
                          onClick={() =>
                            toggleAttendence(item.id, "Half Day (H)")
                          }
                          className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                            isHalfDay
                              ? "bg-yellow-500 text-white shadow-sm"
                              : "text-slate-700 hover:bg-yellow-50"
                          }`}
                        >
                          H
                        </button>

                        {/* Absent */}
                        <button
                          type="button"
                          onClick={() =>
                            toggleAttendence(item.id, "Absent (A)")
                          }
                          className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                            isAbsent
                              ? "bg-rose-600 text-white shadow-sm"
                              : "text-slate-700 hover:bg-rose-50"
                          }`}
                        >
                          A
                        </button>
                      </div>
                    </td>

                    {/* ot */}
                    <td className="px-4 py-3 text-center">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <input
                          type="number"
                          min="0"
                          step="0.5"
                          value={item.ot ?? 0}
                          disabled={isAbsent}
                          onChange={(event) =>
                            handleOtChange(item.id, event.target.value)
                          }
                          className={`w-16 h-8 px-2 border border-slate-300 bg-white text-black font-semibold rounded-md text-xs text-center transition focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 ${
                            isAbsent
                              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                              : ""
                          }`}
                        />

                        <span className="text-[10px] text-slate-400">
                          ₹{otRate}/hr
                        </span>
                      </div>
                    </td>

                    {/* Today's Wage */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex flex-col items-end">
                        <span
                          className={`text-sm font-bold ${
                            isAbsent ? "text-slate-400" : "text-slate-900"
                          }`}
                        >
                          ₹{todayWage.toLocaleString("en-IN")}
                        </span>

                        {!isAbsent && Number(item.ot || 0) > 0 && (
                          <span className="text-[10px] text-blue-600 font-medium">
                            Base + OT
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status Audit */}
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center">
                        <span
                          title={
                            isPresent
                              ? "Present"
                              : isHalfDay
                                ? "Half Day"
                                : "Absent"
                          }
                          className={`w-3 h-3 rounded-full ${
                            isPresent
                              ? "bg-emerald-500"
                              : isHalfDay
                                ? "bg-yellow-500"
                                : "bg-rose-500"
                          }`}
                        ></span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="h-[300px] text-center text-sm text-slate-400"
                >
                  No attendance data available for this site.
                </td>
              </tr>
            )}
          </tbody>

          {/* Table Footer */}
          {filteredAttendanceData.length > 0 && (
            <tfoot>
              <tr className="bg-slate-50 border-t-2 border-slate-200">
                <td
                  colSpan="4"
                  className="px-4 py-4 text-sm font-normal text-slate-700"
                >
                  Showing 12 registered labourers for active site
                </td>

                <td></td>
                <td></td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <span className="text-sm text-black-700 font-medium">
                      Total Day Headcount:{" "}
                      <span className="text-emerald-500 font-bold">
                        {totalPresent} Units
                      </span>
                    </span>
                  </div>
                </td>

                <td className="px-4 py-4 text-right">
                  <span className="text-sm font-medium text-slate-900 gap-2">
                    Total Day Wages:{" "}
                    <span className="text-red-600 font-bold">
                      ₹{totalDailyAccrual.toLocaleString("en-IN")}
                    </span>
                  </span>
                </td>

                <td></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default MarkAttendence;
