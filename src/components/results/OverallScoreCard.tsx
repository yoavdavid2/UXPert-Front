// components/OverallScoreCard.tsx
import React from "react";
import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { IOverallScoreCardProps } from "../../utils/types";

const OverallScoreCard = ({
  averageScore,
  bestThing,
  worstThing,
}: IOverallScoreCardProps) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.05)",
          background: "linear-gradient(145deg, #ffffff 0%, #f9faff 100%)",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 1,
              }}
            >
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                Overall Score - Category Avg
              </Typography>
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                  variant="determinate"
                  value={averageScore * 10}
                  size={120}
                  thickness={3}
                  sx={{
                    color: theme.palette.primary.main,
                    "& .MuiCircularProgress-circle": {
                      strokeLinecap: "round",
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      border: `5px solid ${theme.palette.primary.main}`,
                      opacity: 0.3,
                      filter: "blur(2px)",
                      boxSizing: "border-box",
                    },
                  }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h3" fontWeight={700}>
                    {averageScore.toFixed(1)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                  p: 2,
                  bgcolor: "rgba(76, 175, 80, 0.08)",
                  borderRadius: 2,
                  border: "1px solid rgba(76, 175, 80, 0.2)",
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  color="success.main"
                  sx={{ mr: 2, mt: 0.5 }}
                >
                  Best Feature:
                </Typography>
                <Typography variant="body2" sx={{ mr: 2, mt: 0.5 }}>
                  {bestThing}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  bgcolor: "rgba(239, 83, 80, 0.08)",
                  borderRadius: 2,
                  border: "1px solid rgba(239, 83, 80, 0.2)",
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  color="error.main"
                  sx={{ mr: 2, mt: 0.5 }}
                >
                  Area for Improvement:
                </Typography>
                <Typography variant="body2" sx={{ mr: 2, mt: 0.5 }}>
                  {worstThing}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </motion.div>
  );
};

export default OverallScoreCard;
