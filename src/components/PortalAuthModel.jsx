import React, { useEffect, useState } from "react";
import { roles } from "../assets/workforceManagement";

const PortalAuthModel = ({ isOpen, onClose }) => {
  const [role, setRole] = useState("admin");
  const [authMode, setAuthMode] = useState("signin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [deptName, setDeptName] = useState("");
  const [officeName, setOfficeName] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setAuthMode("signin");

    setEmail(document[selectedRole].email);
    setPassword(document[selectedRole].password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-[#071126]/60 px-4 py-6 backdrop-blur-[4px] sm:px-6"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-[440px] overflow-hidden rounded-[28px] border border-white/80 bg-white"
        onClick={(event) => event.stopPropagation()}
      >
        {/* close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-8 w-8 items-center justify-center"
        >
          x
        </button>

        {/* header */}
        <div className="px-5 pb-4 pt-10 text-center sm:px-10">
          <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 bg-gradient-to-br from-amber-400 via-orange-400 to-blue-600 text-xl">
            🔐
          </div>

          <h2 className="text-xl font-black text-slate-900">Portal Access</h2>
          <p className="text-xs text-slate-500 font-hindi">
            Labor and Employment Compliance Secure Portal
          </p>
        </div>

        {/* role selector */}
        <div className="mx-5 rounded-2xl bg-slate-100 p-1 sm:mx-10">
          <div className="grid grid-cols-3 gap-1">
            {roles.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleRoleChange(item.id)}
                className={`rounded-xl px-2 py-3 text-xs font-bold transition sm:text-sm ${
                  role === item.id
                    ? "bg-white text-[#0b1429] shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <span className="mr-1">{item.icon}</span>

                {item.label}
              </button>
            ))}
          </div>
        </div>

        {role === "admin" ? (
          <>
            {/* login and signup selection */}
            <div className="mx-5 rounded-2xl bg-slate-100 p-1.5 sm:mx-10 mt-4">
              <div className="grid grid-cols-2 gap-1">
                {/* signin */}
                <button
                  type="button"
                  onClick={() => setAuthMode("signin")}
                  className={`rounded-xl p-2 text-sm font-bold transition ${
                    authMode === "signin"
                      ? "bg-white text-[#0b1429] shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Sign In
                </button>
                {/* signup */}

                <button
                  type="button"
                  onClick={() => setAuthMode("signup")}
                  className={`rounded-xl px-1.5 py-1 text-sm font-bold transition ${
                    authMode === "signup"
                      ? "bg-white text-[#0b1429] shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        <form onSubmit={handleSubmit} className="px-5 pb-7 pt-5 sm:px-10">
          {authMode == "signin" ? (
            <>
              <div>
                <label className="mb-2 block text-sm font-bold text-[#12264b]">
                  {role === "admin"
                    ? "Official Email / Admin ID"
                    : role === "contractor"
                      ? "Scoped Contractor User ID:"
                      : "Worker ID or Mobile:"}

                  <span className="ml-1 text-slate-500">*</span>
                </label>

                <input
                  type="text"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={
                    role === "admin"
                      ? "e.g. audit.dlc@labour.gov.in"
                      : role === "contractor"
                        ? "Enter contractor email"
                        : "Enter labourer ID"
                  }
                  className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="mt-2">
                <label className="mb-2 block text-sm font-bold text-[#12264b]">
                  {role === "admin"
                    ? "Admin Password:"
                    : role === "contractor"
                      ? "Password:"
                      : "Access PIN "}
                  <span className="ml-1 text-slate-500">*</span>
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={
                    role === "admin"
                      ? "*****"
                      : role === "contractor"
                        ? "****"
                        : "4291"
                  }
                  className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />

                {role === "contractor" ? (
                  <>
                    <div className=" bg-amber-50 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-800 gap-2 mt-4">
                      <strong>Note for Contractors: </strong>
                      Your User ID and Password are generated by your
                      construction project Admin.
                    </div>
                  </>
                ) : role === "labourer" ? (
                  <>
                    <div className=" bg-amber-50 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-800 gap-2 mt-4">
                      <strong>Workers Login:</strong> Worker ID given by
                      contractor (e.g. SHR-101) or insert mobile number.
                      Password is the last 4 digits of your base.
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow text-xs mt-4 cursor-pointer"
                >
                  Sign In to Portal
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="mb-2 block text-sm font-bold text-[#12264b]">
                  Organization / Dept Name:
                  <span className="ml-1 text-slate-500">*</span>
                </label>

                <input
                  type="text"
                  value={deptName}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="e.g. Delihi Labour Commissionerate"
                  className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <div className="mt-2">
                <label className="mb-2 block text-sm font-bold text-[#12264b]">
                  Contact Officer Name:
                  <span className="ml-1 text-slate-500">*</span>
                </label>

                <input
                  type="text"
                  value={officeName}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="e.g. Sh. D.K. Sharma"
                  className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <div className="mt-2">
                <label className="mb-2 block text-sm font-bold text-[#12264b]">
                  Official Email / Admin ID:
                  <span className="ml-1 text-slate-500">*</span>
                </label>

                <input
                  type="text"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="e.g. audit.dlc@lbour.gov.in"
                  className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <div className="mt-2">
                <label className="mb-2 block text-sm font-bold text-[#12264b]">
                  Admin Password:
                  <span className="ml-1 text-slate-500">*</span>
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="*******"
                  className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <button
                  type="submit"
                  className="w-full py-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-xl transition shadow text-sm mt-4 cursor-pointer"
                >
                  Register and Create Admin Org
                </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default PortalAuthModel;
