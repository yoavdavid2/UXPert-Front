import { Typography, Avatar, Box } from "@mui/material";
import { getFullName } from "../../utils/UserProfileUtils";
import { IProfileHeaderProps } from "../../utils/types";

const ProfileHeader = ({ userProfile }: IProfileHeaderProps) => (
  <Box
    sx={{
      py: 4,
      px: 3,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderBottom: "1px solid #E7E1F2",
    }}
  >
    <Avatar
      src={userProfile.profileImage || undefined}
      alt={getFullName(userProfile)}
      sx={{
        width: 80,
        height: 80,
        bgcolor: "rgba(26, 35, 126, 0.8)",
        fontSize: "2rem",
        fontWeight: "light",
        mb: 2,
        boxShadow: "0 4px 12px rgba(165, 148, 195, 0.3)",
      }}
    >
      {getFullName(userProfile).charAt(0)}
    </Avatar>
    <Typography
      variant="h6"
      sx={{ fontWeight: 500, color: "rgba(26, 35, 126, 1)", mb: 0.5 }}
    >
      {getFullName(userProfile)}
    </Typography>
    <Typography variant="body2" sx={{ color: "rgba(26, 35, 126, 1)" }}>
      {userProfile.email || "No email provided"}
    </Typography>
  </Box>
);

export default ProfileHeader;
