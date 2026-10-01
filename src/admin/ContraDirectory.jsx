import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import AdminSitesCard from "../cards/AdminSitesCard";
import { contractorAgencyDetails } from "../assets/admin";

const ContraDirectory = () => {
  const { setIsAuthOpen } = useOutletContext();
  const [contractors, setContractors] = useState(contractorAgencyDetails);

  const manageSuspend = (id) => {
    setContractors((prev) =>
      prev.map((contractor) =>
        contractor.id === id
          ? {
              ...contractor,
              status: contractor.status === "Active" ? "Suspended" : "Active",
              alert:
                contractor.status === "Active"
                  ? alert("The Contractor is Suspended")
                  : alert("The Contractor is Activated"),
            }
          : contractor,
      ),
    );
  };

  const handleCopyLogin = async (id) => {
    const contractor = contractorAgencyDetails.find((item) => item.id === id);

    if (!contractor) return;

    const loginContent = `User ID: ${contractor.userId}
    Password: ${contractor.password}`;
    console.log(loginContent);

    try {
      await navigator.clipboard.writeText(loginContent);

      alert("Login credentials copied successfully!");
    } catch (error) {
      console.error("Failed to copy login credentials:", error);
    }
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-4">
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 border border-gray-200 bg-white rounded-lg shadow-sm p-3">
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-xl font-bold text-black">
              Registered Contractors & Agency Registry
            </h1>

            <p className="text-xs text-gray-400 mt-1">
              Manage licensed builders, statutory registration credentials,
              contact persons, and wage compliance status.
            </p>
          </div>

          {/* add new contructor button */}
          <div className="w-full lg:w-auto flex items-center justify-center">
            <button
              onClick={() => setIsAuthOpen(true)}
              type="submit"
              // onClick={}
              className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 rounded-md text-xs font-bold text-white transition-colors duration-200 cursor-pointer"
            >
              <span className="text-base leading-none">+</span>
              <span>Add New Contructor</span>
            </button>
          </div>

          {/* Sites overview */}
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 items-center justify-center mt-4 gap-2">
          {contractors.map((con) => (
            <AdminSitesCard
              key={con.id}
              status={con.status}
              compliance={con.compliance}
              title={con.title}
              contact={con.contact}
              liscence={con.liscence}
              phone={con.phone}
              site={con.site}
              workforce={con.workforce}
              onSuspend={() => manageSuspend(con.id)}
              handleCopyLogin={() => handleCopyLogin(con.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ContraDirectory;
