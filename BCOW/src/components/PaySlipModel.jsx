import { PDFDownloadLink } from "@react-pdf/renderer";
import PaySlipPDF from "./PaySlipPDF";

const money = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const PaySlipModal = ({
  isOpen,
  onClose,
  worker,
  settlement,
}) => {
  if (!isOpen || !worker) {
    return null;
  }

  const regularDays = Number(settlement?.regularDays || 0);
  const dailyWage = Number(worker.dailyWage || 0);

  const overtimeHours = Number(settlement?.overtimeHours || 0);

  const overtimeRate = Number(
    settlement?.overtimeRate || dailyWage / 8
  );

  const regularAmount = regularDays * dailyWage;

  const overtimeAmount =
    overtimeHours * overtimeRate;

  const grossAmount =
    regularAmount + overtimeAmount;

  const priorAdvance =
    Number(settlement?.priorAdvance || 0);

  const settledPayments =
    Number(settlement?.settledPayments || 0);

  const netAmount =
    grossAmount -
    priorAdvance -
    settledPayments;

  const voucherId = settlement?.voucherId || "—";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-[#071126]/60 px-4 py-6 backdrop-blur-[4px]"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-[700px] overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >

        {/* Voucher */}

        <div className="max-h-[90vh] overflow-y-auto px-5 py-4 sm:px-6 ">

          {/* Header */}

          <div className="flex items-start justify-between">
            <h2 className="text-sm font-bold tracking-wider text-slate-800">
              FORM XIV - [RULE 78(2)(B)]
            </h2>

            <div className="rounded bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">
              {voucherId}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 text-xl font-bold text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            ×
          </button>

          <div className="mt-3 text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              LABOUR WAGE SLIP & SETTLEMENT VOUCHER
            </h1>

            <p className="text-sm text-slate-500">
              Daily laborer wage slip and payment receipt
            </p>

            <p className="mt-2 text-sm font-semibold text-slate-900">
              {settlement?.siteName || "—"}
              {" | "}
              {settlement?.contractorName || "—"}
            </p>
          </div>

          <div className="my-4 border-b-2 border-slate-900" />

          {/* Worker Information */}

          <div className="grid grid-cols-1 gap-5 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">

            <div>
              <p className="text-sm text-slate-600">
                Labourer Name:
              </p>

              <p className="font-bold text-slate-900">
                {worker.labourer}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                ID: {worker.laburId}
              </p>

              <p className="mt-4 text-sm text-slate-600">
                Pay Period:
              </p>

              <p className="font-bold text-slate-900">
                {settlement?.payPeriod || "—"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-600">
                Trade Role:
              </p>

              <p className="font-bold text-slate-900">
                {worker.category}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Aadhaar (Ref): •••• ••••{" "}
                {worker.aadharNo?.slice(-4)}
              </p>

              <p className="mt-4 text-sm text-slate-600">
                Daily Wage Rate 
              </p>

              <p className="font-bold text-slate-900">
                {money(dailyWage)} / day
              </p>
            </div>

          </div>

          {/* Earnings Table */}

          <div className="mt-6 overflow-hidden border border-slate-300 text-sm">

            {/* Header */}

            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] bg-slate-200 font-bold text-slate-900">

              <div className="border-r border-slate-300 p-2">
                Description 
              </div>

              <div className="border-r border-slate-300 p-2 text-center">
                Units / Hours
              </div>

              <div className="border-r border-slate-300 p-2 text-right">
                Rate
              </div>

              <div className="p-2 text-right">
                Amount (₹)
              </div>

            </div>

            {/* Regular */}

            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] border-t border-slate-300">

              <div className="border-r border-slate-300 p-2">
                Regular Days Worked 
              </div>

              <div className="border-r border-slate-300 p-2 text-center font-bold">
                {regularDays} Days
              </div>

              <div className="border-r border-slate-300 p-2 text-right">
                {money(dailyWage)}
              </div>

              <div className="p-2 text-right font-bold">
                {money(regularAmount)}
              </div>

            </div>

            {/* Overtime */}

            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] border-t border-slate-300">

              <div className="border-r border-slate-300 p-2">
                Overtime Extra Hours 
              </div>

              <div className="border-r border-slate-300 p-2 text-center font-bold">
                {overtimeHours} Hours
              </div>

              <div className="border-r border-slate-300 p-2 text-right">
                {money(overtimeRate)}/hr
              </div>

              <div className="p-2 text-right font-bold">
                {money(overtimeAmount)}
              </div>

            </div>

            {/* Gross */}

            <div className="grid grid-cols-[3fr_1fr] border-t border-slate-300 bg-slate-50">

              <div className="p-2 text-right font-bold">
                Gross Earnings 
              </div>

              <div className="p-2 text-right font-bold">
                {money(grossAmount)}
              </div>

            </div>

            {/* Advance */}

            <div className="grid grid-cols-[3fr_1fr] border-t border-slate-300">

              <div className="p-2 text-right text-red-600">
                Less: Prior Cash Advances 
              </div>

              <div className="p-2 text-right text-red-600">
                -{money(priorAdvance)}
              </div>

            </div>

            {/* Settled */}

            <div className="grid grid-cols-[3fr_1fr] border-t border-slate-300">

              <div className="p-2 text-right text-slate-600">
                Less: Settled Payments
              </div>

              <div className="p-2 text-right text-slate-600">
                -{money(settledPayments)}
              </div>

            </div>

            {/* Net */}

            <div className="grid grid-cols-[3fr_1fr] border-t border-slate-300 bg-amber-50">

              <div className="p-3 text-right text-base font-bold">
                Net Settled Amount
              </div>

              <div className="p-3 text-right text-base font-bold text-orange-700">
                {money(netAmount)}
              </div>

            </div>

          </div>

          {/* Signatures */}

          <div className="mt-16 grid grid-cols-2 gap-8">

            <div className="text-center">
              <div className="border-b border-dashed border-slate-400 pb-2 text-sm italic text-slate-400">
                Thumb Impression
              </div>

              <p className="mt-2 text-sm font-bold">
                Signature / Thumb of Workperson
              </p>

              <p className="text-xs text-slate-500">
                (Thumb mark/signature of the worker)
              </p>
            </div>

            <div className="text-center">
              <div className="border-b border-dashed border-slate-400 pb-2 text-sm font-semibold">
                {settlement?.contractorName || "—"}
              </div>

              <p className="mt-2 text-sm font-bold">
                Contractor / Site Engineer Seal
              </p>

              <p className="text-xs text-slate-500">
                (contractor or authorized signature)
              </p>
            </div>

          </div>

        </div>

        {/* Footer Buttons */}

        <div className="flex flex-row items-center justify-end gap-3 border-t border-slate-200 bg-white px-5 py-3 sm:px-6">

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 cursor-pointer"
          >
            Close 
          </button>

          <PDFDownloadLink
            document={
              <PaySlipPDF
                worker={worker}
                settlement={settlement}
              />
            }
            fileName={`${voucherId}.pdf`}
            className="rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-bold text-white shadow transition hover:bg-orange-700"
          >
            {({ loading }) =>
              loading
                ? "Generating PDF..."
                : "🖨️ Print Voucher / Slip"
            }
          </PDFDownloadLink>

        </div>

      </div>
    </div>
  );
};

export default PaySlipModal;