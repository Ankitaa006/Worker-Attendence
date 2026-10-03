import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#0f172a",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  formText: {
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 0.8,
  },

  voucherId: {
    fontSize: 9,
    backgroundColor: "#f1f5f9",
    padding: 5,
    fontWeight: "bold",
  },

  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 10,
    marginTop: 3,
    color: "#475569",
  },

  company: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 7,
  },

  divider: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#0f172a",
    marginTop: 14,
    marginBottom: 20,
  },

  workerBox: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#dbe4ee",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  workerColumn: {
    width: "48%",
  },

  label: {
    color: "#475569",
    fontSize: 9,
    marginBottom: 3,
  },

  value: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 10,
  },

  table: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e2e8f0",
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
  },

  description: {
    width: "43%",
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: "#cbd5e1",
  },

  units: {
    width: "20%",
    padding: 8,
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#cbd5e1",
  },

  rate: {
    width: "17%",
    padding: 8,
    textAlign: "right",
    borderRightWidth: 1,
    borderRightColor: "#cbd5e1",
  },

  amount: {
    width: "20%",
    padding: 8,
    textAlign: "right",
  },

  headerText: {
    fontWeight: "bold",
    fontSize: 9,
  },

  rowText: {
    fontSize: 9,
  },

  boldText: {
    fontSize: 9,
    fontWeight: "bold",
  },

  grossRow: {
    flexDirection: "row",
    backgroundColor: "#f8fafc",
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
  },

  grossLabel: {
    width: "80%",
    padding: 8,
    textAlign: "right",
    fontWeight: "bold",
  },

  grossAmount: {
    width: "20%",
    padding: 8,
    textAlign: "right",
    fontWeight: "bold",
  },

  deductionLabel: {
    width: "80%",
    padding: 8,
    textAlign: "right",
    color: "#dc2626",
  },

  deductionAmount: {
    width: "20%",
    padding: 8,
    textAlign: "right",
    color: "#dc2626",
  },

  settledLabel: {
    width: "80%",
    padding: 8,
    textAlign: "right",
    color: "#475569",
  },

  settledAmount: {
    width: "20%",
    padding: 8,
    textAlign: "right",
    color: "#475569",
  },

  netRow: {
    flexDirection: "row",
    backgroundColor: "#fffbeb",
  },

  netLabel: {
    width: "80%",
    padding: 10,
    textAlign: "right",
    fontSize: 11,
    fontWeight: "bold",
  },

  netAmount: {
    width: "20%",
    padding: 10,
    textAlign: "right",
    fontSize: 11,
    fontWeight: "bold",
    color: "#c2410c",
  },

  signatures: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 80,
  },

  signatureBox: {
    width: "46%",
    textAlign: "center",
  },

  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#94a3b8",
    marginBottom: 8,
  },

  signatureTitle: {
    fontSize: 9,
    fontWeight: "bold",
  },

  signatureSub: {
    fontSize: 8,
    color: "#64748b",
    marginTop: 3,
  },

  footer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: "#dbe4ee",
    paddingTop: 10,
    textAlign: "center",
    fontSize: 8,
    color: "#64748b",
  },
});

