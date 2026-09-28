import React from "react";
import { useOutletContext } from "react-router-dom";
import ManageSitesCard from "../cards/ManageSitesCard";
import { sitesData } from "../assets/admin";

const SitesDirectory = () => {
  const { setIsSiteOpen } = useOutletContext();
  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-4 bg-gray-50">
      <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 border border-gray-200 bg-white rounded-lg shadow-sm p-3">
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-xl font-bold text-black">
            Registered Construction Infrastructure Projects
          </h1>

          <p className="text-xs text-gray-400 mt-1">
            Define site boundaries, budget escrow allocations, and
            non-negotiable statutory minimum daily wage floors.
          </p>
        </div>

        {/* add new contructor button */}
        <div className="w-full lg:w-auto flex items-center justify-center">
          <button
            onClick={() => setIsSiteOpen(true)}
            type="submit"
            className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 rounded-md text-xs font-bold text-white transition-colors duration-200 cursor-pointer"
          >
            <span className="text-base leading-none">+</span>
            <span>Register New Site</span>
          </button>
        </div>
      </div>
      {/* Sites overview */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 items-center justify-center mt-4 gap-2">
        {sitesData.map((site) => (
          <div key={site.id}>
            <ManageSitesCard
              siteId={site.siteId}
              location={site.location}
              status={site.status}
              title={site.title}
              agency={site.agency}
              fund={site.fund}
              minWage={site.minWage}
              labourWorkforce={site.labourWorkforce}
              totalWorker={site.totalWorker}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SitesDirectory;
