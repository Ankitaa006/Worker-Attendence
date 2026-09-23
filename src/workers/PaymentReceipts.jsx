import React from "react";

const PaymentReceipts = () => {
  return (
    <div className="w-full max-w-6xl flex flex-col lg:flex-row items-start justify-between mx-auto px-3 sm:px-4 py-2 gap-3.5">
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow-lg my-2 p-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          Payment Settlements & Handover Receipts
        </h2>
        <p className="text-xs text-slate-500 font-hindi">
          Complete record of your bank, UPI and cash payments
        </p>

        <div className="w-full overflow-x-auto py-3">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase">
              <tr>
                <th className="py-3 px-3">Voucher #</th>
                <th className="py-3 px-3">Date & Time</th>
                <th className="py-3 px-3">Payment Mode</th>
                <th className="py-3 px-3 text-right">Amount Received</th>
                <th className="py-3 px-3">Supervisor Receipt Ref</th>
                <th className="py-3 px-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium">
              <tr className="hover:bg-slate-50 transition border-b border-slate-100">
                <td className="py-3 px-3 font-mono font-bold text-slate-800">
                  VCH-901
                </td>
                <td className="py-3 px-3 text-slate-500">06 Sep 2026 17:30</td>
                <td className="py-3 px-3">
                  <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">
                    Cash with Signed Voucher
                  </span>
                </td>

                <td className="py-3 px-3 text-right font-black text-emerald-600">
                  ₹3,000
                </td>
                <td className="py-3 px-3 text-slate-500">
                  Wk-35 payout settled
                </td>
                <td className="py-3 px-3 text-center">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                    Disbursed
                  </span>
                </td>
               
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipts;
