import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import AdminMain from "./AdminMain";
import AdminCards from "./AdminCards";
import ContructorRegistry from "./ContructorRegistry";
import SiteRegistry from "./SiteRegistry";

const AdminLayout = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSiteOpen, setIsSiteOpen] = useState(false);
  const [contractorRefresh, setContractorRefresh] = useState(0);
  const [siteRefresh, setSiteRefresh] = useState(0);
  return (
    <>
      <div className="bg-gray-50">
        <Header />
        <AdminMain />
        <AdminCards />

        <Outlet context={{ setIsAuthOpen, setIsSiteOpen, contractorRefresh, siteRefresh }} />
      </div>

      <ContructorRegistry
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onRegistered={() => setContractorRefresh((value) => value + 1)}
      />

      <SiteRegistry
        isOpen={isSiteOpen}
        onClose={() => setIsSiteOpen(false)}
        onRegistered={() => setSiteRefresh((value) => value + 1)}
      />
    </>
  );
};

export default AdminLayout;
