import React, { useState } from "react";
import { workforceRegistryData } from "../assets/admin";
import { useLocation } from "react-router-dom";

const LabourAudit = () => {
  const location = useLocation();
  const siteName = location.state?.siteName || "";
  const [query, setQuery] = useState(siteName);

  const filterdWorkers = workforceRegistryData.filter((worker) => {
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
              Workforce Registry & Minimum Wage Audit
            </h3>
            <p className="text-xs font-normal text-gray-500">
              Minimum Wages Act 1948 Compliance Monitoring – All Registered
              Workers
            </p>
          </span>
          {/* search bar */}
          <div>
            {" "}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, role, or ID"
              className="w-full bg-slate-50 border border-slate-300 px-3.5 py-1.5 rounded-xl text-xs sm:w-64 outline-none focus:bg-white focus:ring-1 focus:ring-blue-600 font-medium"
            />
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
                  <th className="py-2.5 px-3">Worker UID</th>
                  <th className="py-2.5 px-3">Worker Name</th>
                  <th className="py-2.5 px-3">Designated Role</th>
                  <th className="py-2.5 px-3">Assigned Site</th>
                  <th className="py-2.5 px-3">Contractor Agency</th>
                  <th className="py-2.5 px-3">Daily Wage Rate</th>
                  <th className="py-2.5 px-3">Site Floor Wage</th>
                  <th className="py-2.5 px-3 text-center">
                    Statutory Compliance
                  </th>
                </thead>

                <tbody className="divide-y divide-slate-100 font-medium">
                  {filterdWorkers.map((data) => (
                    <tr
                      key={data.id}
                      className="hover:bg-slate-50 transition border-b border-slate-100"
                    >
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-700">
                        {data.uid}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-slate-900">
                          {data.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-hindi">
                          UIDAI: {data.UIDAI}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">
                        {data.role}
                      </td>

                      <td className="py-2.5 px-3 font-medium text-slate-800">
                        {data.site}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">
                        {data.agency}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">
                        ₹{data.rate}/day
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">
                        ₹{data.floorWage}/day
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {data.status}
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

export default LabourAudit;
