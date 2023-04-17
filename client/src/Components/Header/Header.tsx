import * as React from "react";
import { useNavigate } from "react-router-dom";
import { HambergerMenu } from "./HambergerMenu";
import { AccountMenu } from "./AccountMenu";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const onAppNameClick = () => {
    navigate("/");
  };

  return (
    <header
      style={{ background: "white" }}
      className="h-14 text-2xl flex flex-row justify-between items-center"
    >
      <HambergerMenu />
      <div className="tracking-widest" onClick={onAppNameClick}>
        FARMN
      </div>
      <AccountMenu />
    </header>
  );
};
