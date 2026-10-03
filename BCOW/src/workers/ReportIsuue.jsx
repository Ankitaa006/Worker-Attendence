import { useState } from "react";
import { useLocation } from "react-router-dom";
import { issueCategoryHed } from "../assets/worker";
import api from "../utils/api";
import useApiData from "../utils/useApiData";

const ReportIsuue = () => {
  const location = useLocation();

  // Current date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const [issueCategory, setIsuueCategory] = useState("");
  const [dateIncident, setDateIncident] = useState(location.state?.incidentDate || today);
  const [explainProblem, setExplainProbelem] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const { data, loading, error, refresh } = useApiData("/worker/disputes");
  const disputes = Array.isArray(data) ? data : [];

  const getBackendCategory = (title) => {
    const normalized = title.toLowerCase();
    if (normalized.includes("attendance")) return "attendance";
    if (normalized.includes("overtime") || normalized.includes("wage") || normalized.includes("payment") || normalized.includes("advance")) return "wage";
    if (normalized.includes("safety") || normalized.includes("water")) return "working_conditions";
    return "other";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    setSubmitMessage("");
    try {
      const response = await api.post("/worker/disputes", {
        title: issueCategory,
        description: `${explainProblem.trim()}${dateIncident ? ` (Incident date: ${dateIncident})` : ""}`,
        category: getBackendCategory(issueCategory),
      });
      setSubmitMessage(response.data.message || "Grievance submitted.");
      setIsuueCategory("");
      setExplainProbelem("");
      refresh();
    } catch (requestError) {
      setSubmitError(requestError.response?.data?.message || requestError.message);
    }
  };

  return (
    <div className="w-full max-w-6xl flex flex-col lg:flex-row items-start justify-between mx-auto px-3 sm:px-4 py-2 gap-3.5">
      {/* raise attendance or wage */}
      <div className="w-full lg:w-5/8 flex flex-col items-start justify-center border border-gray-300 rounded-lg shadow-lg px-8 py-4">
        {/* header */}
        <div className="flex flex-row items-center justify-center gap-2">
          <span className="w-11 h-11 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
            ⚠️
          </span>

          <span>
            <h1 className="font-bold text-md">
              Raise Attendance or Wage Grievance
            </h1>

            <p className="text-xs text-gray-500">
              If there is any discrepancy in attendance or payment, please
              report it immediately.
            </p>
          </span>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4 mt-4">
          {/* Issue Category */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#12264b]">
              Issue Category
              <span className="ml-1 text-slate-500">*</span>
            </label>

            <select
              value={issueCategory}
              onChange={(e) => setIsuueCategory(e.target.value)}
              className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
            >
              <option value="">Select issue category</option>
              {issueCategoryHed.map((isu) => (
                <option key={isu.id} value={isu.title}>
                  {isu.title}
                </option>
              ))}
            </select>
          </div>

          {/* Date of Incident */}
          <div className="w-full">
            <label className="mb-2 block text-sm font-semibold text-[#12264b]">
              Date of Incident
              <span className="ml-1 text-slate-500">*</span>
            </label>

            <input
              type="date"
              value={dateIncident}
              onChange={(event) => setDateIncident(event.target.value)}
              className="h-8 w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
            />
          </div>

          {/* Explain Problem */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#12264b]">
              Explain the Issue
              <span className="ml-1 text-slate-500">*</span>
            </label>

            <textarea
              placeholder="e.g. On Saturday 5th Sep, I worked 2 hours extra for slab pouring till 8 PM, but it is not shown in my overtime."
              value={explainProblem}
              onChange={(event) => setExplainProbelem(event.target.value)}
              className="w-full rounded-md border border-slate-300 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
              rows={4}
            />
          </div>

          {submitError && <p role="alert" className="text-sm text-red-700">{submitError}</p>}
          {submitMessage && <p role="status" className="text-sm text-emerald-700">{submitMessage}</p>}

          {/* buttons */}
          <div className="w-full flex flex-row items-end justify-end gap-2">
            <button
              type="submit"
              className="w-full px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg transition shadow cursor-pointer"
            >
              📢 Submit Grievance to Labour Officer
            </button>
          </div>
        </form>
      </div>

      {/* BOCW and your active ticket */}
      <div className="w-full lg:w-3/8 flex flex-col items-center justify-start gap-3">
        {/* BOCW Welfare */}
        <div className="w-full flex flex-col items-start justify-center p-4 bg-amber-200/30 border border-amber-400 rounded-lg shadow-lg">
          <span className="font-bold text-amber-900 text-sm flex items-center space-x-1.5">
            <p>🛡️</p>
            <h2>BOCW Welfare Protection</h2>
          </span>

          <p className="text-xs text-amber-800 leading-relaxed font-hindi">
            Eligibility for wage protections and accident insurance depends on
            applicable laws and local welfare schemes. Contact the relevant
            authorities for current details.
          </p>

          <br />

          <span className="w-full flex items-center justify-between mb-3 text-[12px]">
            <p className="text-amber-900 font-medium">Labour Toll-Free:</p>

            <a
              href="tel:14434"
              className="font-mono font-bold text-brand-700 bg-amber-200/70 px-2 py-0.5 rounded"
            >
              14434
            </a>
          </span>

          <span className="w-full flex items-center justify-between text-[12px]">
            <p className="text-amber-900 font-medium">Emergency Ambulance:</p>

            <a
              href="tel:108"
              className="font-mono font-bold text-brand-700 bg-amber-200/70 px-2 py-0.5 rounded"
            >
              108
            </a>
          </span>
        </div>

        {/* Your Active Ticket */}
        <div className="w-full flex flex-col items-start justify-center p-4 space-y-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <h2 className="text-xs font-bold text-slate-700 uppercase">
            Your Active Tickets
          </h2>

          {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
          {loading ? <p className="text-xs text-slate-500">Loading tickets...</p> : disputes.length === 0 ? (
            <p className="text-xs text-slate-500">You have no reported issues.</p>
          ) : disputes.map((dispute) => (
            <div key={dispute._id} className="w-full space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs">
              <div className="flex w-full items-start justify-between">
                <span className="font-bold text-slate-900">{dispute.title}</span>
                <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-800">{dispute.status}</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-600">{dispute.description}</p>
              <p className="mt-1 text-[11px] text-slate-600">Ref: {dispute.caseId} · {dispute.raisedAt ? new Date(dispute.raisedAt).toLocaleDateString() : ""}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportIsuue;
