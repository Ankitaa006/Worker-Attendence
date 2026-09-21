import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import PageHeader from "./PageHeader";
import Footer from "./Footer";
import EnrollAuthModel from "./EnrollAuthModel";
import PayWage from "./PayWage";

const ContractorLayout = () => {
  const [activeSiteId, setActiveSiteId] = useState(1);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [isPayWageOpen, setIsPayWageOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen">
        <Header activeSiteId={activeSiteId} setActiveSiteId={setActiveSiteId} />

        <div className="pt-[72px]">
          <PageHeader />

          <Outlet context={{ activeSiteId, setIsAuthOpen }} />
        </div>
        <Footer />
      </div>

      <EnrollAuthModel
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <PayWage isOpen={isPayWageOpen} onClose={() => setIsPayWageOpen(false)} />
    </>
  );
};

export default ContractorLayout;
