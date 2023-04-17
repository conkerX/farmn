import * as React from "react";
import { Livestock } from "../../Types";
import Avatar from "@mui/material/Avatar";

interface Props {
  livestock: Livestock;
}

export const LivestockRow: React.FC<Props> = (props) => {
  const { livestock } = props;

  return (
    <div className="flex flex-row bg-white rounded-lg drop-shadow-lg shadow-slate-200 py-2.5 mb-2.5">
      <Avatar
        alt="me"
        src="https://png.pngtree.com/png-vector/20220616/ourmid/pngtree-vector-of-cow-head-design-on-white-background-png-image_5049060.png"
        sx={{ width: 56, height: 56 }}
        className="mx-2.5"
      />
      <section className="flex flex-col justify-center">
        <p className="font-bold">{livestock.earTag}</p>
        <p>{livestock.status}</p>
      </section>
    </div>
  );
};
