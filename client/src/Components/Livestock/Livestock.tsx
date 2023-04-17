import * as React from "react";
import { useFarm } from "../../Context/FarmContext";
import { LivestockRow } from "./LivestockRow";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { AddLivestock } from "./AddLivestock";
import { LivestockTable } from "./LivestockTable";
import { LivestockDetails } from "./LivestockDetails";
import { Livestock as ILivestock } from "../../Types";

export const Livestock: React.FC = () => {
  const { farm } = useFarm();
  const [showAddLivestock, setShowAddLivestock] =
    React.useState<boolean>(false);
  const [showLivestockDetails, setShowLivestockDetails] =
    React.useState<boolean>(false);
  const [livestockDetails, setLivestockDetails] = React.useState<ILivestock>();

  console.log("livestock ->", farm.livestock);

  const toggleAddLivestock = () => {
    setShowAddLivestock(!showAddLivestock);
  };

  const updateLivestockDetails = (livestockId: string) => {
    const [livestock] = farm.livestock.filter((livestock) => {
      return livestock._id.toString() === livestockId;
    });

    setLivestockDetails(livestock);
  };

  const toggleLivestockDetails = () => {
    setShowLivestockDetails(!showLivestockDetails);
  };

  const rows = farm.livestock.map((livestock) => {
    return {
      breed: livestock.breed,
      type: livestock.type,
      gender: livestock.gender,
      dateOfBirth: livestock.dateOfBirth.toString(),
      weight: livestock.weight,
      status: livestock.status,
      earTag: livestock.earTag,
      _id: livestock._id.toString(),
    };
  });

  return (
    <>
      {showAddLivestock && (
        <AddLivestock toggleAddLivestock={toggleAddLivestock} />
      )}
      {showLivestockDetails && (
        <LivestockDetails
          toggleLivestockDetails={toggleLivestockDetails}
          livestockDetails={livestockDetails}
        />
      )}
      {!showAddLivestock && !showLivestockDetails && (
        <div>
          <section className="flex justify-center items-center text-xl">
            <p>Livestock</p>
          </section>
          <section className="p-2.5 bg-slate-100 h-[calc(100vh-84px)] overflow-y-auto relative">
            {/* {farm.livestock.map((livestock) => (
              <LivestockRow livestock={livestock} key={`${livestock.earTag}`} />
            ))} */}
            <LivestockTable
              rows={rows}
              toggleAddLivestock={toggleAddLivestock}
              toggleLivestockDetails={toggleLivestockDetails}
              updateLivestockDetails={updateLivestockDetails}
            />
            {/* <div className="absolute right-2.5 bottom-2.5">
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{
                  borderRadius: "50%",
                  height: "58px",
                }}
                onClick={toggleAddLivestock}
              >
                <AddIcon />
              </Button>
            </div> */}
          </section>
        </div>
      )}
    </>
  );
};
