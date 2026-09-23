import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import WorkerHeader from "../components/WorkerHeader";

import WorkerDashboard from "./WorkerDashboard";
import Footer from "../contructor/Footer";
import PageHeader from './PageHeader';

const WorkerLayout = () => {
  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <WorkerHeader />
        <WorkerDashboard />
        <PageHeader />
        <Outlet />

        <Footer />
      </div>
    </>
  );
};

export default WorkerLayout;
