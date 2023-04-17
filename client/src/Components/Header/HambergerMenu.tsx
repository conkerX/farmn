import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MenuIcon from "@mui/icons-material/Menu";

export const HambergerMenu: React.FC = () => {
  const navigate = useNavigate();

  const onLivestockClick = (popupState: any) => {
    popupState.close();
    navigate("/livestock");
  };

  const onFarmersClick = (popupState: any) => {
    popupState.close();
    navigate("/farmers");
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
            <MenuIcon />
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={() => onFarmersClick(popupState)}>
              Farmers
            </MenuItem>
            <MenuItem onClick={() => onLivestockClick(popupState)}>
              Livestock
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};
