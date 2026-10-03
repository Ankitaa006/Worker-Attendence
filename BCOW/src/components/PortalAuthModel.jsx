import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const roles = [
  { id: "admin", label: "Admin", icon: "⚖️" },
  { id: "contractor", label: "Contractor", icon: "👷" },
  { id: "worker", label: "Worker", icon: "👨‍🔧" },
];

const PortalAuthModel = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState("admin");
  const [authMode, setAuthMode] = useState("signin");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const changeRole = (nextRole) => {
    setRole(nextRole);
    setAuthMode("signin");
    setIdentifier("");
    setPassword("");
    setError("");
  };

  const changeMode = (nextMode) => {
    setAuthMode(nextMode);
    setIdentifier("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      let response;
      if (role === "admin" && authMode === "signup") {
        response = await api.post("/auth/admin/signup", {
          organizationName: organizationName.trim(),
          contactName: contactName.trim(),
          officialMail: email.trim().toLowerCase(),
          password,
        });
      } else if (role === "admin") {
        response = await api.post("/auth/admin/login", {
          officialMail: identifier.trim().toLowerCase(),
          password,
        });
      } else if (role === "contractor") {
        response = await api.post("/auth/contractor/login", {
          loginId: identifier.trim(),
          password,
        });
      } else {
        response = await api.post("/auth/worker/login", {
          workerId: identifier.trim(),
          accessPin: password,
        });
      }

      const { token, data } = response.data;
      if (!token) throw new Error("The server did not return an access token.");

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("role", role);

      onClose();
      navigate(
        role === "admin"
          ? "/admin/compliance-overview"
          : role === "contractor"
            ? "/contractor/dashboard"
            : "/worker/attendence-log",
      );
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          "Unable to authenticate. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSignup = role === "admin" && authMode === "signup";
  const identifierLabel =
    role === "admin"
      ? "Official Email"
      : role === "contractor"
        ? "Contractor Login ID"
        : "Worker ID";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-[#071126]/60 px-4 py-6 backdrop-blur-[4px] sm:px-6"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-[440px] overflow-hidden rounded-[28px] border border-white/80 bg-white"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sign-in dialog"
          className="absolute right-5 top-5 z-20 flex h-8 w-8 items-center justify-center"
        >
          ×
        </button>

        <div className="px-5 pb-4 pt-10 text-center sm:px-10">
          <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 bg-gradient-to-br from-amber-400 via-orange-400 to-blue-600 text-xl">
            🔐
          </div>
          <h2 className="text-xl font-black text-slate-900">Portal Access</h2>
          <p className="text-xs text-slate-500 font-hindi">
            Labor and Employment Compliance Secure Portal
          </p>
        </div>

        <div className="mx-5 rounded-2xl bg-slate-100 p-1 sm:mx-10">
          <div className="grid grid-cols-3 gap-1">
            {roles.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => changeRole(item.id)}
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

        {role === "admin" && (
          <div className="mx-5 mt-4 rounded-2xl bg-slate-100 p-1.5 sm:mx-10">
            <div className="grid grid-cols-2 gap-1">
              {["signin", "signup"].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => changeMode(mode)}
                  className={`rounded-xl p-2 text-sm font-bold transition ${
                    authMode === mode
                      ? "bg-white text-[#0b1429] shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {mode === "signin" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="px-5 pb-7 pt-5 sm:px-10">
          {isSignup ? (
            <>
              <label className="mb-2 block text-sm font-bold text-[#12264b]">
                Organization / Department Name
                <input
                  required
                  autoComplete="organization"
                  value={organizationName}
                  onChange={(event) => setOrganizationName(event.target.value)}
                  className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <label className="mb-2 mt-3 block text-sm font-bold text-[#12264b]">
                Contact Officer Name
                <input
                  required
                  autoComplete="name"
                  value={contactName}
                  onChange={(event) => setContactName(event.target.value)}
                  className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <label className="mb-2 mt-3 block text-sm font-bold text-[#12264b]">
                Official Email
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <label className="mb-2 mt-3 block text-sm font-bold text-[#12264b]">
                Password (at least 8 characters)
                <input
                  required
                  minLength={8}
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>
            </>
          ) : (
            <>
              <label className="mb-2 block text-sm font-bold text-[#12264b]">
                {identifierLabel}
                <input
                  required
                  type={role === "admin" ? "email" : "text"}
                  autoComplete={role === "worker" ? "username" : "email"}
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  placeholder={
                    role === "admin"
                      ? "name@example.com"
                      : role === "contractor"
                        ? "Enter your issued login ID"
                        : "Enter your worker ID"
                  }
                  className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <label className="mb-2 mt-3 block text-sm font-bold text-[#12264b]">
                {role === "worker" ? "Access PIN" : "Password"}
                <input
                  required
                  minLength={role === "worker" ? 4 : undefined}
                  maxLength={role === "worker" ? 4 : undefined}
                  inputMode={role === "worker" ? "numeric" : undefined}
                  autoComplete="current-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>
              {role !== "admin" && (
                <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-[11px] text-amber-800">
                  {role === "contractor"
                    ? "Use the login ID and password issued by your project administrator."
                    : "Use the worker ID and four-digit access PIN issued when you were registered."}
                </p>
              )}
            </>
          )}

          {error && (
            <p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full cursor-pointer rounded-xl bg-blue-600 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Please wait..."
              : isSignup
                ? "Register Admin"
                : "Sign In to Portal"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PortalAuthModel;
