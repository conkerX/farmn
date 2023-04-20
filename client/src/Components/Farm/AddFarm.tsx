import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useJwt } from "../../Context/JwtContext";
import { useFarm } from "../../Context/FarmContext";
import { useUser } from "../../Context/UserContext";
import { FarmForm } from "./FarmForm";
import { CreateFarmBody } from "../../Types";

interface Props {
  toggleAddFarm: () => void;
}
export const AddFarm: React.FC<Props> = (props) => {
  const { jwt } = useJwt();
  const { updateFarm } = useFarm();
  const { updateUser } = useUser();
  const { toggleAddFarm } = props;

  const onSubmit = async (body: CreateFarmBody) => {
    try {
      const addFarmPromise = await fetch(`http://localhost:8080/farms`, {
        method: "POST",
        mode: "cors",
        cache: "default",
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const addFarmResponse = await addFarmPromise.json();

      const { user, farm } = addFarmResponse;

      updateFarm(farm);
      updateUser(user);

      toggleAddFarm();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <section className="flex justify-between items-center text-xl">
        <p className="ml-2.5">Add Farm</p>
        <CloseIcon className="mr-2.5" onClick={toggleAddFarm} />
      </section>
      <FarmForm onSubmit={onSubmit} />
    </div>
  );
};
