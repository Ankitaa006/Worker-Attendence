import React from "react";
import { complianceScoreboard } from "../assets/admin";

const ComplianceOverview = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-4">
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col">
        <span className="w-full flex flex-row items-start justify-between p-3 text-xs ">
          <p className="text-black font-bold">
            Contractor & Site Compliance Scorecard
          </p>
          <p className=" text-gray-500">
            Periodic inspections & automated wage variance tracking
          </p>
        </span>
        <br />
        {/* table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-900">
                  SITE NAME
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-900">
                  CONTRACTOR / AGENCY
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-900">
                  LABOUR FORCE
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-900">
                  MIN WAGE AUDIT
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-900">
                  ON-TIME PAYMENT SCORE
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-900">
                  DISPUTES OPEN
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-900">
                  STATUS
                </th>
              </tr>
            </thead>

            <tbody>
              {complianceScoreboard.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-200 last:border-b-0"
                >
                  {/* Site Name */}
                  <td className="px-5 py-5">
                    <p className="text-sm font-semibold text-slate-900 whitespace-nowrap">
                      {item.siteName}
                    </p>
                  </td>

                  {/* Contractor */}
                  <td className="px-5 py-5">
                    <p className="text-sm text-slate-800 whitespace-nowrap">
                      {item.contractor}
                    </p>
                  </td>

                  {/* Labour Force */}
                  <td className="px-5 py-5">
                    <p className="text-sm text-slate-800 whitespace-nowrap">
                      {item.laborForce} Active
                    </p>
                  </td>

                  {/* Minimum Wage Audit */}
                  <td className="px-5 py-5">
                    <p className="text-sm font-semibold text-emerald-600 whitespace-nowrap">
                      {item.passed}% Passed (Min ₹{item.minWage}/d)
                    </p>
                  </td>

                  {/* Payment Score */}
                  <td className="px-5 py-5">
                    <div className="w-[160px]">
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              Number(item.payScore) >= 90
                                ? "bg-emerald-500"
                                : "bg-amber-400"
                            }`}
                            style={{
                              width: `${item.payScore}%`,
                            }}
                          />
                        </div>
                      </div>

                      <p className="mt-1 text-xs text-slate-600">
                        {item.payScore}% within cycle
                      </p>
                    </div>
                  </td>

                  {/* Disputes */}
                  <td className="px-5 py-5">
                    <p
                      className={`text-sm font-semibold whitespace-nowrap ${
                        Number(item.disputeOpen) > 0
                          ? "text-amber-600"
                          : "text-slate-500"
                      }`}
                    >
                      {item.disputeOpen}{" "}
                      {Number(item.disputeOpen) > 0 ? "Query" : "Open"}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-5">
                    <span
                      className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold ${
                        item.status.toLowerCase() === "approved"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {item.status === "watchlist" ? "Watchlist" : item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComplianceOverview;
