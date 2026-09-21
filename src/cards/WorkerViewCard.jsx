import React from "react";

const WorkerViewCard = ({
  workerName,
  workerId,
  trade,
  mobile,
  aadhar,
  wage,
  onPayWage,
  onViewPaySlip,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-2.5">
      <div className="w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-5">

        {/* Name and wage */}
        <div className="w-full flex flex-row items-start justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-slate-950">
              {workerName}
            </span>

            <span className="text-sm text-slate-500 mt-0.5">
              {workerId}
            </span>
          </div>

          <span className="shrink-0 px-2.5 py-1 border border-orange-300 bg-orange-50 text-orange-600 rounded-md text-sm font-bold">
            ₹{wage}/day
          </span>
        </div>

        {/* Worker details */}
        <div className="w-full mt-4 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5">
          <div className="grid grid-cols-[1fr_auto] gap-y-1 text-sm">

            <span className="text-slate-400">
              Trade:
            </span>
            <span className="text-slate-950 font-semibold text-right">
              {trade}
            </span>

            <span className="text-slate-400">
              Mobile:
            </span>
            <span className="text-slate-950 text-right">
              {mobile}
            </span>

            <span className="text-slate-400">
              Aadhaar (Ref):
            </span>
            <span className="text-slate-950 text-right">
              •••• •••• {aadhar}
            </span>

          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-slate-200 mt-4" />

        {/* Actions */}
        <div className="w-full flex flex-row items-center justify-between mt-2.5 gap-3">
          <button
            type="button"
            onClick={onPayWage}
            className="text-green-600 font-bold text-sm hover:text-green-700 transition-colors cursor-pointer"
          >
            Pay Wages →
          </button>

          <button
            type="button"
            onClick={onViewPaySlip}
            className="bg-slate-950 text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            View Pay Slip
          </button>
        </div>

      </div>
    </div>
  );
};

export default WorkerViewCard;