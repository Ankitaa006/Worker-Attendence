import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OtMoney, siteDashboardData, sites } from "./../assets/contractor";
import PayWage from "./PayWage";
import PaySlipModal from "../components/PaySlipModel";

const PaymentAndLeadger = () => {
  const { activeSiteId, setIsAuthOpen } = useOutletContext();

  const [isPaySlipOpen, setIsPaySlipOpen] = useState(false);
  const [isPayWageOpen, setIsPayWageOpen] = useState(false);
  const [selectedLabourId, setSelectedLabourId] = useState("");

  const currentSite = sites.find((site) => site.id === activeSiteId);
  const currentSiteData = siteDashboardData[activeSiteId];

  // const attendanceData = currentSiteData?.attendencePunch || [];
  const attendenceData = currentSiteData?.attendencePunch || [];

  const selectedWorker = attendenceData.find(
    (worker) => worker.laburId === selectedLabourId,
  );

  const formatDateTime = (date = new Date()) => {
    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");

    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

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

  const paymentHistory = attendenceData
    .filter((worker) => Number(worker.cashAdvanced) > 0)
    .map((worker, index) => {
      return {
        id: index + 1,
        voucherNo: `VCH-${901 + index}`,
        dateTime: formatDateTime(
          new Date(Date.now() - index * 24 * 60 * 60 * 1000),
        ),
        labourer: worker.labourer,
        labourId: worker.laburId,
        paymentMode:
          index % 2 === 0
            ? "Cash with Physical Voucher"
            : "UPI Direct (GPay/PhonePe)",
        amount: Number(worker.cashAdvanced) || 0,
        reference:
          index % 2 === 0 ? "Weekly wage paid" : `UPI/${worker.laburId}`,
      };
    });

  const totalDisbursed = paymentHistory.reduce(
    (total, payment) => total + payment.amount,
    0,
  );

  const handleViewPaySlip = (labourId) => {
    setSelectedLabourId(labourId);
    setIsPaySlipOpen(true);
  };

  //  RECORD NEW WAGE

  const handleRecordWage = () => {
    setIsPayWageOpen(true);
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
        {/* Header */}

        <div className="w-full lg:w-6/7 flex flex-col lg:flex-row items-start lg:items-center justify-between my-8 lg:my-10 border border-gray-300 bg-white rounded-xl px-6 py-6 gap-5">
          {/* Title */}

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Payment Disbursement & Settlement Tracker
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Transparent record of all wage settlements: Cash vouchers with
              physical thumb/sign, UPI, and Bank NEFT.
            </p>
          </div>

          {/* Record Wage */}

          <button
            type="button"
            onClick={handleRecordWage}
            className="shrink-0 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-bold transition cursor-pointer shadow-sm"
          >
            💳 Record New Wage Disbursal
          </button>
        </div>

        {paymentHistory.length > 0 ? (
          <div className="w-full lg:w-6/7 mb-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* History Header */}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-5 py-5 border-b border-slate-200">
              <div>
                <h2 className="font-bold text-slate-900">
                  Disbursement History
                  <span className="text-sm font-medium text-slate-500 ml-1">
                    (Latest 50 Transactions)
                  </span>
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-500">
                  Every cash voucher is assigned a tamper-evident sequence
                  number
                </span>

                <span className="hidden lg:inline-flex px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">
                  ₹{totalDisbursed.toLocaleString("en-IN")} Disbursed
                </span>
              </div>
            </div>

            {/* Table */}

            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[1050px] border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-900">
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase">
                      Voucher #
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase">
                      Date & Time
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase">
                      Labourer Name
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase">
                      Payment Mode
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-bold uppercase">
                      Amount Disbursed
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase">
                      Reference / Receipt
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-bold uppercase">
                      Voucher Print
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paymentHistory.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-slate-200 hover:bg-slate-50 transition"
                    >
                      {/* Voucher */}

                      <td className="px-5 py-4">
                        <span className="font-bold text-slate-800">
                          {payment.voucherNo}
                        </span>
                      </td>

                      {/* Date */}

                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-700">
                          {payment.dateTime}
                        </span>
                      </td>

                      {/* Labour */}

                      <td className="px-5 py-4">
                        <div>
                          <p className="font-bold text-slate-900">
                            {payment.labourer}
                          </p>

                          <p className="text-xs text-slate-500">
                            {payment.labourId}
                          </p>
                        </div>
                      </td>

                      {/* Mode */}

                      <td className="px-5 py-4">
                        <span className="inline-flex px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-semibold whitespace-nowrap">
                          {payment.paymentMode}
                        </span>
                      </td>

                      {/* Amount */}

                      <td className="px-5 py-4 text-right">
                        <span className="font-bold text-emerald-600">
                          ₹{payment.amount.toLocaleString("en-IN")}
                        </span>
                      </td>

                      {/* Reference */}

                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-600">
                          {payment.reference}
                        </span>
                      </td>

                      {/* Print */}

                      <td className="px-5 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleViewPaySlip(payment.labourId)}
                          className="text-sm font-bold text-orange-600 hover:text-orange-700 hover:underline cursor-pointer"
                        >
                          Print →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="w-full lg:w-6/7 mb-10 min-h-[300px] flex items-center justify-center bg-white border border-dashed border-slate-300 rounded-xl">
            <div className="text-center px-5">
              <div className="text-4xl mb-3">💳</div>

              <h2 className="text-lg font-bold text-slate-800">
                No Disbursement Records
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                No wage payments have been recorded for{" "}
                <span className="font-semibold">
                  {currentSite?.title || "this site"}
                </span>
                .
              </p>
            </div>
          </div>
        )}
      </div>

      {/* PAY WAGE MODAL */}

      <PayWage
        isOpen={isPayWageOpen}
        onClose={() => setIsPayWageOpen(false)}
        labourData={attendenceData}
        selectedLabourId={selectedLabourId}
      />

      {/* PAY SLIP MODAL */}

      <PaySlipModal
        isOpen={isPaySlipOpen}
        onClose={() => setIsPaySlipOpen(false)}
        worker={selectedWorker}
        settlement={settlement}
      />
    </>
  );
};

export default PaymentAndLeadger;
