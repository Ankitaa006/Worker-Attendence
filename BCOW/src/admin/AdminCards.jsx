import AdminDetailsCard from "../cards/AdminDetailsCard";
import useApiData from "../utils/useApiData";

const AdminCards = () => {
  const { data, loading, error } = useApiData("/admin/dashboard");
  const metrics = [
    {
      id: "activeSites",
      title: "Monitored Construction Sites",
      value: data?.activeSites,
      suffix: " Active",
    },
    {
      id: "totalWorkers",
      title: "Total Enrolled Workers",
      value: data?.totalWorkers,
      suffix: " Workers",
    },
    {
      id: "totalContractors",
      title: "Registered Contractors",
      value: data?.totalContractors,
      suffix: " Contractors",
    },
    {
      id: "activeDisputes",
      title: "Open Disputes",
      value: data?.activeDisputes,
      suffix: " Cases",
    },
  ];

  return (
    <div className="w-full max-w-6xl flex flex-col lg:flex-row items-start justify-between mx-auto sm:px-4  gap-3.5">
      <div className="w-full grid grid-cols-2  lg:grid-cols-4">
        {metrics.map((metric) => (
          <AdminDetailsCard
            key={metric.id}
            title={metric.title}
            data={loading ? "Loading..." : error ? "Unavailable" : `${metric.value ?? 0}${metric.suffix}`}
            desc={error || "Live totals from registered records"}
            dataCol="black"
            descCol={error ? "red-700" : "gray-500"}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminCards;
