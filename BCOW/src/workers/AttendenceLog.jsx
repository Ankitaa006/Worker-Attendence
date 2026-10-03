import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApiData from "../utils/useApiData";

const AttendenceLog = () => {
  const navigate = useNavigate();
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const monthKey = `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}`;
  const { data: attendanceResponse, loading, error } = useApiData(`/worker/attendance?month=${monthKey}`);
  const { data: profile } = useApiData("/worker/profile");
  const dailyWage = Number(profile?.dailyWage || 0);
  const overtimeRate = dailyWage / 8;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const shortMonthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const daysInMonth = useMemo(() => {
    return new Date(selectedYear, selectedMonth + 1, 0).getDate();
  }, [selectedMonth, selectedYear]);

  const firstDayOffset = useMemo(() => {
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();

    return firstDay === 0 ? 6 : firstDay - 1;
  }, [selectedMonth, selectedYear]);

  const attendanceData = useMemo(() => {
    const entries = attendanceResponse?.data;
    if (!Array.isArray(entries)) return {};
    return entries.reduce((result, record) => {
      const date = new Date(record.date);
      const status = record.status === "present"
        ? "P"
        : record.status === "half-day"
          ? "H"
          : record.status === "absent"
            ? "A"
            : null;
      if (date.getFullYear() === selectedYear && date.getMonth() === selectedMonth) {
        result[date.getDate()] = { status, overtime: Number(record.overtimeHours || 0) };
      }
      return result;
    }, {});
  }, [attendanceResponse, selectedMonth, selectedYear]);

  const getAttendance = (day) => {
    return (
      attendanceData[day] || {
        status: null,
        overtime: 0,
      }
    );
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "P":
        return {
          block: "bg-emerald-500 border-emerald-500 text-white",
          text: "P",
        };

      case "H":
        return {
          block: "bg-amber-400 border-amber-400 text-slate-900",
          text: "H",
        };

      case "A":
        return {
          block: "bg-rose-500 border-rose-500 text-white",
          text: "A",
        };

      default:
        return {
          block: "bg-slate-100 border-slate-200 text-slate-400",
          text: "–",
        };
    }
  };

  const selectedAttendance = getAttendance(selectedDay);

  const selectedStatus = selectedAttendance.status || "Not Marked";

  const selectedOvertime = selectedAttendance.overtime || 0;

  let selectedBaseWage = 0;

  if (selectedAttendance.status === "P") {
    selectedBaseWage = dailyWage;
  }

  if (selectedAttendance.status === "H") {
    selectedBaseWage = dailyWage / 2;
  }

  if (selectedAttendance.status === "A") {
    selectedBaseWage = 0;
  }

  const selectedOvertimeAmount = selectedOvertime * overtimeRate;

  const selectedEarned = selectedBaseWage + selectedOvertimeAmount;

  const selectedDateText = new Date(
    selectedYear,
    selectedMonth,
    selectedDay,
  ).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const handleMonthChange = (event) => {
    const newMonth = Number(event.target.value);

    setSelectedMonth(newMonth);
    setSelectedDay(1);
  };

  const handleYearChange = (event) => {
    const newYear = Number(event.target.value);

    if (!newYear) return;

    setSelectedYear(newYear);

    setSelectedDay(1);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-2">
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        {error && <p role="alert" className="mb-3 text-sm text-red-700">{error}</p>}
        {loading && <p className="mb-3 text-sm text-slate-500">Loading attendance records...</p>}
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 lg:flex-row lg:items-start lg:justify-between">
          {/* TITLE */}

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
                Daily Attendance Punch Record
              </h1>
            </div>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Verified daily by site supervisor using biometric/digital muster
              roll.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none transition focus:border-slate-500 sm:px-3 sm:py-2 sm:text-sm"
            >
              {monthNames.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={selectedYear}
              min="1900"
              max="2100"
              onChange={handleYearChange}
              className="w-20 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none transition focus:border-slate-500 sm:w-24 sm:px-3 sm:py-2 sm:text-sm"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
          {/* PRESENT */}

          <div className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-700 sm:px-3 sm:text-xs">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

            <span>P = Full Day</span>
          </div>

          {/* HALF */}

          <div className="flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-[10px] font-semibold text-amber-700 sm:px-3 sm:text-xs">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />

            <span>H = Half Day</span>
          </div>

          {/* ABSENT */}

          <div className="flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-[10px] font-semibold text-rose-700 sm:px-3 sm:text-xs">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />

            <span>A = Absent</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-7 gap-1.5 sm:gap-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-[9px] font-bold text-slate-400 sm:text-[11px]"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-7 gap-1.5 sm:gap-2">
          {Array.from({
            length: firstDayOffset,
          }).map((_, index) => (
            <div key={`empty-${index}`} className="h-[58px] sm:h-[64px]" />
          ))}

          {Array.from({
            length: daysInMonth,
          }).map((_, index) => {
            const day = index + 1;

            const attendance = getAttendance(day);

            const statusStyle = getStatusStyle(attendance.status);

            const isSelected = selectedDay === day;

            return (
              <button
                type="button"
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`
                  relative
                  h-[58px]
                  sm:h-[64px]
                  rounded-lg
                  border
                  px-1
                  py-1
                  text-center
                  transition-all
                  duration-150
                  hover:-translate-y-0.5
                  hover:shadow-sm
                  ${statusStyle.block}
                  ${isSelected ? "ring-2 ring-slate-400 ring-offset-1" : ""}
                `}
              >
                {/* DATE */}
                <div
                  className={`
                    text-[9px]
                    sm:text-[10px]
                    font-semibold
                    ${attendance.status ? "text-white/90" : "text-slate-400"}
                  `}
                >
                  {day} {shortMonthNames[selectedMonth]}
                </div>
                {/* OT BADGE */}
                {attendance.overtime > 0 && (
                  <span className="absolute right-1 top-1 rounded-full bg-indigo-700 px-1 py-0.5 text-[7px] font-bold leading-none text-white sm:text-[8px]">
                    +{attendance.overtime}OT
                  </span>
                )}
                {/* STATUS */}
                <div
                  className={`
                    mt-1
                    text-sm
                    font-bold
                    sm:text-base
                    ${attendance.status ? "text-white" : "text-slate-400"}
                  `}
                >
                  {statusStyle.text}
                </div>
              </button>
            );
          })}
        </div>

        {/* SELECTED DATE DETAILS */}
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4 lg:flex-row lg:items-center lg:justify-between">
          {/* DATE INFORMATION */}

          <div>
            <p className="text-xs font-semibold text-slate-500 sm:text-sm">
              Selected Date Punch Details:
            </p>

            <p className="mt-1 text-xs font-bold text-slate-900 sm:text-sm">
              {selectedDateText}
              <span className="mx-1.5 text-slate-400">•</span>
              Status:{" "}
              {selectedStatus === "P" && <span>Present (Full Day)</span>}
              {selectedStatus === "H" && <span>Half Day</span>}
              {selectedStatus === "A" && <span>Absent</span>}
              {selectedStatus === "Not Marked" && (
                <span className="text-slate-500">Not Marked</span>
              )}
              {selectedOvertime > 0 && <> + {selectedOvertime}h Overtime</>}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap items-center gap-2">
            {/* EARNED */}
            <div className="rounded-lg bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700 sm:px-4 sm:py-2 sm:text-sm">
              Earned: ₹{selectedEarned.toFixed(2)}
            </div>
            {/* DISPUTE */}
            <button
              type="button"
              onClick={() => {
                const disputeDate = new Date(
                  selectedYear,
                  selectedMonth,
                  selectedDay,
                );

                const formattedDate = [
                  disputeDate.getFullYear(),
                  String(disputeDate.getMonth() + 1).padStart(2, "0"),
                  String(disputeDate.getDate()).padStart(2, "0"),
                ].join("-");

                navigate("/worker/report-issue", {
                  state: {
                    incidentDate: formattedDate,
                  },
                });
              }}
              className="cursor-pointer rounded-lg bg-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-300 sm:px-4 sm:py-2 sm:text-sm"
            >
              Dispute This Day
            </button>
          </div>
        </div>
        {/* MONTH INFORMATION      */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-slate-400 sm:text-xs">
          <span>
            {monthNames[selectedMonth]} {selectedYear}
          </span>
          <span>•</span>
          <span>{daysInMonth} calendar days</span>
        </div>
      </div>
    </div>
  );
};

export default AttendenceLog;
