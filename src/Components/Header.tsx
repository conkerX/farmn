import * as React from "react";
import { useNavigate } from "react-router-dom";

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
      <div className="tracking-widest" onClick={onAppNameClick}>
        My App
      </div>
    </header>
  );
};
