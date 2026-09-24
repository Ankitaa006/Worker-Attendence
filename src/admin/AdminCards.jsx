import React from "react";
import AdminDetailsCard from "../cards/AdminDetailsCard";
import { AdmincardData } from "../assets/admin";

const AdminCards = () => {
  return (
    <div className="w-full max-w-6xl flex flex-col lg:flex-row items-start justify-between mx-auto sm:px-4  gap-3.5">
      <div className="w-full grid grid-cols-2  lg:grid-cols-4">
        {AdmincardData.map((data) => (
          <AdminDetailsCard
            key={data.id}
            title={data.title}
            data={data.data}
            desc={data.desc}
            dataCol={data.dataCol}
            descCol={data.descCol}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminCards;
