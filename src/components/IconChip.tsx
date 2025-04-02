import React from "react";
import { Box, Chip, Menu, MenuItem } from "@mui/material";
import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useAuth } from "../utils/AuthContext";

const IconChip = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileAction = (title: string) => {
    handleMenuClose();

    switch (title) {
      case "Sign up":
        if (location.pathname === "/auth") {
          navigate("/auth", { state: "signup", replace: true });
        } else {
          navigate("/auth", { state: "signup" });
        }
        break;
      case "Log in":
        if (location.pathname === "/auth") {
          navigate("/auth", { state: "login", replace: true });
        } else {
          navigate("/auth", { state: "login" });
        }
        break;
      case "Plans & Pricing":
        navigate("/pricing");
        break;
      case "Profile & History":
        navigate("/profile");
        break;
      case "Logout":
        logout();
        break;
      default:
        break;
    }
  };

  const getMenuItems = () => {
    if (isAuthenticated) {
      return ["Profile & History", "Logout"];
    } else {
      return ["Sign up", "Log in", "Plans & Pricing"];
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Chip
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "24px",
          padding: "6px 8px",
          height: "auto",
          boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.15)",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0px 5px 12px rgba(0, 0, 0, 0.2)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          },
          "& .MuiChip-label": {
            padding: 0,
            display: "flex",
            alignItems: "center",
          },
        }}
        onClick={handleMenuOpen}
        label={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1a237e",
                mx: 1,
              }}
            >
              <MenuIcon fontSize="small" />
            </Box>
            <Box
              sx={{
                width: "1px",
                height: "24px",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                mx: 0.5,
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1a237e",
                mx: 1,
                cursor: "pointer",
                "&:hover": {
                  color: "#0d1642",
                },
              }}
            >
              <AccountCircle fontSize="medium" />
            </Box>
          </Box>
        }
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            borderRadius: 2,
            minWidth: 180,
            "& .MuiMenuItem-root": {
              fontSize: "0.9rem",
              py: 1,
            },
          },
        }}
      >
        {getMenuItems().map((item) => (
          <MenuItem key={item} onClick={() => handleProfileAction(item)}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default IconChip;
