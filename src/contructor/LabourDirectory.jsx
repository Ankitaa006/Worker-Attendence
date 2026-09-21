import React, { useState } from "react";
import WorkerViewCard from "../cards/WorkerViewCard";
import { useOutletContext } from "react-router-dom";
import {
  siteDashboardData,
  tradeRoleData,
  wageCalculation,
} from "../assets/contractor";
import PayWage from "./PayWage";
import PaySlipModal from "../components/PaySlipModel";

const LabourDirectory = () => {
  const { activeSiteId, setIsAuthOpen } = useOutletContext();

  const [isPaySlipOpen, setIsPaySlipOpen] = useState(false);
  const [isPayWageOpen, setIsPayWageOpen] = useState(false);
  const [selectedLabourId, setSelectedLabourId] = useState("");

  const currentSiteData = siteDashboardData[activeSiteId];

  const attendenceData = currentSiteData?.attendencePunch || [];

  const selectedWorker = attendenceData.find(
    (worker) => worker.laburId === selectedLabourId,
  );

  const handlePayWage = (labourId) => {
    setSelectedLabourId(labourId);
    setIsPayWageOpen(true);
  };

  const handleViewPaySlip = (labourId) => {
    setSelectedLabourId(labourId);
    setIsPaySlipOpen(true);
  };

  const settlement = {
    voucherId: selectedWorker
      ? `VCH-${selectedWorker.laburId}-0926`
      : "VCH-0000-0926",

    siteName: "Metro Corridor Line 3 (Tower B)",

    contractorName: "Apex Buildcon Infrastructures Ltd",

    payPeriod: "01 Sep 2026 to 08 Sep 2026",

    regularDays: 5.5,

    overtimeHours: 2,

    overtimeRate: selectedWorker
      ? Number(selectedWorker.dailyWage || 0) / 8
      : 0,

    priorAdvance: 500,

    settledPayments: 3000,
  };

  return (
    <>
      <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 lg:pt-16">
        {/* labour directory and skill registry */}

        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 lg:gap-8 my-6 lg:my-8 border border-gray-300 rounded-lg bg-white p-5 sm:p-6">
          {/* tile */}
          <div className="w-full px-1 sm:px-2">
            <h1 className="text-xl sm:text-2xl text-black font-bold">
              Labour Directory & Skill Registry
            </h1>

            <p className="text-sm text-gray-600 mt-1 max-w-3xl leading-5">
              Manage workforce profiles, statutory trade skill levels, daily
              wage contracts, and bank/UPI references.
            </p>
          </div>

          {/* add labour */}
          <div className="w-full lg:w-auto lg:min-w-44">
            <button
              onClick={() => setIsAuthOpen(true)}
              className="w-full bg-amber-600 text-sm text-white font-semibold px-4 py-2 rounded-md hover:bg-amber-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span className="font-bold mr-1">+</span>
              Register New Labour
            </button>
          </div>
        </div>

        {/* Worker Section */}
        <div className="w-full max-w-7xl">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {attendenceData.map((worker) => {
              const roleDta = tradeRoleData.find(
                (item) => item.tradeRole === worker.category,
              );

              const wage = roleDta ? roleDta.wage : "0";

              const aadhar = worker.aadharNo?.slice(-4) || "0000";

              return (
                <WorkerViewCard
                  key={worker.laburId}
                  workerName={worker.labourer}
                  workerId={worker.laburId}
                  trade={worker.category}
                  mobile={worker.mobileNo}
                  aadhar={aadhar}
                  wage={worker.dailyWage}
                  onPayWage={() => handlePayWage(worker.laburId)}
                  onViewPaySlip={() => handleViewPaySlip(worker.laburId)}
                />
              );
            })}
          </div>
        </div>
      </div>

      <PayWage
        isOpen={isPayWageOpen}
        onClose={() => setIsPayWageOpen(false)}
        labourData={attendenceData}
        selectedLabourId={selectedLabourId}
      />

      <PaySlipModal
        isOpen={isPaySlipOpen}
        onClose={() => setIsPaySlipOpen(false)}
        worker={selectedWorker}
        settlement={settlement}
      />
    </>
  );
};

export default LabourDirectory;
