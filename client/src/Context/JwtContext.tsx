import * as React from "react";
import { useLocalStorage } from "react-use";

const JwtContext = React.createContext<{
  jwt: string;
  updateJwt: (jwt: string) => void;
  removeJwt: () => void;
}>(null);

export const JwtProvider = (props) => {
  const [jwt, setJwt, removeJwt] = useLocalStorage("farmn:jwt", null);

  const updateJwt = (user: string) => {
    setJwt(user);
  };

  return (
    <JwtContext.Provider value={{ jwt, updateJwt, removeJwt }} {...props} />
  );
};

export const useJwt = () => {
  const context = React.useContext(JwtContext);

  if (!context) {
    throw new Error("useJwt must be used within a JwtProvider");
  }

  return context;
};
