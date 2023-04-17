import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useJwt } from "../../Context/JwtContext";
import { useUser } from "../../Context/UserContext";

export const AccountMenu: React.FC = () => {
  const { jwt, removeJwt } = useJwt();
  const { removeUser } = useUser();
  const navigate = useNavigate();

  const onLogout = async (popupState: any) => {
    try {
      const logoutResponse = await fetch("http://localhost:8080/users/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log(logoutResponse);

      if (logoutResponse) {
        console.log(logoutResponse);
        popupState.close;
        removeJwt();
        removeUser();
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PopupState variant="popover" popupId="hamberger-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            variant="contained"
            {...bindTrigger(popupState)}
            sx={{
              background: "white",
              color: "black",
              "&:hover": {
                background: "white",
              },
            }}
            disableElevation
          >
            <AccountCircleIcon />
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Account</MenuItem>
            <MenuItem onClick={() => onLogout(popupState)}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};
