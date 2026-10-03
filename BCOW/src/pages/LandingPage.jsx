import React, { useState } from "react";
import Header from "../components/Header";
import LabourStandard from "../components/LabourStandard";
import Navbar from "../components/Navbar";
import PortalAuthModal from "../components/PortalAuthModel";

const LandingPage = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center bg-gray-200 gap-4">
        <Header setIsAuthOpen={setIsAuthOpen} />
        <LabourStandard />
        <Navbar />
      </div>

      <PortalAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </>
  );
};

export default LandingPage;
