import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./contructor/Dashboard";
import MarkAttendence from "./contructor/MarkAttendence";
import LabourDirectory from "./contructor/LabourDirectory";
import WageCalculator from "./contructor/WageCalculator";
import PaymentAndLeadger from "./contructor/PaymentAndLeadger";
import ContractorLayout from "./contructor/ContractorLayout";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Contractor Route */}
        <Route path="/contractor" element={<ContractorLayout />}>
          <Route index path="dashboard" element={<Dashboard />} />
          <Route path="mark-attendence" element={<MarkAttendence />} />
          <Route path="labour-directory" element={<LabourDirectory />} />
          <Route path="wage-calculator" element={<WageCalculator />} />
          <Route path="payment-leadger" element={<PaymentAndLeadger />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