const money = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const PaySlipPDF = ({ worker, settlement }) => {
  const regularDays = Number(settlement?.regularDays || 0);
  const dailyWage = Number(worker?.dailyWage || 0);

  const overtimeHours = Number(settlement?.overtimeHours || 0);
  const overtimeRate = Number(
    settlement?.overtimeRate || dailyWage / 8
  );

  const regularAmount = regularDays * dailyWage;
  const overtimeAmount = overtimeHours * overtimeRate;

  const grossAmount = regularAmount + overtimeAmount;

  const priorAdvance = Number(settlement?.priorAdvance || 0);
  const settledPayments = Number(settlement?.settledPayments || 0);

  const netAmount =
    grossAmount - priorAdvance - settledPayments;

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Header */}

        <View style={styles.topRow}>
          <Text style={styles.formText}>
            FORM XIV - [RULE 78(2)(B)]
          </Text>

          <Text style={styles.voucherId}>
            {settlement?.voucherId || "—"}
          </Text>
        </View>

        <Text style={styles.title}>
          LABOUR WAGE SLIP & SETTLEMENT VOUCHER
        </Text>

        <Text style={styles.subtitle}>
          Daily Wage Payment & Settlement Receipt
        </Text>

        <Text style={styles.company}>
          {settlement?.siteName || "—"} &nbsp;
          | &nbsp;
          {settlement?.contractorName || "—"}
        </Text>

        <View style={styles.divider} />

        {/* Worker Information */}

        <View style={styles.workerBox}>
          <View style={styles.workerColumn}>
            <Text style={styles.label}>
              Labourer Name / Name:
            </Text>

            <Text style={styles.value}>
              {worker?.labourer}
            </Text>

            <Text style={styles.label}>
              ID:
            </Text>

            <Text style={styles.value}>
              {worker?.laburId}
            </Text>

            <Text style={styles.label}>
              Pay Period / Period:
            </Text>

            <Text style={styles.value}>
              {settlement?.payPeriod || "—"}
            </Text>
          </View>

          <View style={styles.workerColumn}>
            <Text style={styles.label}>
              Trade Role / Role:
            </Text>

            <Text style={styles.value}>
              {worker?.category}
            </Text>

            <Text style={styles.label}>
              Aadhaar (Ref):
            </Text>

            <Text style={styles.value}>
              •••• •••• {worker?.aadharNo?.slice(-4)}
            </Text>

            <Text style={styles.label}>
              Daily Wage Rate / Daily Rate:
            </Text>

            <Text style={styles.value}>
              {money(dailyWage)} / day
            </Text>
          </View>
        </View>

        {/* Earnings Table */}

        <View style={styles.table}>

          {/* Header */}

          <View style={styles.tableHeader}>
            <View style={styles.description}>
              <Text style={styles.headerText}>
                Description
              </Text>
            </View>

            <View style={styles.units}>
              <Text style={styles.headerText}>
                Units / Hours
              </Text>
            </View>

            <View style={styles.rate}>
              <Text style={styles.headerText}>
                Rate
              </Text>
            </View>

            <View style={styles.amount}>
              <Text style={styles.headerText}>
                Amount (₹)
              </Text>
            </View>
          </View>

          {/* Regular Days */}

          <View style={styles.tableRow}>
            <View style={styles.description}>
              <Text style={styles.rowText}>
                Regular Days Worked
              </Text>
            </View>

            <View style={styles.units}>
              <Text style={styles.boldText}>
                {regularDays} Days
              </Text>
            </View>

            <View style={styles.rate}>
              <Text style={styles.rowText}>
                {money(dailyWage)}
              </Text>
            </View>

            <View style={styles.amount}>
              <Text style={styles.boldText}>
                {money(regularAmount)}
              </Text>
            </View>
          </View>

          {/* Overtime */}

          <View style={styles.tableRow}>
            <View style={styles.description}>
              <Text style={styles.rowText}>
                Overtime Extra Hours
              </Text>
            </View>

            <View style={styles.units}>
              <Text style={styles.boldText}>
                {overtimeHours} Hours
              </Text>
            </View>

            <View style={styles.rate}>
              <Text style={styles.rowText}>
                {money(overtimeRate)}/hr
              </Text>
            </View>

            <View style={styles.amount}>
              <Text style={styles.boldText}>
                {money(overtimeAmount)}
              </Text>
            </View>
          </View>

          {/* Gross */}

          <View style={styles.grossRow}>
            <Text style={styles.grossLabel}>
              Gross Earnings:
            </Text>

            <Text style={styles.grossAmount}>
              {money(grossAmount)}
            </Text>
          </View>

          {/* Prior Advance */}

          <View style={styles.tableRow}>
            <Text style={styles.deductionLabel}>
              Less: Prior Cash Advances:
            </Text>

            <Text style={styles.deductionAmount}>
              -{money(priorAdvance)}
            </Text>
          </View>

          {/* Settled Payments */}

          <View style={styles.tableRow}>
            <Text style={styles.settledLabel}>
              Less: Settled Payments:
            </Text>

            <Text style={styles.settledAmount}>
              -{money(settledPayments)}
            </Text>
          </View>

          {/* Net */}

          <View style={styles.netRow}>
            <Text style={styles.netLabel}>
              Net Settled Amount / Net Payable:
            </Text>

            <Text style={styles.netAmount}>
              {money(netAmount)}
            </Text>
          </View>

        </View>

        {/* Signatures */}

        <View style={styles.signatures}>

          <View style={styles.signatureBox}>
            <Text style={styles.signatureLine}>
              &nbsp;
            </Text>

            <Text style={styles.signatureTitle}>
              Signature / Thumb of Workperson
            </Text>

            <Text style={styles.signatureSub}>
              Worker Signature
            </Text>
          </View>

          <View style={styles.signatureBox}>
            <Text style={styles.signatureLine}>
              {settlement?.contractorName || "—"}
            </Text>

            <Text style={styles.signatureTitle}>
              Contractor / Site Engineer Seal
            </Text>

            <Text style={styles.signatureSub}>
              Authorized Signature
            </Text>
          </View>

        </View>

        <Text style={styles.footer}>
          This document is a computer-generated labour wage
          settlement voucher.
        </Text>

      </Page>
    </Document>
  );
};

export default PaySlipPDF;