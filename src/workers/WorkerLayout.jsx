import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import WorkerHeader from "../components/WorkerHeader";

import WorkerDashboard from "./WorkerDashboard";
import Footer from "../contructor/Footer";

const WorkerLayout = () => {
  return (
    <>
      <div >
        <WorkerHeader />
        <WorkerDashboard />
        <Outlet />

        <Footer />
      </div>
    </>
  );
};

export default WorkerLayout;
