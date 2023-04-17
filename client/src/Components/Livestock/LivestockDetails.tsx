import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {
  midwestCattleBreeds,
  cattleTypes,
  cattleGenders,
  cattleStatuses,
} from "../../Constants";
import Button from "@mui/material/Button";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useFarm } from "../../Context/FarmContext";
import { useJwt } from "../../Context/JwtContext";
import { Livestock } from "../../Types";
import { LivestockTimeline } from "./LivestockTimeline";

interface Props {
  livestockDetails: Livestock;
  toggleLivestockDetails: () => void;
}

export const LivestockDetails: React.FC<Props> = (props) => {
  const { jwt } = useJwt();
  const { farm, updateFarm } = useFarm();
  const { livestockDetails, toggleLivestockDetails } = props;
  const [cattleBreed, setCattleBreed] = React.useState<string>(
    livestockDetails.breed
  );
  const [cattleType, setCattleType] = React.useState<string>(
    livestockDetails.type
  );
  const [cattleGender, setCattleGender] = React.useState<string>(
    livestockDetails.gender
  );
  const [weight, setWeight] = React.useState<number>(livestockDetails.weight);
  const [earTag, setEarTag] = React.useState<string>(livestockDetails.earTag);
  const [cattleStatus, setCattleStatus] = React.useState<string>(
    livestockDetails.status
  );
  const [dateOfBirth, setDateOfBirth] = React.useState<Dayjs | null>(
    dayjs(livestockDetails.dateOfBirth)
  );

  const onCattleBreedChange = (event) => {
    const updatedBreed = event.target.value as string;
    setCattleBreed(updatedBreed);
  };

  const onCattleTypeChange = (event) => {
    const updatedType = event.target.value as string;
    setCattleType(updatedType);
  };

  const onCattleGendersChange = (event) => {
    const updatedGender = event.target.value as string;
    setCattleGender(updatedGender);
  };

  const onWeightChange = (event) => {
    const updateWeight = event.target.value as number;
    setWeight(updateWeight);
  };

  const onEarTagChange = (event) => {
    const updatedEarTag = event.target.value as string;
    setEarTag(updatedEarTag);
  };

  const onCattleStatusChange = (event) => {
    const updatedStatus = event.target.value as string;
    setCattleStatus(updatedStatus);
  };

  const onSubmit = async () => {
    const body = {
      breed: cattleBreed,
      type: cattleType,
      gender: cattleGender,
      dateOfBirth,
      weight,
      status: cattleStatus,
      earTag,
    };

    try {
      const updateLivestockPromise = await fetch(
        `http://localhost:8080/livestock/${livestockDetails._id}`,
        {
          method: "PATCH",
          mode: "cors",
          cache: "default",
          headers: {
            Authorization: `Bearer ${jwt}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const updateLivestockResponse: Livestock =
        await updateLivestockPromise.json();

      console.log(updateLivestockResponse);

      const updatedLivestock = farm.livestock.map((livestock) => {
        if (livestock._id === updateLivestockResponse._id) {
          return {
            ...livestock,
            ...updateLivestockResponse,
          };
        }
        return livestock;
      });

      const updatedFarm = {
        ...farm,
        livestock: updatedLivestock,
      };

      updateFarm(updatedFarm);

      // toggleLivestockDetails();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <section className="flex justify-between items-center text-xl">
        <p className="ml-2.5">Livestock Details</p>
        <CloseIcon className="mr-2.5" onClick={toggleLivestockDetails} />
      </section>
      <section className="p-2.5 bg-slate-100 h-[calc(100vh-84px)] overflow-y-auto relative items-center flex flex-col">
        <div className="mb-2.5">
          <TextField
            id="breed-select"
            value={cattleBreed}
            label="Breed"
            className="w-80 bg-white"
            onChange={onCattleBreedChange}
            select
          >
            {midwestCattleBreeds.map((breed) => (
              <MenuItem value={breed} key={breed}>
                {breed}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="mb-2.5">
          <TextField
            id="type-select"
            value={cattleType}
            label="Type"
            className="w-80 bg-white"
            onChange={onCattleTypeChange}
            select
          >
            {cattleTypes.map((type) => (
              <MenuItem value={type} key={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="mb-2.5">
          <TextField
            id="type-select"
            value={cattleGender}
            label="Gender"
            className="w-80 bg-white"
            onChange={onCattleGendersChange}
            select
          >
            {cattleGenders.map((gender) => (
              <MenuItem value={gender} key={gender}>
                {gender}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="mb-2.5">
          <TextField
            onChange={onWeightChange}
            label="Weight"
            variant="outlined"
            type="number"
            classes={{ root: "w-80" }}
            sx={{ background: "white" }}
            value={weight}
            InputProps={{
              endAdornment: <InputAdornment position="end">lb</InputAdornment>,
            }}
          />
        </div>
        <div className="mb-2.5">
          <TextField
            onChange={onEarTagChange}
            label="Ear Tag"
            variant="outlined"
            type="text"
            classes={{ root: "w-80" }}
            sx={{ background: "white" }}
            value={earTag}
          />
        </div>
        <div className="mb-2.5">
          <TextField
            id="type-select"
            value={cattleStatus}
            label="Status"
            className="w-80 bg-white"
            onChange={onCattleStatusChange}
            select
          >
            {cattleStatuses.map((status) => (
              <MenuItem value={status} key={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="mb-2.5">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              label="Date Of Birth"
              value={dateOfBirth}
              onChange={setDateOfBirth}
              className="bg-white w-80"
            ></MobileDatePicker>
          </LocalizationProvider>
        </div>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </section>
      <LivestockTimeline />
    </div>
  );
};
