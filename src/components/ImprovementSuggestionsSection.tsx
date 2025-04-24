// This component is responsible for rendering the improvement 
import React from "react";
import { Box, Button, Chip, Divider, Grid, Paper, Typography, useTheme,} from "@mui/material";
import { motion } from "framer-motion";
import CodeIcon from "@mui/icons-material/Code";
import { OverallEvaluation } from "../types/Report";

interface ImprovementSuggestionsSectionProps {
  categoryRatings: OverallEvaluation["category_ratings"];
  onPreview: () => void;
}

const ImprovementSuggestionsSection: React.FC<ImprovementSuggestionsSectionProps> = ({
  categoryRatings,
  onPreview,
}) => {
  const theme = useTheme();

  const allSuggestions = categoryRatings
    .flatMap((cat) =>
      cat.improvement_suggestions.map((s) => ({
        ...s,
        category: cat.category,
      }))
    )
    .sort(
      (a, b) =>
        b.importance * b.expected_improvement -
        a.importance * a.expected_improvement
    );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {/* Preview header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>
            HTML Preview and Suggestions
          </Typography>
          <Button variant="contained" startIcon={<CodeIcon />} onClick={onPreview}>
            Preview Improved Design
          </Button>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="body2" paragraph>
          We've analyzed your website and generated an improved HTML version with better UX practices applied.
          Click the button above to preview the suggested improvements.
        </Typography>
      </Paper>

      <Typography variant="h6" fontWeight={600} mb={2} mt={4} color="text.primary">
        Top Improvement Suggestions
      </Typography>

      {allSuggestions.map((sugg, idx) => (
        <Paper
          key={idx}
          elevation={0}
          sx={{
            p: 3,
            mb: 2,
            borderRadius: 2,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >

          <Chip
            label={sugg.category}
            size="small"
            sx={{
              fontWeight: 500,
              bgcolor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
              mb: 1.5,
            }}
          />

          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            {sugg.improvement}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                Importance: {sugg.importance}/10
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: 8,
                  bgcolor: "rgba(0,0,0,0.05)",
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: `${sugg.importance * 10}%`,
                    height: "100%",
                    bgcolor: theme.palette.primary.main,
                    borderRadius: 1,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                Expected Improvement: {sugg.expected_improvement}/10
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: 8,
                  bgcolor: "rgba(0,0,0,0.05)",
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: `${sugg.expected_improvement * 10}%`,
                    height: "100%",
                    bgcolor: theme.palette.success.main,
                    borderRadius: 1,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </motion.div>
  );
};

export default ImprovementSuggestionsSection;
