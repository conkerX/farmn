import * as React from "react";
import { useFarm } from "../../Context/FarmContext";
import { FarmerRow } from "./FarmerRow";

export const Farmers: React.FC = () => {
  const { farm } = useFarm();

  console.log("farmers ->", farm.farmers);

  return (
    <div>
      <section className="flex justify-center items-center text-xl">
        <p>Farmers</p>
      </section>
      <section className="p-2.5 bg-slate-100 h-[calc(100vh-84px)] overflow-y-auto">
        {farm.farmers.map((farmer) => (
          <FarmerRow
            farmer={farmer}
            key={`${farmer.firstName}-${farmer.lastName}`}
          />
        ))}
      </section>
    </div>
  );
};
