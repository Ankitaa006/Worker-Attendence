import React from "react";
import WorkerDashboardCard from "../cards/WorkerDashboardCard";
import { workerCard } from "../assets/worker";

const WorkerDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-3  flex flex-col items-center justify-between gap-2">
      {/* about section */}
      <div className="w-full flex flex-row  items-start justify-between bg-slate-900 rounded-xl shadow-xl px-6 pt-6 pb-6 lg:mx-3 my-3.5">
        {/* left */}
        <div className="flex flex-row items-center justify-start gap-3 text-white">
          <span className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg border-2 border-amber-300/60">
            <h1 className="uppercase">rk</h1>
          </span>
          {/* name and details */}
          <div className="flex flex-col lg:flex-col items-start justify-start">
            {/* name */}
            <div className="flex lg:flex-col items-center lg:items-start justify-start gap-4 lg:gap-1">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                Ramesh Kumar
              </h1>
              <span className="w-24 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold px-2 py-0.5 rounded-md">
                Skilled Mason
              </span>
            </div>
            {/* id , aadhat, phone */}
            <div>
              {/* id and add */}
              <div className="flex flex-row gap-4 items-center justify-center">
                {/* id */}
                <p className="text-xs text-slate-300 mt-1 flex items-center space-x-2 flex-wrap">
                  <span>ID:</span>{" "}
                  <strong className="font-mono text-white"> SHR-101</strong>
                </p>
                {/* aa */}
                <p className="text-xs text-slate-300 mt-1 flex items-center space-x-2 flex-wrap">
                  <span>Aadhaar:</span>{" "}
                  <strong className="font-mono text-white">
                    .... .... .... 4912
                  </strong>
                </p>
              </div>
              {/* phone */}
              <p className="text-xs text-slate-300 mt-1 flex items-center space-x-2 flex-wrap">
                <span>Phone:</span>{" "}
                <strong className="font-mono text-white">9810142981</strong>
              </p>
            </div>
            {/* active project */}
            <div className="text-[11px] text-slate-400 mt-1 flex items-center space-x-1">
              <h3>🏗️ Active Project:</h3>
              <p className="font-semibold text-amber-300">
                Metro Corridor Line 3 (Tower B)
              </p>
              <p className="text-slate-500">by Apex Buildcon</p>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 text-right self-stretch sm:self-auto flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-end">
          <span className="text-slate-400 text-xs font-semibold">
            Your Daily Wage Rate
          </span>
          <span className="text-2xl font-black text-amber-400">₹850 / day</span>
          <span className="text-[10px] text-emerald-400 font-medium">
            BOCW State Certified Minimum
          </span>
        </div>
      </div>

      {/* Card section */}
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
        {workerCard.map((worker) => (
          <WorkerDashboardCard
            title={worker.title}
            logo={worker.logo}
            main={worker.main}
            desc={worker.desc}
            type={worker.type}
            autoText={worker.autoText}
            mainBG={worker.mainBG}
            titleBG={worker.titleBG}
            logoBG={worker.logoBG}
            logoText={worker.logoText}
            mainFont={worker.mainFont}
            mainText={worker.mainText}
            descText={worker.descText}
            typeBorder={worker.typeBorder}
            autoTextCol={worker.autoTextCol}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkerDashboard;
