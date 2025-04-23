import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Modal, 
  Chip,
  Button,
  Paper,
  Divider,
  Grid,
  useTheme,
  IconButton,
  alpha
} from "@mui/material";
import { 
  Close, 
  Lightbulb
} from "@mui/icons-material";
import { WebsiteEvaluation } from "../types/Report";
import { motion } from "framer-motion";

const ResultsCard: React.FC<WebsiteEvaluation> = ({
  numeric_rating,
  category,
  text_rating,
  improvement_suggestions
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Determine card color based on score
  const getScoreColor = () => {
    if (numeric_rating >= 8) return theme.palette.success;
    if (numeric_rating >= 6) return theme.palette.primary;
    if (numeric_rating >= 4) return theme.palette.warning;
    return theme.palette.error;
  };

  const scoreColor = getScoreColor();
  
  // Determine score label based on numeric rating
  const getScoreLabel = () => {
    if (numeric_rating >= 8) return "Excellent";
    if (numeric_rating >= 6) return "Good";
    if (numeric_rating >= 4) return "Average";
    return "Needs Improvement";
  };

  return (
    <>
      {/* Main Card */}
      <Card
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
          }
        }}
        onClick={handleOpen}
      >
        {/* Score Circle */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: 3,
            pb: 1
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
              position: "relative"
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
            sx={{ 
              mb: 1,
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {category}
          </Typography>
          
          <Chip 
            label={getScoreLabel()} 
            size="small"
            sx={{ 
              bgcolor: alpha(scoreColor.main, 0.1), 
              color: scoreColor.main,
              borderColor: scoreColor.main,
              fontWeight: "medium",
              mb: 1
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
            borderTop: `1px solid ${alpha(scoreColor.main, 0.2)}`
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 500, color: scoreColor.main }}>
            View Details
          </Typography>
        </Box>
      </Card>

      {/* Modal with detailed information */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="results-modal-title"
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          sx={{
            position: "fixed",
            top: "10vh",
            left: "50%",
            transform: "translateX(-50%)",
            width: { xs: "90%", sm: "80%", md: 700 },
            maxHeight: "80vh",
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            overflow: "auto",
            display: "flex",
            flexDirection: "column"
          }}
        >
          {/* Modal Header */}
          <Box
            sx={{
              p: 3,
              bgcolor: scoreColor.main,
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "white",
                  color: scoreColor.main,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mr: 2,
                  fontWeight: "bold",
                  fontSize: "1.2rem"
                }}
              >
                {numeric_rating}
              </Box>
              <Typography variant="h5" id="results-modal-title" fontWeight="bold">
                {category}
              </Typography>
            </Box>
            <IconButton onClick={handleClose} sx={{ color: "white" }}>
              <Close />
            </IconButton>
          </Box>

          {/* Modal Content - scrollable */}
          <Box sx={{ p: 3, overflow: "auto", flexGrow: 1 }}>
            {/* Overall Rating */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                mb: 3, 
                bgcolor: alpha(scoreColor.main, 0.05),
                border: `1px solid ${alpha(scoreColor.main, 0.2)}`,
                borderRadius: 2
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Overall Rating
              </Typography>
              <Typography variant="body1">
                {text_rating}
              </Typography>
            </Paper>

            {/* Improvement Suggestions */}
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
                      borderLeft: `4px solid ${scoreColor.main}`
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                      <Lightbulb 
                        sx={{ 
                          color: scoreColor.main, 
                          mr: 1.5,
                          mt: 0.2
                        }} 
                      />
                      <Typography 
                        variant="subtitle1" 
                        fontWeight="medium"
                        sx={{ flex: 1 }}
                      >
                        {suggestion.improvement}
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Importance
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <Box 
                              sx={{ 
                                width: `${suggestion.importance * 10}%`,
                                height: 8,
                                bgcolor: theme.palette.primary.main,
                                borderRadius: 1,
                                mr: 1
                              }} 
                            />
                            <Typography variant="body2" fontWeight="medium">
                              {suggestion.importance}/10
                            </Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            {suggestion.importance <= 3 ? "Low priority" : 
                             suggestion.importance <= 6 ? "Medium priority" : "High priority"}
                          </Typography>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Expected Improvement
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <Box 
                              sx={{ 
                                width: `${suggestion.expected_improvement * 10}%`,
                                height: 8,
                                bgcolor: theme.palette.success.main,
                                borderRadius: 1,
                                mr: 1
                              }} 
                            />
                            <Typography variant="body2" fontWeight="medium">
                              {suggestion.expected_improvement}/10
                            </Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            {suggestion.expected_improvement <= 3 ? "Minor improvement" : 
                             suggestion.expected_improvement <= 6 ? "Moderate improvement" : "Major improvement"}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Box>
            )}
          </Box>

          {/* Modal Footer */}
          <Box 
            sx={{ 
              p: 2, 
              borderTop: `1px solid ${theme.palette.divider}`,
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <Button 
              variant="contained" 
              onClick={handleClose}
              sx={{ 
                bgcolor: scoreColor.main,
                '&:hover': {
                  bgcolor: alpha(scoreColor.main, 0.8)
                }
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ResultsCard;