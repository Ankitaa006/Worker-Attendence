import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OtMoney, siteDashboardData, sites } from "./../assets/contractor";
import PaySlipModal from "../components/PaySlipModel";

const WageCalculator = () => {
  const { activeSiteId } = useOutletContext();

  const [isPaySlipOpen, setIsPaySlipOpen] = useState(false);
  const [selectedLabourId, setSelectedLabourId] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const currentSite = sites.find((site) => site.id === activeSiteId);
  const currentSitedData = siteDashboardData[activeSiteId];

  const attendenceData = currentSitedData?.attendencePunch || [];

  const selectedWorker = attendenceData.find(
    (worker) => worker.laburId === selectedLabourId,
  );

  const today = new Date();

  const currentDate = today.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const getCurrentWeek = () => {
    const today = new Date();

    const day = today.getDay();

    const monday = new Date(today);
    monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return {
      start: monday,
      end: sunday,
    };
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const currentWeek = getCurrentWeek();

  const currentWeekLabel = `${formatDate(
    currentWeek.start,
  )} - ${formatDate(currentWeek.end)}`;

  const currentMonthLabel = `${currentDate} (Month-to-date)`;

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

  // const totalGross = attendenceData.reduce(
  //   (total, worker) => total + calculateGross(worker),
  //   0,
  // );

  // const totalAdvance = attendenceData.reduce(
  //   (total, worker) => total + (Number(worker.cashAdvanced) || 0),
  //   0,
  // );

  // const totalNetDue = attendenceData.reduce(
  //   (total, worker) => total + calculateNetDue(worker),
  //   0,
  // );

  // const totalOtHour = attendenceData.reduce(
  //   (total, worker) => total + Number(worker.ot || 0),
  //   0,
  // );

  // const totalDaysWorked = attendenceData.reduce(
  //   (total, worker) => total + Number(worker.daysWork || 0),
  //   0,
  // );

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

  const handleViewPaySlip = (labourId) => {
    setSelectedLabourId(labourId);
    setIsPaySlipOpen(true);
  };

  const settlement = {
    voucherId: selectedWorker
      ? `VCH-${selectedWorker.laburId}-0926`
      : "VCH-0000-0926",

    siteName: "Metro Corridor Line 3 (Tower B)",

    contractorName: "Apex Buildcon Infrastructures Ltd",

    payPeriod: "01 Sep 2026 to 08 Sep 2026",

    regularDays: 5.5,

    overtimeHours: 2,

    overtimeRate: selectedWorker
      ? Number(selectedWorker.dailyWage || 0) / 8
      : 0,

    priorAdvance: 500,

    settledPayments: 3000,
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-start px-4 sm:px-6 pt-32 lg:pt-16 bg-gray-100 min-h-screen">
        {/* Attendence Header */}
        <div className="w-full lg:w-6/7 flex flex-col lg:flex-row my-8 lg:my-10 border mx-10 border-gray-300 bg-white rounded-md lg:gap-8">
          {/* title and description */}
          <div className="w-full m-4">
            <h1 className="text-xl text-black font-bold">
              Automated Wage Calculation & Ledger
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Auto-computed earnings based on site attendance records, overtime
              multipliers, and advance deductions.
            </p>
          </div>

          {/* title and attendence */}
          <div className="w-full flex flex-col sm:flex-row items-center lg:justify-between mx-4 lg:mt-4 mb-4 gap-3">
            {/* time */}
            <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
              <span className="font-semibold text-slate-600">Period:</span>

              <select
                value={selectedPeriod}
                onChange={(event) => setSelectedPeriod(event.target.value)}
                className="bg-white px-2 py-1 rounded border border-slate-300 text-xs focus:ring-1 focus:ring-amber-500 outline-none font-medium"
              >
                <option value="month">{currentMonthLabel}</option>

                <option value="week">Current Week ({currentWeekLabel})</option>
              </select>
            </div>

            {/* csv */}
            <button
              type="button"
              onClick={exportWageSummary}
              disabled={!attendenceData.length}
              className="flex px-3 py-2 bg-slate-900 text-white hover:bg-black rounded-lg text-xs font-semibold transition gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📥 Export Wage Summary
            </button>
          </div>
        </div>

        {/* Wage Table */}
        {attendenceData.length > 0 ? (
          <div className="w-full lg:w-6/7 mb-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[1200px] border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-white">
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase">
                      Labourer
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase">
                      Daily Rate
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-bold uppercase">
                      Days Worked
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-bold uppercase">
                      OT Hours
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-bold uppercase">
                      Gross Earned
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-bold uppercase">
                      Cash Advances
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-bold uppercase">
                      Net Balance Due
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-bold uppercase">
                      Slip / Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {attendenceData.map((worker) => {
                    const gross = calculateGross(worker);
                    const netDue = calculateNetDue(worker);
                    const otRate = getOverTimeRate(worker.category);

                    return (
                      <tr
                        key={worker.id}
                        className="border-b border-slate-200 hover:bg-slate-50 transition"
                      >
                        {/* Labourer */}
                        <td className="px-5 py-4">
                          <div>
                            <p className="font-bold text-slate-900">
                              {worker.labourer}
                            </p>

                            <p className="text-xs text-slate-500">
                              {worker.category}
                            </p>

                            <p className="text-[11px] text-slate-400 mt-0.5">
                              {worker.laburId}
                            </p>
                          </div>
                        </td>

                        {/* Daily Rate */}
                        <td className="px-5 py-4">
                          <span className="font-semibold text-slate-900">
                            ₹{Number(worker.dailyWage).toLocaleString("en-IN")}
                          </span>
                        </td>

                        {/* Days Worked */}
                        <td className="px-5 py-4 text-center">
                          <span className="font-bold text-slate-900">
                            {worker.daysWork || 0}
                          </span>
                        </td>

                        {/* OT */}
                        <td className="px-5 py-4 text-center">
                          <div className="flex flex-col items-center">
                            <span className="font-semibold text-slate-900">
                              {worker.ot || 0}h
                            </span>

                            {Number(worker.ot) > 0 && (
                              <span className="text-[10px] text-orange-600">
                                ₹{otRate}/hr
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Gross */}
                        <td className="px-5 py-4 text-right">
                          <span className="font-bold text-slate-900">
                            ₹
                            {gross.toLocaleString("en-IN", {
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </td>

                        {/* Cash Advance */}
                        <td className="px-5 py-4 text-right">
                          <span className="font-medium text-red-600">
                            -₹
                            {Number(worker.cashAdvanced || 0).toLocaleString(
                              "en-IN",
                            )}
                          </span>
                        </td>

                        {/* Net Due */}
                        <td className="px-5 py-4 text-right">
                          <span className="font-bold text-red-600">
                            ₹
                            {netDue.toLocaleString("en-IN", {
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </td>

                        {/* Slip */}
                        <td className="px-5 py-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleViewPaySlip(worker.laburId)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-xs font-semibold text-slate-800 transition cursor-pointer"
                          >
                            Slip
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="w-full lg:w-6/7 mb-10 flex items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white min-h-[300px]">
            <div className="text-center px-5">
              <div className="text-4xl mb-3">📋</div>

              <h2 className="text-lg font-bold text-slate-800">
                No Wage Data Available
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                No attendance or wage records are available for{" "}
                <span className="font-semibold">
                  {currentSite?.title || "this site"}
                </span>
                .
              </p>
            </div>
          </div>
        )}
      </div>

      <PaySlipModal
        isOpen={isPaySlipOpen}
        onClose={() => setIsPaySlipOpen(false)}
        worker={selectedWorker}
        settlement={settlement}
      />
    </>
  );
};

export default WageCalculator;
