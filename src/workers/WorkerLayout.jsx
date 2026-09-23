import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import WorkerHeader from "../components/WorkerHeader";

import WorkerDashboard from "./WorkerDashboard";
import PageHeader from "./PageHeader";

const WorkerLayout = () => {
  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <WorkerHeader />
        <WorkerDashboard />
        <PageHeader />
        <Outlet />
      </div>
    </>
  );
};

export default WorkerLayout;
