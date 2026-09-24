import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import AdminMain from "./AdminMain";
import AdminDetailsCard from "../cards/AdminDetailsCard";
import AdminCards from "./AdminCards";

const AdminLayout = () => {
  return (
    <>
      <div className="">
        <Header />
        <AdminMain />
        <AdminCards />

        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
