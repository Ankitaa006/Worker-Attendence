import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const ManageSitesCard = ({
  siteId,
  location,
  status,
  title,
  agency,
  fund,
  minWage,
  labourWorkforce,
  totalWorker,
}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-start justify-center bg-white border border-gray-300 shadow-xl rounded-lg overflow-hidden">
      {/* Header */}
      <div className="w-full flex flex-row items-center justify-between px-4 pt-4 gap-2">
        <span className="text-black uppercase font-mono text-xs bg-gray-200 rounded-xl p-2">
          <p>{location}</p>
        </span>
        <p
          className={`px-2 py-1 text-xs rounded-xl font-semibold ${
            status === "Active"
              ? "bg-green-200 text-green-950"
              : "bg-red-200 text-red-950"
          }`}
        >
          <span className="font-bold text-sm">●</span> {status}
        </p>
      </div>

      {/* Contractor information */}
      <div className="w-full flex flex-row items-center justify-between px-4 pt-2 gap-3">
        <div className="flex flex-col items-start gap-0.5">
          <h2 className="text-black font-bold text-sm">{title}</h2>

          <span className="text-xs text-gray-500">
            Assigned Agency:{" "}
            <strong className="font-bold text-black">{agency}</strong>
          </span>
        </div>
      </div>

      {/* Summary table */}
      <div className="w-[calc(100%-2rem)] bg-gray-100 px-4 py-3 flex flex-col justify-center mx-4 my-3 rounded-md gap-2">
        <span className="text-xs flex flex-row items-center justify-between gap-3">
          <p className="text-gray-400">Total Project Fund:</p>
          <p className="text-black font-semibold text-right">₹{fund}</p>
        </span>

        <span className="text-xs flex flex-row items-center justify-between gap-3">
          <p className="text-gray-400">Statutory Min Wage Floor:</p>
          <p className="text-amber-700 font-semibold text-right">
            ₹{minWage}/day
          </p>
        </span>

        <span className="text-xs flex flex-row items-center justify-between gap-3">
          <p className="text-gray-400">Labour Workforce:</p>
          <p className="text-black font-semibold text-right">
            {labourWorkforce}/{totalWorker}
          </p>
        </span>
      </div>

      {/* Footer */}
      <div className="w-full flex flex-row items-center justify-between px-4 pb-4 gap-3">
        <span className="text-xs text-gray-500">
          ID: <strong>{siteId}</strong>
        </span>

        {/* Buttons */}
        <div className="flex flex-row items-center justify-end gap-2">
          <NavLink
            onClick={() =>
              navigate("/admin/labour-audit", {
                state: {
                  siteName: title,
                },
              })
            }
            className={"text-xs text-blue-700 font-bold"}
          >
            <h1 className="text-xs font-semibold text-center leading-tight hover:underline">
              View Site Workers →
            </h1>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ManageSitesCard;
