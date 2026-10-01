import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import AdminMain from "./AdminMain";
import AdminDetailsCard from "../cards/AdminDetailsCard";
import AdminCards from "./AdminCards";
import ContructorRegistry from "./contructorRegistry";
import SiteRegistry from "./SiteRegistry";

const AdminLayout = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSiteOpen, setIsSiteOpen] = useState(false);
  return (
    <>
      <div className="bg-gray-50">
        <Header />
        <AdminMain />
        <AdminCards />

        <Outlet context={{ setIsAuthOpen, setIsSiteOpen }} />
      </div>

      <ContructorRegistry
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <SiteRegistry isOpen={isSiteOpen} onClose={() => setIsSiteOpen(false)} />
    </>
  );
};

export default AdminLayout;
