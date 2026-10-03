import { GoDotFill } from "react-icons/go";
import useApiData from "../utils/useApiData";

const Header = () => {
  const { data } = useApiData("/admin/sites");
  const sites = Array.isArray(data) ? data : [];
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-slate-900">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-2">
        <div className="flex flex-row items-center lg:justify-evenly lg:mx-12 gap-2">
          {/* icon */}
          <div className="flex flex-row items-center justify-center my-2 gap-4">
            <span className="h-10 w-10 rounded-lg bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-inner border border-amber-300/30">
              👷
            </span>

            <div className="flex">
              <span className="flex flex-row text-xl font-bold tracking-tight text-white">
                Shramik <h1 className="text-amber-400">Setu</h1>
              </span>
            </div>

            <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-1 rounded-full font-medium border border-amber-500/30">
              Govt BOCW Compliant
            </span>
          </div>

          {/* Active Site */}
          <div className="hidden md:flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="text-xs text-slate-400">Active Site:</span>

            <select
              defaultValue=""
              className="bg-transparent text-sm font-medium text-amber-400 focus:outline-none cursor-pointer"
            >
              {sites.map((site) => (
                <option
                  key={site._id}
                  value={site._id}
                  className="bg-slate-800 text-white"
                >
                  {site.project}
                </option>
              ))}
            </select>
          </div>

          {/* active role */}
          <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs font-medium">
            <h1 className="px-2.5 py-1 mx-2 my-1 rounded transition-colors bg-amber-700 text-white font-semibold shadow-sm">
              Admin
            </h1>
          </div>

          {/* project name */}
          <div className="flex items-center space-x-2 bg-slate-800/90 pl-3 pr-2 py-1 rounded-lg border border-slate-700">
            <GoDotFill color="yellow" />

            <span>
              <h1 className="text-[11px] font-bold text-white leading-tight max-w-[140px] sm:max-w-[180px] truncate">
                {user.name || user.email || "Admin"}
              </h1>

              <h2 className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">
                Administrator
              </h2>
            </span>
          </div>

          {/* date */}
          <div className="hidden xl:flex items-center space-x-1.5 bg-slate-800/60 px-3 py-1.5 rounded-md border border-slate-700 text-xs font-semibold text-slate-300">
            <span>Today: {currentDate}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
