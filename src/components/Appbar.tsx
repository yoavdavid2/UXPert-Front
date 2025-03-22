import { AppBar, Toolbar, Box } from "@mui/material";
import IconChip from "./IconChip";
import { IAppbarProps } from "../utils/types";

import Logo from "../assets/logo.svg";

const Appbar = ({ handleProfileClick }: IAppbarProps) => {
  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={Logo}
            alt="UXpert Logo"
            sx={{ height: 85 }}
          />
        </Box>
        <IconChip onProfileClick={handleProfileClick} />
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
