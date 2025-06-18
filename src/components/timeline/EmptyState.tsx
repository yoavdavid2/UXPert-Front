import { Typography } from "@mui/material";
import { TIMELINE_COLORS } from "../../utils/timeline.constants";

const EmptyState = () => (
  <Typography
    variant="body2"
    sx={{
      color: TIMELINE_COLORS.secondary,
      textAlign: "center",
      py: 4,
      fontStyle: "italic",
    }}
  >
    No analyses yet for this project. Click "New Analysis" to start.
  </Typography>
);

export default EmptyState;
