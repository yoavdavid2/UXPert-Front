import { Paper, Box, Typography } from "@mui/material";
import { IFeatureCardProps } from "../utils/types";

const FeatureCard = ({
  icon,
  title,
  description,
  isLargeScreen,
}: IFeatureCardProps) => {
  console.log(isLargeScreen);
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        background: "rgba(255, 255, 255, 0.34)",
        borderRadius: 2,
        height: isLargeScreen ? "90%" : "70%",
        width: isLargeScreen ? "100%" : "66.5%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
      }}
    >
      <Box sx={{ display: "flex", mb: 2, alignItems: "center" }}>
        <Box sx={{ mr: 2, color: "#1a237e", fontSize: "2rem" }}>{icon}</Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#1a237e",
            textAlign: "left",
            flexGrow: 1,
          }}
        >
          {title}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
        {description}
      </Typography>
    </Paper>
  );
};

export default FeatureCard;
