import React from "react";

const WorkerHeader = () => {
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* left side */}
        <div className="flex items-center space-x-3">
          {/* logo */}
          <span className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-2xl shadow-inner border border-amber-300/40">
            👷‍♂️
          </span>
          {/* title and desc and tag */}
          <div className="flex items-center space-x-2">
            <div className="flex flex-col">
              <h1 className="font-extrabold text-xl tracking-tight">
                Shramik
                <span className="text-amber-400">Setu</span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 ml-1 rounded-full uppercase">
                  Worker Portal
                </span>
              </h1>

              <p className="text-sm text-slate-400 font-hindi">
                Daily laborer attendance and wage portal
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default WorkerHeader;
