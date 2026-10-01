import React, { useState } from "react";

const AdminSitesCard = ({
  status,
  compliance,
  title,
  contact,
  liscence,
  phone,
  site,
  workforce,
  onSuspend,
  handleCopyLogin,
}) => {
  return (
    <div className="w-full flex flex-col items-start justify-center bg-white border border-gray-300 shadow-xl rounded-lg overflow-hidden">
      {/* Header */}
      <div className="w-full flex flex-row items-center justify-between px-4 pt-4 gap-2">
        <p
          className={`px-2 py-1 text-xs rounded-xl font-semibold ${
            status === "Active"
              ? "bg-green-200 text-green-950"
              : "bg-red-200 text-red-950"
          }`}
        >
          {status}
        </p>

        <span className="text-gray-500 uppercase font-bold text-xs">
          COMPLIANCE
        </span>
      </div>

      {/* Contractor information */}
      <div className="w-full flex flex-row items-center justify-between px-4 pt-2 gap-3">
        <div className="flex flex-col items-start gap-0.5">
          <h2 className="text-black font-bold text-sm">{title}</h2>

          <span className="text-xs text-gray-500">
            Contact: <strong className="font-bold">{contact}</strong>
          </span>
        </div>

        <span className="font-bold text-lg text-green-600 shrink-0">
          {compliance}%
        </span>
      </div>

      {/* Summary table */}
      <div className="w-[calc(100%-2rem)] bg-gray-100 px-4 py-3 flex flex-col justify-center mx-4 my-3 rounded-md gap-2">
        <span className="text-xs flex flex-row items-center justify-between gap-3">
          <p className="text-gray-400">License / Reg:</p>
          <p className="text-black font-mono text-right">{liscence}</p>
        </span>

        <span className="text-xs flex flex-row items-center justify-between gap-3">
          <p className="text-gray-400">Phone:</p>
          <p className="text-black font-mono text-right">{phone}</p>
        </span>

        <span className="text-xs flex flex-row items-center justify-between gap-3">
          <p className="text-gray-400">Active Site:</p>
          <p className="text-black font-mono text-right">{site}</p>
        </span>
      </div>

      {/* Footer */}
      <div className="w-full flex flex-row items-center justify-between px-4 pb-4 gap-3">
        <span className="text-xs text-gray-500">
          Workforce: <strong>{workforce} Workers</strong>
        </span>

        {/* Buttons */}
        <div className="flex flex-row items-center justify-end gap-2">
          <button
            onClick={handleCopyLogin}
            className="text-xs text-white font-bold px-2.5 py-1.5 bg-black rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Copy Login
          </button>

          <button
            onClick={onSuspend}
            className={`px-2 py-1.5 font-semibold text-xs rounded-lg transition-colors cursor-pointer ${
              status === "Active"
                ? "text-amber-700 hover:bg-amber-50"
                : "text-green-700 hover:bg-green-50"
            }`}
          >
            {status === "Active" ? "Suspend" : "Activate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSitesCard;
