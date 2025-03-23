import { Paper, Box, Typography } from "@mui/material";
import { IFeatureCardProps } from "../utils/types";

const FeatureCard = ({ icon, title, description }: IFeatureCardProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        background: "rgba(255,255,255,0.18)",
        borderRadius: 2,
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", mb: 2 }}>
        <Box sx={{ mr: 2, color: "#1a237e" }}>{icon}</Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#1a237e",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );
};

export default FeatureCard;
