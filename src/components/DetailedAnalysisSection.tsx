// This component is responsible for rendering the detailed analysis section of the report -Results->AnalysisSection
import React from "react";
import { Box, Paper, Typography, Divider, Grid, useTheme,} from "@mui/material";
import { motion } from "framer-motion";
import { OverallEvaluation } from "../types/Report";

interface DetailedAnalysisSectionProps {
  categoryRatings: OverallEvaluation["category_ratings"];
}

const DetailedAnalysisSection: React.FC<DetailedAnalysisSectionProps> = ({
  categoryRatings,
}) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {categoryRatings.map((cat, idx) => (
        <Paper
          key={idx}
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          {/* Header: circle + title */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: theme.palette.primary.main,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontWeight: "bold",
                mr: 2,
              }}
            >
              {cat.numeric_rating}
            </Box>
            <Typography variant="h6" fontWeight={600}>
              {cat.category}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" paragraph>
            {cat.text_rating}
          </Typography>

          {cat.improvement_suggestions.length > 0 && (
            <Box>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                Improvement Suggestions
              </Typography>
              {cat.improvement_suggestions.map((s, i) => (
                <Box
                  key={i}
                  sx={{
                    p: 2,
                    mb: 2,
                    bgcolor: "rgba(0,0,0,0.02)",
                    borderRadius: 2,
                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <Typography variant="body2" fontWeight={500} mb={1}>
                    {s.improvement}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Importance
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            width: `${s.importance * 10}%`,
                            height: 6,
                            bgcolor: theme.palette.primary.main,
                            borderRadius: 1,
                            mr: 1,
                            maxWidth: "80%",
                          }}
                        />
                        <Typography variant="caption" fontWeight="bold">
                          {s.importance}/10
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Expected Improvement
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            width: `${s.expected_improvement * 10}%`,
                            height: 6,
                            bgcolor: theme.palette.success.main,
                            borderRadius: 1,
                            mr: 1,
                            maxWidth: "80%",
                          }}
                        />
                        <Typography variant="caption" fontWeight="bold">
                          {s.expected_improvement}/10
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Box>
          )}
        </Paper>
      ))}
    </motion.div>
  );
};

export default DetailedAnalysisSection;
