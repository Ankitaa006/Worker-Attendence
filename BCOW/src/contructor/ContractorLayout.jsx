import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import PageHeader from "./PageHeader";
import Footer from "./Footer";
import EnrollAuthModel from "./EnrollAuthModel";
import useApiData from "../utils/useApiData";

const ContractorLayout = () => {
  const [activeSiteId, setActiveSiteId] = useState("");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [workersRefresh, setWorkersRefresh] = useState(0);
  const { data: sitesData } = useApiData("/contractor/sites");
  const sites = Array.isArray(sitesData) ? sitesData : [];
  const { data: profile } = useApiData("/contractor/profile");

  const selectedSiteId = activeSiteId || sites[0]?._id || "";

  return (
    <>
      <div className="min-h-screen">
        <Header activeSiteId={selectedSiteId} setActiveSiteId={setActiveSiteId} sites={sites} profile={profile} />

        <div className="pt-[72px]">
          <PageHeader />

          <Outlet context={{ activeSiteId: selectedSiteId, setIsAuthOpen, workersRefresh }} />
        </div>
        <Footer />
      </div>

      <EnrollAuthModel
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        sites={sites}
        onRegistered={() => setWorkersRefresh((value) => value + 1)}
      />

    </>
  );
};

export default ContractorLayout;
