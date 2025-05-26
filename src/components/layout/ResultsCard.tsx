import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  alpha,
  useTheme,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { WebsiteEvaluation } from "../../types/Report";
import ResultsModal from "./ResultsModal";

const getScoreData = (score: number, theme: Theme) => {
  if (score >= 8) return { color: theme.palette.success, label: "Excellent" };
  if (score >= 6) return { color: theme.palette.primary, label: "Good" };
  if (score >= 4) return { color: theme.palette.warning, label: "Average" };
  return { color: theme.palette.error, label: "Needs Improvement" };
};

const ResultsCard: React.FC<WebsiteEvaluation> = ({
  numeric_rating,
  category,
  text_rating,
  improvement_suggestions,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Get score color and label
  const { color: scoreColor, label: scoreLabel } = getScoreData(
    numeric_rating,
    theme as Theme
  );

  return (
    <>
      {/* Main Card */}
      <Card
        onClick={handleOpen}
        sx={{
          height: 200,
          width: "100%",
          borderRadius: 3,
          overflow: "hidden",
          position: "relative",
          cursor: "pointer",
          boxShadow: `0 4px 20px ${alpha(scoreColor.main, 0.15)}`,
          background: alpha(scoreColor.main, 0.03),
          border: `1px solid ${alpha(scoreColor.main, 0.2)}`,
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: `0 8px 25px ${alpha(scoreColor.main, 0.25)}`,
          },
        }}
      >
        {/* Score Circle */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: 3,
            pb: 1,
          }}
        >
          <Box
            sx={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: alpha(scoreColor.main, 0.15),
              border: `3px solid ${scoreColor.main}`,
              color: scoreColor.main,
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              {numeric_rating}
            </Typography>
          </Box>
        </Box>

        {/* Category and Rating */}
        <CardContent sx={{ textAlign: "center", flexGrow: 1, pt: 0 }}>
          <Typography
            variant="h6"
            fontWeight="500"
            noWrap
            sx={{ mb: 1, overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {category}
          </Typography>
          <Chip
            label={scoreLabel}
            size="small"
            sx={{
              bgcolor: alpha(scoreColor.main, 0.1),
              color: scoreColor.main,
              borderColor: scoreColor.main,
              fontWeight: "medium",
            }}
            variant="outlined"
          />
        </CardContent>

        {/* View details indicator */}
        <Box
          sx={{
            backgroundColor: alpha(scoreColor.main, 0.1),
            p: 1,
            textAlign: "center",
            borderTop: `1px solid ${alpha(scoreColor.main, 0.2)}`,
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontWeight: 500, color: scoreColor.main }}
          >
            View Details
          </Typography>
        </Box>
      </Card>

      {/* Modal */}
      <ResultsModal
        numeric_rating={numeric_rating}
        category={category}
        text_rating={text_rating}
        improvement_suggestions={improvement_suggestions}
        open={open}
        onClose={handleClose}
      />
    </>
  );
};

export default ResultsCard;
