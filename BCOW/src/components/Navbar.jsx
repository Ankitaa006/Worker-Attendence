import React from "react";

const Navbar = () => {
  return (
    <footer className="w-full flex lg:flex-row items-center justify-evenly bg-slate-900 px-1.5 py-3.5 gap-6">
      <p className="text-white font-bold text-[16px]">ShramikSetu</p>
      <p className="text-[12px] text-status-text1-small">Daily Wage Labour Attendance & Statutory Payment Platform</p>
      <div className="flex flex-row items-start justify-center gap-1.5">
        <span>
          <p className="text-[12px] text-status-text1-small">BOCW Welfare Board 1996</p>
          <p className="text-[12px] text-status-text1-small">Minimum Wages Act 1948</p>
        </span>
        <p className="text-[12px] text-status-text1-small">Payment of Wages Act 1936</p>
      </div>
      <p className="text-[12px] text-status-text1-small">Frustrator Software Solution • Complete Multi-Tier Role Portal</p>
    </footer>
  );
};

export default Navbar;
