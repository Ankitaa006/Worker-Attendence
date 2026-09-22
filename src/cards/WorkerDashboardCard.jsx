import React from "react";

const WorkerDashboardCard = ({
  title,
  logo,
  main,
  desc,
  type,
  autoText,
  mainBG,
  titleBG,
  logoBG,
  logoText,
  mainFont,
  mainText,
  descText,
  typeBorder,
  autoTextCol
}) => {
  return (
    <div
      className={`w-[300x] bg-${mainBG} p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between`}
    >
      {/* upper */}
      <div className="flex items-center justify-between">
        <h1
          className={`text-xs font-bold text-${titleBG} uppercase tracking-wider`}
        >
          {title}
        </h1>
        <span
          className={`w-8 h-8 rounded-lg bg-${logoBG}-50 text-${logoText}-700 flex items-center justify-center font-bold text-sm`}
        >
          {logo}
        </span>
      </div>
      {/* middle section */}
      <div className="mt-2">
        <h1 className={`text-2xl sm:text-3xl font-${mainFont} text-${mainText}-900`}>
          {main}
        </h1>
        <p className={`text-xs text-${descText}-600 font-hindi font-medium mt-0.5`}>
          {desc}
        </p>
      </div>
      {/* Lower section */}
      <div className={`mt-2 pt-2 border-t border-${typeBorder}-100 text-[11px] text-slate-500 flex justify-between`}>
        <p>{type}</p>
        <p className={`font-bold text-${autoTextCol}-700`}>{autoText}</p>
      </div>
    </div>
  );
};

export default WorkerDashboardCard;
