import React, { useEffect, useState } from "react";

const PayWage = ({
  isOpen,
  onClose,
  labourData = [],
  selectedLabourId = "",
}) => {
  const [selectLabour, setSelectLabour] = useState(selectedLabourId);
  const [amtDisburse, setAmtDisburse] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [paymentNode, setPaymentNode] = useState("");

  const [accruedBalance, setAccruedBalance] = useState(1388);

  const selectedWorker = labourData.find(
    (worker) => worker.laburId === selectLabour,
  );

  useEffect(() => {
    if (selectedLabourId) {
      setSelectLabour(selectedLabourId);
    }
  }, [selectedLabourId]);

  useEffect(() => {
    if (selectedWorker) {
      // You can replace this with your actual pending/accrued
      // balance calculation when the backend is connected.
      setAccruedBalance(1388);

      setAmtDisburse("1388");
    }
  }, [selectedWorker]);

  const handleLabourChange = (event) => {
    const labourId = event.target.value;

    setSelectLabour(labourId);

    const worker = labourData.find((item) => item.laburId === labourId);

    if (worker) {
      setAccruedBalance(1388);
      setAmtDisburse("1388");
    }
  };

  const handlePayFullDue = () => {
    setAmtDisburse(String(accruedBalance));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectLabour) {
      alert("Please select a labourer.");
      return;
    }

    if (!amtDisburse || Number(amtDisburse) <= 0) {
      alert("Please enter a valid disbursement amount.");
      return;
    }

    if (Number(amtDisburse) > Number(accruedBalance)) {
      alert("Disbursement amount cannot exceed the current balance due.");
      return;
    }

    const paymentData = {
      labourId: selectLabour,
      labourer: selectedWorker?.labourer,
      amount: Number(amtDisburse),
      paymentMode,
      notes: paymentNode,
    };

    console.log("Wage Settlement:", paymentData);

    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-[#071126]/60 px-4 py-6 backdrop-blur-[4px] sm:px-6"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-[640px] overflow-hidden rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-2xl sm:px-7"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-slate-200 pb-4">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-md text-2xl font-bold text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
          >
            ×
          </button>

          <h1 className="text-xl font-bold text-slate-900">
            Record Wage Settlement Disbursal
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          {/* Select Labour */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              Select Labourer : <span className="text-red-500">*</span>
            </label>

            <select
              value={selectLabour}
              onChange={handleLabourChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            >
              <option value="">Select Labourer</option>

              {labourData.map((worker) => (
                <option key={worker.laburId} value={worker.laburId}>
                  {worker.labourer} ({worker.category}) - ₹{worker.dailyWage}/d
                </option>
              ))}
            </select>
          </div>

          {/* Current Balance */}
          <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-4">
            <div className="flex flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-orange-800">
                  Current Accrued Balance Due:
                </p>

                <p className="mt-0.5 text-xl font-bold text-orange-700">
                  ₹{Number(accruedBalance).toLocaleString("en-IN")}
                </p>
              </div>

              <button
                type="button"
                onClick={handlePayFullDue}
                className="shrink-0 rounded-md bg-orange-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-orange-700 cursor-pointer"
              >
                Pay Full Due
              </button>
            </div>
          </div>

          {/* Amount + Payment Mode */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Amount */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">
                Amount to Disburse (₹): <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                min="1"
                max={accruedBalance}
                value={amtDisburse}
                onChange={(event) => setAmtDisburse(event.target.value)}
                placeholder="Enter amount"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Payment Mode */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900">
                Payment Mode: <span className="text-red-500">*</span>
              </label>

              <select
                value={paymentMode}
                onChange={(event) => setPaymentMode(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              >
                <option value="Cash">Cash</option>

                <option value="UPI">UPI</option>

                <option value="Bank Transfer">Bank Transfer (बैंक)</option>
              </select>
            </div>
          </div>

          {/* Payment Notes */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              Payment Notes / Reference No:
            </label>

            <input
              type="text"
              value={paymentNode}
              onChange={(event) => setPaymentNode(event.target.value)}
              placeholder="e.g. Weekly settlement - Saturday payout"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-row items-center justify-end gap-2 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 cursor-pointer"
            >
              Confirm & Generate Receipt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PayWage;
