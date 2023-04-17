import * as React from "react";
import { Farmer } from "../../Types";
import Avatar from "@mui/material/Avatar";

interface Props {
  farmer: Farmer;
}

export const FarmerRow: React.FC<Props> = (props) => {
  const { farmer } = props;

  return (
    <div className="flex flex-row bg-white rounded-lg drop-shadow-lg shadow-slate-200 py-2.5 mb-2.5">
      <Avatar
        alt="me"
        src="#"
        sx={{ width: 56, height: 56 }}
        className="mx-2.5"
      />
      <section className="flex flex-col justify-center">
        <p className="font-bold">{`${farmer.firstName} ${farmer.lastName}`}</p>
        <p>{farmer.email}</p>
      </section>
    </div>
  );
};
