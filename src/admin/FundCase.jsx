import React, { useState } from "react";
import { projectFundData } from "./../assets/admin";
import { useLocation } from "react-router-dom";

const FundCase = () => {
  const location = useLocation();
  const siteName = location.state?.siteName || "";
  const [query, setQuery] = useState(siteName);

  const filterdWorkers = projectFundData.filter((worker) => {
    const search = query.toLowerCase().trim();

    // const matchesSite =
    //   !siteName || worker.site.toLowerCase() === siteName.toLowerCase();

    if (!search) {
      return true;
    }

    const matchesSearch =
      worker.name.toLowerCase().includes(search) ||
      worker.role.toLowerCase().includes(search) ||
      worker.agency.toLowerCase().includes(search) ||
      worker.site.toLowerCase().includes(search) ||
      worker.uid.toLowerCase().includes(search);

    return matchesSearch;
  });
  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-4">
      <div className="bg-white border border-gray-300 rounded-lg p-4">
        {/* upper section */}
        <div className="flex flex-row items-start justify-between  gap-1">
          {/* Details and tag */}
          <span>
            <h3 className="text-sm lg:text-base text-black font-bold">
              Project Funds, Disbursements & 1% BOCW Cess Ledger
            </h3>
            <p className="text-xs font-normal text-gray-500">
              Every contractor wage disbursement logs a statutory 1% Building &
              Other Construction Workers Cess into the state welfare treasury
              record.
            </p>
          </span>
          {/* search bar */}
          <div className="flex items-center space-x-2">
            {" "}
            <button className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition flex items-center space-x-1.5 shadow-xs">
              <span>📥</span> <span>Export Cess Leadger CSV</span>
            </button>
          </div>
        </div>
        {/* border */}
        {/* <span className="w-full border-b border-b-gray-500" /> */}
        {/* Table */}
        <div className="w-full overflow-x-auto">
          {filterdWorkers.length == 0 ? (
            <>
              <div className="text-sm font-medium text-gray-400 flex items-center justify-center mt-9">
                <p>There is no Worker assing to site yet, Please add Workers</p>
              </div>
            </>
          ) : (
            <div className="overflow-x-auto pt-4">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 uppercase font-bold text-slate-600 border-b border-slate-200">
                  <th className="py-2.5 px-3">Voucher No</th>
                  <th className="py-2.5 px-3">Disbursal Date</th>
                  <th className="py-2.5 px-3">Site Location</th>
                  <th className="py-2.5 px-3">Contractor Agency</th>
                  <th className="py-2.5 px-3">Worker Beneficiary</th>
                  <th className="py-2.5 px-3">Gross Wage Disbursed</th>
                  <th className="py-2.5 px-3">1% BOCW Cess Accrued</th>
                  <th className="py-2.5 px-3 text-center">Settlement Mode</th>
                </thead>

                <tbody className="divide-y divide-slate-100 font-medium">
                  {filterdWorkers.map((data) => (
                    <tr
                      key={data.id}
                      className="hover:bg-slate-50 transition border-b border-slate-100"
                    >
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-700">
                        {data.vouchNo}
                      </td>
                      <td className="py-2.5 px-3">{data.disBursalDate}</td>
                      <td className="py-2.5 px-3 text-slate-600">
                        {data.siteLocation}
                      </td>

                      <td className="py-2.5 px-3 font-medium text-slate-800">
                        {data.agency}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">
                        {data.workerBeneficiary}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">
                        {data.wageDistribution}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">
                        {data.bocw}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-gray-50 text-gray-700">
                          {data.settlement}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FundCase;
