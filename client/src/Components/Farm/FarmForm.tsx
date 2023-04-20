import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PhoneIcon from "@mui/icons-material/Phone";
import Email from "@mui/icons-material/Email";
import GiteIcon from "@mui/icons-material/Gite";
import MenuItem from "@mui/material/MenuItem";
import { countries, states } from "../../Constants";
import Button from "@mui/material/Button";
import { CreateFarmBody } from "../../Types";

interface Props {
  onSubmit: (body: CreateFarmBody) => void;
}
export const FarmForm: React.FC<Props> = (props) => {
  const { onSubmit } = props;
  const [farmName, setFarmName] = React.useState<string>("");
  const [street, setStreet] = React.useState<string>("");
  const [city, setCity] = React.useState<string>("");
  const [state, setState] = React.useState<string>("");
  const [zipCode, setZipCode] = React.useState<string>("");
  const [country, setCountry] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

  const onFarmNameChange = (event) => {
    const updatedFarmName = event.target.value as string;
    setFarmName(updatedFarmName);
  };

  const onStreetChange = (event) => {
    const updatedStreet = event.target.value as string;
    setStreet(updatedStreet);
  };

  const onCityChange = (event) => {
    const updatedCity = event.target.value as string;
    setCity(updatedCity);
  };

  const onStateChange = (event) => {
    const updatedState = event.target.value as string;
    setState(updatedState);
  };

  const onZipCodeChange = (event) => {
    const updatedZipCode = event.target.value as string;
    setZipCode(updatedZipCode);
  };

  const onCountryChange = (event) => {
    const updatedCountry = event.target.value as string;
    setCountry(updatedCountry);
  };

  const onPhoneNumberChange = (event) => {
    const updatedPhoneNumber = event.target.value as string;
    setPhoneNumber(updatedPhoneNumber);
  };

  const onEmailChange = (event) => {
    const updatedEmail = event.target.value as string;
    setEmail(updatedEmail);
  };

  return (
    <>
      <section className="p-2.5 bg-slate-100 h-[calc(100vh-84px)] overflow-y-auto relative items-center flex flex-col">
        <div className="pb-2">
          <TextField
            onChange={onFarmNameChange}
            value={farmName}
            label="Farm Name"
            variant="outlined"
            type="text"
            classes={{ root: "w-80 bg-white" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <GiteIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="pb-2">
          <TextField
            onChange={onStreetChange}
            value={street}
            label="Street"
            variant="outlined"
            type="text"
            classes={{ root: "w-80 bg-white" }}
          />
        </div>
        <div className="pb-2">
          <TextField
            onChange={onCityChange}
            value={city}
            label="City"
            variant="outlined"
            type="text"
            classes={{ root: "w-80 bg-white" }}
          />
        </div>
        <div className="pb-2">
          <TextField
            id="state-select"
            value={state}
            label="State"
            className="w-80 bg-white"
            onChange={onStateChange}
            select
          >
            {states.map((state) => (
              <MenuItem value={state} key={state}>
                {state}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="pb-2">
          <TextField
            onChange={onZipCodeChange}
            value={zipCode}
            label="Zip Code"
            variant="outlined"
            type="text"
            classes={{ root: "w-80 bg-white" }}
          />
        </div>
        <div className="pb-2">
          <TextField
            id="country-select"
            value={country}
            label="Country"
            className="w-80 bg-white"
            onChange={onCountryChange}
            select
          >
            {countries.map((country) => (
              <MenuItem value={country} key={country}>
                {country}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="pb-2">
          <TextField
            onChange={onPhoneNumberChange}
            value={phoneNumber}
            label="Phone"
            variant="outlined"
            type="text"
            classes={{ root: "w-80 bg-white" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="pb-2">
          <TextField
            onChange={onEmailChange}
            value={email}
            label="Email"
            variant="outlined"
            type="text"
            classes={{ root: "w-80 bg-white" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={() =>
            onSubmit({
              name: farmName,
              street,
              city,
              state,
              zipCode,
              country,
              phone: phoneNumber,
              email,
            })
          }
        >
          Submit
        </Button>
      </section>
    </>
  );
};
