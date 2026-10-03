import React from "react";
import { pagesLink } from "../assets/contractor";
import { NavLink } from "react-router-dom";

const PageHeader = () => {
  return (
    <div className="fixed  left-0 w-full z-50 bg-slate-950  px-4 sm:px-6 lg:px-8 ">
      <div className="w-full grid grid-cols-5 gap-2 lg:px-10 py-2.5">
        {pagesLink.map((link) => (
          <NavLink
            to={link.route}
            key={link.id}
            className={({ isActive }) =>
              `flex items-center justify-center gap-2 px-3.5 py-2.5 transition-all duration-200 ${
                isActive
                  ? "rounded-lg text-white bg-slate-800"
                  : "text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg"
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
  );
};

export default PageHeader;
