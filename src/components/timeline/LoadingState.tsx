import { Box, CircularProgress } from "@mui/material";
import { TIMELINE_COLORS } from "../../utils/timeline.constants";

const LoadingState = () => (
  <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
    <CircularProgress size={32} sx={{ color: TIMELINE_COLORS.accent }} />
  </Box>
);

export default LoadingState;
