import * as React from "react";
import { useLocalStorage } from "react-use";
import { Farm } from "../Types";

const FarmContext = React.createContext<{
  farm: Farm;
  updateFarm: (farm: Farm) => void;
  removeFarm: () => void;
}>(null);

export const FarmProvider = (props) => {
  const [farm, setFarm, removeFarm] = useLocalStorage("farmn:farm", null);

  const updateFarm = (user: string) => {
    setFarm(user);
  };

  return (
    <FarmContext.Provider value={{ farm, updateFarm, removeFarm }} {...props} />
  );
};

export const useFarm = () => {
  const context = React.useContext(FarmContext);

  if (!context) {
    throw new Error("useFarm must be used within a FarmProvider");
  }

  return context;
};
