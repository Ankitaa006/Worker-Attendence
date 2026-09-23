import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

/* =========================================================
   PDF STYLES
========================================================= */

const pdfStyles = StyleSheet.create({
  page: {
    padding: 28,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#0f172a",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 10,
    marginBottom: 14,
  },

  headerTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },

  headerSub: {
    marginTop: 3,
    fontSize: 8,
    color: "#64748b",
  },

  voucherNo: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#334155",
  },

  centerHeader: {
    alignItems: "center",
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 9,
    color: "#64748b",
  },

  project: {
    marginTop: 5,
    fontSize: 9,
    fontWeight: "bold",
  },

  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#0f172a",
    marginVertical: 10,
  },

  workerBox: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#f8fafc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },

  workerColumn: {
    flex: 1,
  },

  label: {
    fontSize: 7,
    color: "#64748b",
    marginBottom: 3,
  },

  value: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 7,
  },

  smallValue: {
    fontSize: 7,
    color: "#64748b",
  },

  table: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e2e8f0",
    fontWeight: "bold",
  },

  tableRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#cbd5e1",
  },

  description: {
    width: "40%",
    padding: 7,
  },

  units: {
    width: "20%",
    padding: 7,
    textAlign: "center",
    borderLeftWidth: 1,
    borderLeftColor: "#cbd5e1",
  },

  rate: {
    width: "20%",
    padding: 7,
    textAlign: "right",
    borderLeftWidth: 1,
    borderLeftColor: "#cbd5e1",
  },

  amount: {
    width: "20%",
    padding: 7,
    textAlign: "right",
    borderLeftWidth: 1,
    borderLeftColor: "#cbd5e1",
  },

  bold: {
    fontWeight: "bold",
  },

  grossRow: {
    flexDirection: "row",
    backgroundColor: "#f8fafc",
    borderTopWidth: 1,
    borderTopColor: "#cbd5e1",
  },

  totalLabel: {
    width: "80%",
    padding: 7,
    textAlign: "right",
    fontWeight: "bold",
  },

  totalAmount: {
    width: "20%",
    padding: 7,
    textAlign: "right",
    fontWeight: "bold",
    borderLeftWidth: 1,
    borderLeftColor: "#cbd5e1",
  },

  deductionRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#cbd5e1",
  },

  deductionLabel: {
    width: "80%",
    padding: 7,
    textAlign: "right",
    color: "#dc2626",
  },

  deductionAmount: {
    width: "20%",
    padding: 7,
    textAlign: "right",
    color: "#dc2626",
    borderLeftWidth: 1,
    borderLeftColor: "#cbd5e1",
  },

  paidLabel: {
    width: "80%",
    padding: 7,
    textAlign: "right",
    color: "#475569",
  },

  paidAmount: {
    width: "20%",
    padding: 7,
    textAlign: "right",
    color: "#475569",
    borderLeftWidth: 1,
    borderLeftColor: "#cbd5e1",
  },

  netRow: {
    flexDirection: "row",
    backgroundColor: "#fffbeb",
    borderTopWidth: 1,
    borderTopColor: "#cbd5e1",
  },

  netLabel: {
    width: "80%",
    padding: 9,
    textAlign: "right",
    fontSize: 10,
    fontWeight: "bold",
  },

  netAmount: {
    width: "20%",
    padding: 9,
    textAlign: "right",
    fontSize: 11,
    fontWeight: "bold",
    color: "#c2410c",
    borderLeftWidth: 1,
    borderLeftColor: "#cbd5e1",
  },

  signatures: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 60,
  },

  signatureBox: {
    width: "43%",
    textAlign: "center",
  },

  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#94a3b8",
    borderStyle: "dashed",
    marginBottom: 6,
  },

  signatureText: {
    fontSize: 8,
    fontWeight: "bold",
  },

  signatureSub: {
    fontSize: 7,
    color: "#64748b",
    marginTop: 3,
  },
});

/* =========================================================
   PDF DOCUMENT
========================================================= */

