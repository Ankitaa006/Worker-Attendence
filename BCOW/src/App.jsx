import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./contructor/Dashboard";
import MarkAttendence from "./contructor/MarkAttendence";
import LabourDirectory from "./contructor/LabourDirectory";
import WageCalculator from "./contructor/WageCalculator";
import PaymentAndLeadger from "./contructor/PaymentAndLeadger";
import ContractorLayout from "./contructor/ContractorLayout";
import WorkerLayout from "./workers/WorkerLayout";
import AttendenceLog from "./workers/AttendenceLog";
import ReportIsuue from "./workers/ReportIsuue";
import PaymentReceipts from "./workers/PaymentReceipts";
import WageSlip from "./workers/WageSlip";
import AdminLayout from "./admin/AdminLayout";
import ComplianceOverview from "./admin/ComplianceOverview";
import ContraDirectory from "./admin/ContraDirectory";
import DisputeInbox from "./admin/DisputeInbox";
import SitesDirectory from "./admin/SitesDirectory";
import FundCase from "./admin/FundCase";
import LabourAudit from "./admin/LabourAudit";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<ProtectedRoute roles={["contractor"]} />}>
          <Route path="/contractor" element={<ContractorLayout />}>
            <Route index path="dashboard" element={<Dashboard />} />
            <Route path="mark-attendence" element={<MarkAttendence />} />
            <Route path="labour-directory" element={<LabourDirectory />} />
            <Route path="wage-calculator" element={<WageCalculator />} />
            <Route path="payment-leadger" element={<PaymentAndLeadger />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute roles={["worker"]} />}>
          <Route path="/worker" element={<WorkerLayout />}>
            <Route index path="attendence-log" element={<AttendenceLog />} />
            <Route path="wage-slip" element={<WageSlip />} />
            <Route path="payment-receipt" element={<PaymentReceipts />} />
            <Route path="report-issue" element={<ReportIsuue />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute roles={["admin", "super_admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index path="compliance-overview" element={<ComplianceOverview />} />
            <Route path="contarctor-overview" element={<ContraDirectory />} />
            <Route path="dispute-inbox" element={<DisputeInbox />} />
            <Route path="sites-directory" element={<SitesDirectory />} />
            <Route path="funds-case" element={<FundCase />} />
            <Route path="labour-audit" element={<LabourAudit />} />
          </Route>
        </Route>
        
      </Routes>
    </div>
  );
};

export default App;
