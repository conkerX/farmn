import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import { useFarm } from "../Context/FarmContext";
import { useJwt } from "../Context/JwtContext";
import { AddFarm } from "./Farm/AddFarm";

export const Home: React.FC = () => {
  const { jwt } = useJwt();
  const { user, updateUser } = useUser();
  const { farm, updateFarm } = useFarm();
  const [showAddFarm, setShowAddFarm] = React.useState<boolean>(!farm);

  React.useEffect(() => {
    const getFarm = async () => {
      const { farmId } = user;

      const farmPromise = await fetch(`http://localhost:8080/farms/${farmId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const farmResponse = await farmPromise.json();

      console.log(farmResponse);
      updateFarm(farmResponse);
    };

    getFarm();
  }, []);

  const toggleAddFarm = () => {
    setShowAddFarm(!showAddFarm);
  };

  if (!user) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <>
        {showAddFarm && <AddFarm toggleAddFarm={toggleAddFarm} />}
        {!showAddFarm && (
          <>
            <section className="flex justify-center items-center text-xl">
              <p>Farm Details</p>
            </section>
            <section className="p-2.5 bg-slate-100 h-[calc(100vh-84px)] overflow-y-auto relative">
              <p>{farm.name}</p>
            </section>
          </>
        )}
      </>
    );
  }
};
