import React from "react";

const WageCalCard = ({
  title,
  calc,
  desc,
  comment,
  icon,
  payNow,
  col,
  colBg,
  colIcon,
  textCal,
}) => {
  return (
    <div className="w-full min-h-[180px] flex flex-row items-start justify-between bg-white border border-slate-200 rounded-xl p-6 gap-4 shadow-sm">
      <div className="flex flex-col items-start justify-center">
        <h1 className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
          {title}
        </h1>

        {calc && (
          <span
            className={`text-3xl font-extrabold ${
              textCal || "text-slate-900"
            } mt-1`}
          >
            {calc}
          </span>
        )}

        <p className="text-xs text-slate-500 mt-1 font-hindi">
          {desc}
        </p>

        <p
          className={`mt-3 flex items-center text-xs ${
            col || "text-slate-500"
          } font-medium`}
        >
          {comment}
        </p>
      </div>

      <div className="flex flex-col items-center justify-between p-1 gap-6">
        <span
          className={`flex items-center justify-center ${
            colBg || "bg-slate-50"
          } ${
            colIcon || "text-slate-400"
          } w-14 h-14 rounded-xl`}
        >
          {icon}
        </span>

        {payNow && (
          <button className="text-red-600 font-semibold hover:underline text-sm cursor-pointer">
            {payNow}
          </button>
        )}
      </div>
    </div>
  );
};

export default WageCalCard;