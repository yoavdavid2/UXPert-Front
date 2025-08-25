import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  Button,
  useTheme,
  alpha,
  Modal,
} from "@mui/material";
import { Close, Lightbulb } from "@mui/icons-material";

import { IResultsModalProps } from "../../utils/types";

const ResultsModal = ({
  numeric_rating,
  category,
  text_rating,
  improvement_suggestions,
  open,
  onClose,
}: IResultsModalProps) => {
  const theme = useTheme();

  const { color: scoreColor } = (() => {
    if (numeric_rating >= 8) return { color: theme.palette.success };
    if (numeric_rating >= 6) return { color: theme.palette.primary };
    if (numeric_rating >= 4) return { color: theme.palette.warning };
    return { color: theme.palette.error };
  })();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="results-modal-title"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.23, ease: "easeInOut" }}
        sx={{
          position: "fixed",
          top: "10vh",
          transform: "translateX(-50%)",
          width: { xs: "90%", sm: "80%", md: 700 },
          maxHeight: "80vh",
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            p: 3,
            bgcolor: scoreColor.main,
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" id="results-modal-title" fontWeight="bold">
            {category} ({numeric_rating}/10)
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Box>

        <Box sx={{ p: 3, overflowY: "auto", flexGrow: 1 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              bgcolor: alpha(scoreColor.main, 0.05),
              border: `1px solid ${alpha(scoreColor.main, 0.2)}`,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Overall Rating
            </Typography>
            <Typography variant="body1">{text_rating}</Typography>
          </Paper>

          {improvement_suggestions.length > 0 && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Improvement Suggestions
              </Typography>

              {improvement_suggestions.map((suggestion, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    borderLeft: `4px solid ${scoreColor.main}`,
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}
                  >
                    <Lightbulb
                      sx={{ color: scoreColor.main, mr: 1.5, mt: 0.2 }}
                    />
                    <Typography
                      variant="subtitle1"
                      fontWeight="medium"
                      sx={{ flex: 1 }}
                    >
                      {suggestion.improvement}
                    </Typography>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}></Grid>
                    <Grid item xs={12} md={6}></Grid>
                  </Grid>
                </Paper>
              ))}
            </Box>
          )}
        </Box>

        <Box
          sx={{
            p: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              bgcolor: scoreColor.main,
              textTransform: "capitalize",
              fontSize: "0.925rem",
              "&:hover": { bgcolor: alpha(scoreColor.main, 0.8) },
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ResultsModal;