const WageSlipPDF = ({
  workerName,
  workerId,
  tradeRole,
  wageRate,
  regularDays,
  overtimeHours,
  overtimeRate,
  priorAdvance,
  alreadyPaid,
  projectName,
  voucherNo,
}) => {
  const regularAmount = regularDays * wageRate;

  const overtimeAmount = overtimeHours * overtimeRate;

  const grossAmount = regularAmount + overtimeAmount;

  const netAmount = grossAmount - priorAdvance - alreadyPaid;

  return (
    <Document>
      <Page size="A4" style={pdfStyles}>
        {/* Header */}

        <View style={pdfStyles.header}>
          <View>
            <Text style={pdfStyles.headerTitle}>Official Labour Wage Slip</Text>

            <Text style={pdfStyles.headerSub}>Form XIV - Rule 78(2)(b)</Text>
          </View>

          <Text style={pdfStyles.voucherNo}>VOUCHER NO: {voucherNo}</Text>
        </View>

        {/* Main Heading */}

        <View style={pdfStyles.centerHeader}>
          <Text style={pdfStyles.title}>
            CONTRACT LABOUR WAGE SLIP & SETTLEMENT
          </Text>

          <Text style={pdfStyles.subtitle}>
            Daily wage and payment settlement receipt
          </Text>

          <Text style={pdfStyles.project}>{projectName}</Text>
        </View>

        <View style={pdfStyles.line} />

        {/* Worker Information */}

        <View style={pdfStyles.workerBox}>
          <View style={pdfStyles.workerColumn}>
            <Text style={pdfStyles.label}>Labourer Name</Text>

            <Text style={pdfStyles.value}>{workerName}</Text>

            <Text style={pdfStyles.label}>Labour ID</Text>

            <Text style={pdfStyles.smallValue}>{workerId}</Text>
          </View>

          <View style={pdfStyles.workerColumn}>
            <Text style={pdfStyles.label}>Trade Category</Text>

            <Text style={pdfStyles.value}>{tradeRole}</Text>

            <Text style={pdfStyles.label}>Daily Wage Rate</Text>

            <Text style={pdfStyles.value}>₹{wageRate.toFixed(2)} / day</Text>
          </View>
        </View>

        {/* Earnings Table */}

        <View style={pdfStyles.table}>
          {/* Header */}

          <View style={pdfStyles.tableHeader}>
            <Text style={pdfStyles.description}>DESCRIPTION</Text>

            <Text style={pdfStyles.units}>UNITS / HOURS</Text>

            <Text style={pdfStyles.rate}>UNIT RATE</Text>

            <Text style={pdfStyles.amount}>AMOUNT (₹)</Text>
          </View>

          {/* Regular */}

          <View style={pdfStyles.tableRow}>
            <Text style={pdfStyles.description}>Regular Days Worked</Text>

            <Text style={[pdfStyles.units, pdfStyles.bold]}>
              {regularDays} Days
            </Text>

            <Text style={pdfStyles.rate}>₹{wageRate.toFixed(2)}</Text>

            <Text style={[pdfStyles.amount, pdfStyles.bold]}>
              ₹{regularAmount.toFixed(2)}
            </Text>
          </View>

          {/* Overtime */}

          <View style={pdfStyles.tableRow}>
            <Text style={pdfStyles.description}>Overtime Extra Hours</Text>

            <Text style={[pdfStyles.units, pdfStyles.bold]}>
              {overtimeHours} Hours
            </Text>

            <Text style={pdfStyles.rate}>₹{overtimeRate.toFixed(2)}/hr</Text>

            <Text style={[pdfStyles.amount, pdfStyles.bold]}>
              ₹{overtimeAmount.toFixed(2)}
            </Text>
          </View>

          {/* Gross */}

          <View style={pdfStyles.grossRow}>
            <Text style={pdfStyles.totalLabel}>Gross Total Wages</Text>

            <Text style={pdfStyles.totalAmount}>₹{grossAmount.toFixed(2)}</Text>
          </View>

          {/* Advance */}

          <View style={pdfStyles.deductionRow}>
            <Text style={pdfStyles.deductionLabel}>
              Less: Prior Cash Advance
            </Text>

            <Text style={pdfStyles.deductionAmount}>
              -₹{priorAdvance.toFixed(2)}
            </Text>
          </View>

          {/* Already Paid */}

          <View style={pdfStyles.deductionRow}>
            <Text style={pdfStyles.paidLabel}>Less: Already Paid</Text>

            <Text style={pdfStyles.paidAmount}>-₹{alreadyPaid.toFixed(2)}</Text>
          </View>

          {/* Net */}

          <View style={pdfStyles.netRow}>
            <Text style={pdfStyles.netLabel}>Net Payable Balance</Text>

            <Text style={pdfStyles.netAmount}>₹{netAmount.toFixed(2)}</Text>
          </View>
        </View>

        {/* Signatures */}

        <View style={pdfStyles.signatures}>
          <View style={pdfStyles.signatureBox}>
            <View style={pdfStyles.signatureLine} />

            <Text style={pdfStyles.signatureText}>
              Signature / Thumb of Labourer
            </Text>

            <Text style={pdfStyles.signatureSub}>
              Worker signature / thumb impression
            </Text>
          </View>

          <View style={pdfStyles.signatureBox}>
            <View style={pdfStyles.signatureLine} />

            <Text style={pdfStyles.signatureText}>
              Contractor / Site Incharge Seal
            </Text>

            <Text style={pdfStyles.signatureSub}>
              Authorized contractor signature
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

/* =========================================================
   WAGE SLIP COMPONENT
========================================================= */

const WageSlip = () => {
  /* ---------------------------------------------------------
     Worker Data
  --------------------------------------------------------- */

  const workerName = "Ramesh Kumar";

  const workerId = "SHR-101";

  const tradeRole = "Skilled Mason";

  const wageRate = 850;

  const regularDays = 7.5;

  const overtimeHours = 2;

  /*
    Screenshot shows ₹106.25/hour.
  */

  const overtimeRate = 106.25;

  const priorAdvance = 500;

  const alreadyPaid = 3000;

  const projectName =
    "Metro Corridor Line 3 (Tower B) • Apex Buildcon Infrastructures Ltd";

  const voucherNo = `VCH-${workerId}-0926`;

  /* ---------------------------------------------------------
     Calculations
  --------------------------------------------------------- */

  const regularAmount = regularDays * wageRate;

  const overtimeAmount = overtimeHours * overtimeRate;

  const grossAmount = regularAmount + overtimeAmount;

  const netAmount = grossAmount - priorAdvance - alreadyPaid;

  return (
    <div className="w-full max-w-6xl flex flex-col lg:flex-row items-start justify-between mx-auto px-4 py-2 gap-3.5">
      {/* =====================================================
          WAGE SLIP
      ===================================================== */}

      <div className="w-full flex items-center justify-center overflow-y-auto  px-4 py-6">
        <div
          className="relative my-auto w-full  overflow-hidden rounded-xl bg-white shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          {/* =================================================
              VOUCHER CONTENT
          ================================================= */}

          <div className="max-h-[90vh] overflow-y-auto px-5 py-4 sm:px-6">
            {/* Header */}

            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-sm font-bold tracking-wide text-slate-900">
                  Official Labour Wage Slip
                </h2>

                <p className="text-xs text-slate-500">
                  नियम 78(2)(b) के अंतर्गत दैनिक वेतन पर्ची
                </p>
              </div>

              {/* Voucher Number */}

              <div className="rounded bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                VOUCHER NO: {voucherNo}
              </div>
            </div>

            {/* Close */}

            <button
              type="button"
              className="absolute right-3 top-3 cursor-pointer text-xl font-bold text-slate-400 hover:text-slate-700"
            >
              ×
            </button>

            {/* Main Heading */}

            <div className="mt-5 text-center">
              <p className="mb-1 text-xs font-semibold tracking-widest text-slate-600">
                FORM XIV - [RULE 78(2)(B)]
              </p>

              <h1 className="text-sm font-bold text-slate-900 sm:text-2xl">
                CONTRACT LABOUR WAGE SLIP & SETTLEMENT
              </h1>

              <p className="text-xs text-slate-500 sm:text-sm">
               daily wage workers payment receipt
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-900">
                {projectName}
              </p>
            </div>

            {/* Divider */}

            <div className="my-4 border-b-2 border-slate-900" />

            {/* =================================================
                WORKER INFORMATION
            ================================================= */}

            <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-4">
              {/* Name */}

              <div>
                <p className="text-xs text-slate-600">Labourer Name / नाम:</p>

                <p className="font-bold text-slate-900">{workerName}</p>

                <p className="mt-2 text-[10px] text-slate-500">
                  ID: {workerId}
                </p>
              </div>

              {/* Trade */}

              <div>
                <p className="text-xs text-slate-600">Trade Category / पद:</p>

                <p className="font-bold text-slate-900">{tradeRole}</p>

                <p className="text-[10px] text-slate-500">Skilld MAson</p>
              </div>

              {/* Wage */}

              <div>
                <p className="text-xs text-slate-600">Wage Rate :</p>

                <p className="font-bold text-slate-900">
                  ₹{wageRate.toFixed(2)} / day
                </p>

                <p className="text-[10px] text-emerald-600">
                  Compliant with Minimum Wage
                </p>
              </div>

              {/* Aadhaar */}

              <div>
                <p className="text-xs text-slate-600">Aadhaar (Ref):</p>

                <p className="font-bold tracking-widest text-slate-900">
                  •••• •••• 4912
                </p>

                <p className="text-[10px] text-slate-500">Identity Verified</p>
              </div>
            </div>

            {/* =================================================
                EARNINGS TABLE
            ================================================= */}

            <div className="mt-6 overflow-hidden border border-slate-300 text-xs sm:text-sm">
              {/* Header */}

              <div className="grid grid-cols-[2fr_1fr_1fr_1fr] bg-slate-100 font-bold text-slate-900">
                <div className="border-r border-slate-300 p-2">
                  DESCRIPTION 
                </div>

                <div className="border-r border-slate-300 p-2 text-center">
                  UNITS / HOURS
                </div>

                <div className="border-r border-slate-300 p-2 text-right">
                  UNIT RATE
                </div>

                <div className="p-2 text-right">AMOUNT (₹)</div>
              </div>

              {/* Regular */}

              <div className="grid grid-cols-[2fr_1fr_1fr_1fr] border-t border-slate-300">
                <div className="border-r border-slate-300 p-2">
                  Regular Days Worked
                  <span className="text-[10px]"> (Attendance Day)</span>
                </div>

                <div className="border-r border-slate-300 p-2 text-center font-bold">
                  {regularDays} Days
                </div>

                <div className="border-r border-slate-300 p-2 text-right">
                  ₹{wageRate.toFixed(2)}
                </div>

                <div className="p-2 text-right font-bold">
                  ₹{regularAmount.toFixed(2)}
                </div>
              </div>

              {/* Overtime */}

              <div className="grid grid-cols-[2fr_1fr_1fr_1fr] border-t border-slate-300">
                <div className="border-r border-slate-300 p-2">
                  Overtime Extra Hours
                  <span className="text-[10px]"> (Over Time)</span>
                </div>

                <div className="border-r border-slate-300 p-2 text-center font-bold">
                  {overtimeHours} Hours
                </div>

                <div className="border-r border-slate-300 p-2 text-right">
                  ₹{overtimeRate.toFixed(2)}/hr
                </div>

                <div className="p-2 text-right font-bold">
                  ₹{overtimeAmount.toFixed(2)}
                </div>
              </div>

              {/* Gross */}

              <div className="grid grid-cols-[3fr_1fr] border-t border-slate-300 bg-slate-50">
                <div className="p-2 text-right font-bold">
                  Gross Total Wages :
                </div>

                <div className="p-2 text-right font-bold">
                  ₹{grossAmount.toFixed(2)}
                </div>
              </div>

              {/* Advance */}

              <div className="grid grid-cols-[3fr_1fr] border-t border-slate-300">
                <div className="p-2 text-right text-red-600">
                  Less: Prior Cash Advance :
                </div>

                <div className="p-2 text-right text-red-600">
                  -₹{priorAdvance.toFixed(2)}
                </div>
              </div>

              {/* Already Paid */}

              <div className="grid grid-cols-[3fr_1fr] border-t border-slate-300">
                <div className="p-2 text-right text-slate-600">
                  Less: Already Paid :
                </div>

                <div className="p-2 text-right text-slate-600">
                  -₹{alreadyPaid.toFixed(2)}
                </div>
              </div>

              {/* Net */}

              <div className="grid grid-cols-[3fr_1fr] border-t border-slate-300 bg-amber-50">
                <div className="p-3 text-right text-base font-bold">
                  Net Payable Balance :
                </div>

                <div className="p-3 text-right text-base font-bold text-orange-700">
                  ₹{netAmount.toFixed(2)}
                </div>
              </div>
            </div>

            {/* =================================================
                FOOTER / SIGNATURES
            ================================================= */}

            <div className="mt-16 grid grid-cols-2 gap-8">
              {/* Worker */}

              <div className="text-center">
                <div className="border-b border-dashed border-slate-400 pb-2 text-sm italic text-slate-400">
                  Workperson Thumb Impression 
                </div>

                <p className="mt-2 text-sm font-bold">
                  Signature or Thumb of Labourer
                </p>

                <p className="text-xs text-slate-500">
                  (Thumb Impression/Signature of Worker)
                </p>
              </div>

              {/* Contractor */}

              <div className="text-center">
                <div className="border-b border-dashed border-slate-400 pb-2 text-sm font-semibold text-emerald-600">
                  DIGITALLY STAMPED • BOCW OK
                </div>

                <p className="mt-2 text-sm font-bold">
                  Contractor & Site Incharge Seal
                </p>

                <p className="text-xs text-slate-500">
                  (Contractor/Site Incharge Signature)
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              FOOTER BUTTONS
          ================================================= */}

          <div className="flex flex-row items-center justify-end gap-3 border-t border-slate-200 bg-white px-5 py-3 sm:px-6">
            <button
              type="button"
              className="cursor-pointer rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Close
            </button>

            {/* PDF DOWNLOAD */}

            <PDFDownloadLink
              document={
                <WageSlipPDF
                  workerName={workerName}
                  workerId={workerId}
                  tradeRole={tradeRole}
                  wageRate={wageRate}
                  regularDays={regularDays}
                  overtimeHours={overtimeHours}
                  overtimeRate={overtimeRate}
                  priorAdvance={priorAdvance}
                  alreadyPaid={alreadyPaid}
                  projectName={projectName}
                  voucherNo={voucherNo}
                />
              }
              fileName={`${workerId}-Wage-Slip.pdf`}
              className="rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-bold text-white shadow transition hover:bg-orange-700"
            >
              {({ loading }) =>
                loading ? "Generating PDF..." : "🖨️ Print / Download Slip"
              }
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WageSlip;
