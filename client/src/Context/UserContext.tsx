import * as React from "react";
import { User } from "../Types";
import { useLocalStorage } from "react-use";

const UserContext = React.createContext<{
  user: User;
  updateUser: (user: User) => void;
  removeUser: () => void;
}>(null);

export const UserProvider = (props) => {
  const [user, setUser, removeUser] = useLocalStorage("farmn:user", null);

  const updateUser = (user: User) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, removeUser }} {...props} />
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
