import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { adminLinks } from "../assets/admin";

const AdminMain = () => {
  return (
    <div className="w-full max-w-6xl flex flex-col lg:flex-row items-start justify-between mx-auto mt-28 px-3 sm:px-4 py-2 gap-3.5">
      <div className="w-full flex flex-row items-start justify-between bg-white rounded-lg border border-gray-300 shadow-2xl">
        {/*title and desc  */}
        <div className="space-x-2 overflow-y-auto p-4">
          {/* name */}
          <div className="flex flex-row items-start overflow-x-auto gap-1.5">
            <span className="bg-slate-900 text-white text-xs px-2.5 py-1 rounded font-mono font-bold">
              STATE LABOUR AUDIT
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Ministry of Labour & Employment Compliance Hub
            </h2>
          </div>
          {/* desc */}
          <span className="text-xs text-gray-500 font-medium">
            Multi-site monitoring, Minimum Wage Act enforcement, BOCW Cess
            compliance, and dispute mediation.
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 pl-4 pt-4">
          {adminLinks.map((link) => (
            <NavLink
              to={link.path}
              key={link.id}
              className={({ isActive }) =>
                `flex items-center justify-center gap-2 transition-all duration-200 px-3 py-1.5 rounded-lg text-xs font-bold ${
                  isActive
                    ? " bg-slate-900 text-white transition"
                    : " bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                }`
              }
            >
              <h1 className="text-xs sm:text-xs font-medium text-center leading-tight">
                {link.title}
              </h1>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMain;
