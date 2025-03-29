import { AppBar, Toolbar, Box } from "@mui/material";
import IconChip from "./IconChip";

import Logo from "../assets/logo.svg";
import { useNavigate } from "react-router";

const Appbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
          }}
          onClick={handleLogoClick}
        >
          <Box
            component="img"
            src={Logo}
            alt="UXpert Logo"
            sx={{
              height: 85,
              cursor: "pointer",
            }}
          />
        </Box>
        <IconChip />
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
