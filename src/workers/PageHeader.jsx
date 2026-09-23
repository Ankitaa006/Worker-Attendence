import React from "react";
import { navlinkItem } from "../assets/worker";
import { NavLink } from "react-router-dom";

const PageHeader = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-2">
      <div className="w-full flex bg-slate-200 rounded-xl border border-slate-300/80 text-xs lg:text-sm font-bold">
        <div className="w-full grid grid-cols-4 items-center justify-evenly p-1">
          {navlinkItem.map((link) => (
            <NavLink
              to={link.route}
              key={link.id}
              className={({ isActive }) =>
                `flex items-center justify-center gap-2 px-3.5 py-2.5 transition-all duration-200 ${
                  isActive
                    ? "rounded-lg text-slate-900 bg-white"
                    : "text-slate-400 hover:text-slate-700 rounded-lg"
                }`
              }
            >
              <span className="shrink-0">{link.icon}</span>

              <h1 className="text-sm sm:text-base font-medium text-center leading-tight">
                {link.title}
              </h1>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;