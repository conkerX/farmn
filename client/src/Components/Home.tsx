import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useJwt } from "../Context/JwtContext";
import { useUser } from "../Context/UserContext";
import { useFarm } from "../Context/FarmContext";

export const Home: React.FC = () => {
  const { user } = useUser();
  const { jwt } = useJwt();
  const { updateFarm } = useFarm();

  console.log("user ->", user);
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

  if (!user) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <div>
        <p>{`Hello ${user.username}`}</p>
      </div>
    );
  }
};
