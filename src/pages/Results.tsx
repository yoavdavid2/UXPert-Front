import React, { useEffect, useState } from "react";
import { 
  Box, 
  Grid, 
  Link, 
  Paper, 
  Typography, 
  useTheme, 
  Button, 
  Tabs, 
  Tab,  
  IconButton, 
  Chip,
  Container,
  Divider,
  CircularProgress
} from "@mui/material";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { 
  Download as DownloadIcon, 
  Code as CodeIcon, 
  ArrowBack as ArrowBackIcon,
  ThumbUp as ThumbUpIcon, 
  ThumbDown as ThumbDownIcon,
  OpenInNew as OpenInNewIcon
} from "@mui/icons-material";

import ResultsCard from "../components/ResultsCard";
import { userRequirmentsSummeryDto } from "../utils/types";
import AnimatedModal from "../components/animatedModal";
import { BACKEND_URL } from "../config";
import { OverallEvaluation } from "../types/Report";
import api from "../services/requestsWrapper";
import { reportService } from "../services/reportService";
import DynamicIframeModal from "../components/DynamicIframeModal";

// Loading text messages while user waits for analysis
const loadingTexts = [
  "Analyzing website structure...",
  "Evaluating user experience...",
  "Checking usability principles...",
  "Examining performance metrics...",
  "Analyzing visual design...",
  "Evaluating accessibility...",
  "Generating recommendations...",
  "Finalizing report..."
];

const ResultsPage = () => {
  const location = useLocation();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [currentLoadingText, setCurrentLoadingText] = useState("Analyzing your website...");
  const [analystResult, setAnalystResult] = useState<OverallEvaluation | undefined>(undefined);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  
  const state = (location.state as { summery?: userRequirmentsSummeryDto }) || {};
  const decodedCustomerUrl = searchParams.get("link") || "";
  const reportId = searchParams.get("reportId");

  useEffect(() => {
    // Case 1: Loading from an existing report ID
    if (reportId) {
      setCurrentLoadingText("Loading report data...");
      
      reportService.getReportById(reportId)
        .then(report => {
          if (report && report.results) {
            setAnalystResult(report.results as unknown as OverallEvaluation);
          } else {
            throw new Error("Report data is incomplete");
          }
        })
        .catch(error => {
          console.error("Error fetching report:", error);
          Swal.fire({
            icon: "error",
            title: "Unable to load report",
            text: "Failed to load the report data. Redirecting to homepage...",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 3000);
        })
        .finally(() => {
          setIsLoading(false);
        });
      
      return;
    }
    
    // Case 2: Creating a new analysis
    if (!decodedCustomerUrl) {
      Swal.fire({
        icon: "error",
        title: "Missing URL",
        text: "No website URL provided. Redirecting to homepage...",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);
      return;
    } 

    // Cycle through loading messages 
    let currentTextIndex = 0;
    const loadingTextInterval = setInterval(() => {
      setCurrentLoadingText(loadingTexts[currentTextIndex % loadingTexts.length]);
      currentTextIndex++;
    }, 3000);
    
    // Run new analysis
    setTimeout(() => {
      api
        .post(BACKEND_URL + "/api/website/analyze", {
          url: decodedCustomerUrl,
          name: decodedCustomerUrl.split("/")[2],
          categories: state.summery?.categories,
          audience: state.summery?.audience,
          emotions: state.summery?.emotions,
          purpose: state.summery?.purpose,
          includeScreenshots: false,
          deepAnalysis: false,
        })
        .then((response) => {
          if (
            response.data == undefined ||
            response.data == null ||
            response.data == ""
          ) {
            Swal.fire({
              icon: "error",
              title: "An error occurred",
              text: "Error parsing response",
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            setTimeout(() => {
              navigate("/", { replace: true });
            }, 3000);
          } else {
            setAnalystResult(response.data);
          }
        })
        .catch((e) => {
          console.log(e);
          Swal.fire({
            icon: "error",
            title: "Unable to analyze",
            text: "An error occurred while analyzing your website. Redirecting to homepage...",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 3000);
        })
        .finally(() => {
          setIsLoading(false);
          clearInterval(loadingTextInterval);
        });
    }, 2000);
    
    return () => clearInterval(loadingTextInterval);
  }, [decodedCustomerUrl, reportId, navigate, state]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Implementation for downloading results as PDF - still in progress***
  const handleDownloadReport = () => {
    Swal.fire({
      icon: 'info',
      title: 'Preparing Download',
      text: 'Your report is being prepared for download...',
      timer: 2000,
      showConfirmButton: false
    });
  };
  
  const handlePreviewSuggestions = () => {
    setShowPreviewDialog(true);
  };

  if (isLoading || !analystResult) {
    return (
      <Box
        className="page-layout"
        sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          height: "100vh",
          width: "100%"
        }}
      >
        <AnimatedModal currentText={currentLoadingText}></AnimatedModal>
      </Box>
    );
  }

  // Calculate average score 
  const averageScore = analystResult.category_ratings.reduce(
    (sum, item) => sum + item.numeric_rating, 0
  ) / analystResult.category_ratings.length;

  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden"
      }}
    >
      <Box
        sx={{ 
          width: "100%", 
          minHeight: "100vh",
          bgcolor: "#f7f9fc",
          pb: 6,
          overflowY: "auto",
        }}
      >
        {/* Header with navigation */}
        <Box 
          sx={{ 
            py: 1.5,
            px: 3,
            bgcolor: "white",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            mb: 4,
            display: "flex",
            alignItems: "center"
          }}
        >
          <IconButton 
            onClick={() => navigate("/")} 
            sx={{ mr: 2, color: theme.palette.primary.main }}
          >
            <ArrowBackIcon />
          </IconButton>
          
          <Box
            component="img"
            src="/logo.svg"
            alt="UXpert Logo"
            sx={{ height: 40 }}
          />
          
          <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
            <Button
              component={Link}
              href={decodedCustomerUrl}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<OpenInNewIcon />}
              variant="text"
              sx={{ mr: 1 }}
            >
              Visit site
            </Button>
          </Box>
        </Box>

        {/* Main content container */}
        <Container maxWidth="lg" sx={{pb:8}}>
          {/* Website info and actions */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Paper
              elevation={0}
              sx={{ 
                p: 3, 
                mb: 3, 
                borderRadius: 2,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                border: "1px solid rgba(0,0,0,0.05)"
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" }}>
                <Box>
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                    ANALYSIS RESULTS FOR: {" "}
                  </Typography>
                  <Typography 
                    variant="h5" 
                    component="h1"
                    sx={{ 
                      fontWeight: 600,
                      color: "black",
                      maxWidth: { xs: "100%", sm: "500px" },
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {decodedCustomerUrl}
                  </Typography>
                </Box>
                
                <Box sx={{ display: "flex", mt: { xs: 2, sm: 0 }, flexWrap: "wrap" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<DownloadIcon />}
                    onClick={handleDownloadReport}
                    sx={{ 
                      mr: 1, 
                      mb: { xs: 1, sm: 0 },
                      borderRadius: 1.5
                    }}
                  >
                    Download
                  </Button>
                  
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<CodeIcon />}
                    onClick={handlePreviewSuggestions}
                    sx={{ 
                      borderRadius: 1.5,
                      mb: { xs: 1, sm: 0 },
                    }}
                  >
                    Preview Suggestions
                  </Button>
                </Box>
              </Box>
            </Paper>
          </motion.div>

          {/* Overall score card */}
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
                background: "linear-gradient(145deg, #ffffff 0%, #f9faff 100%)"
              }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center",
                    py: 1
                  }}>
                    <Typography variant="h6" sx={{ color: "text.secondary", mb: 1 }}>
                      Overall Score - Category Avg
                    </Typography>
                    
                    <Box sx={{ position: "relative", display: "inline-flex" }}>
                      <CircularProgress
                        variant="determinate"
                        value={analystResult.final_score}
                        size={120}
                        thickness={5}
                        sx={{
                          color: theme.palette.primary.main,
                          '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                          },
                        }}
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: 'absolute',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          variant="h3"
                          component="div"
                          sx={{ fontWeight: 700 }}
                        >
                          {averageScore.toFixed(1)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={8}>
                  <Box>
                    <Box sx={{ 
                      display: "flex", 
                      alignItems: "flex-start", 
                      mb: 3,
                      p: 2,
                      bgcolor: "rgba(76, 175, 80, 0.08)",
                      borderRadius: 2,
                      border: "1px solid rgba(76, 175, 80, 0.2)"
                    }}>
                      <ThumbUpIcon sx={{ color: "success.main", mr: 2, mt: 0.5 }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "success.main", mb: 0.5 }}>
                          Best Feature
                        </Typography>
                        <Typography variant="body2">
                          {analystResult.best_thing}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ 
                      display: "flex", 
                      alignItems: "flex-start",
                      p: 2,
                      bgcolor: "rgba(239, 83, 80, 0.08)",
                      borderRadius: 2,
                      border: "1px solid rgba(239, 83, 80, 0.2)"
                    }}>
                      <ThumbDownIcon sx={{ color: "error.main", mr: 2, mt: 0.5 }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "error.main", mb: 0.5 }}>
                          Area for Improvement
                        </Typography>
                        <Typography variant="body2">
                          {analystResult.worst_thing}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>

          {/* Tab navigation */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Paper
              elevation={0}
              sx={{ 
                mb: 3, 
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                border: "1px solid rgba(0,0,0,0.05)"
              }}
            >
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                  bgcolor: "white",
                  "& .MuiTab-root": {
                    py: 2,
                    fontWeight: 600,
                    color: "text.secondary",
                    "&.Mui-selected": {
                      color: "primary.main",
                    }
                  },
                  "& .MuiTabs-indicator": {
                    height: 3,
                    borderRadius: "3px 3px 0 0"
                  }
                }}
              >
                <Tab label="Overview" />
                <Tab label="Detailed Analysis" />
                <Tab label="Improvement Suggestions" />
              </Tabs>
            </Paper>
          </motion.div>

           {/* Tab content */}
           <Box
             sx={{
               mt: 3,
               maxHeight: '70vh',      
               overflowY: 'auto',      
               pr: 1,
               mb: 6,                  
             }}
           >
            {tabValue === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 3,
                    color: "text.primary"
                  }}
                >
                  Category Scores
                </Typography>
                
                <Grid container spacing={3}>
                  {analystResult.category_ratings.map((category, index) => (
                    <Grid 
                      item 
                      xs={12} 
                      sm={6} 
                      md={4} 
                      key={index}
                      component={motion.div}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                      <ResultsCard
                        numeric_rating={category.numeric_rating}
                        category={category.category}
                        text_rating={category.text_rating}
                        improvement_suggestions={category.improvement_suggestions}
                      />
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            )}
            
            {/* Detailed Analysis Tab */}
            {tabValue === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {analystResult.category_ratings.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 3, 
                        mb: 3, 
                        borderRadius: 2,
                        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                        border: "1px solid rgba(0,0,0,0.05)"
                      }}
                    >
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
                            mr: 2
                          }}
                        >
                          {category.numeric_rating}
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {category.category}
                        </Typography>
                      </Box>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Typography variant="body1" paragraph>
                        {category.text_rating}
                      </Typography>
                      
                      {category.improvement_suggestions.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            Improvement Suggestions
                          </Typography>
                          
                          {category.improvement_suggestions.map((suggestion, i) => (
                            <Box 
                              key={i} 
                              sx={{ 
                                p: 2, 
                                mb: 2, 
                                bgcolor: "rgba(0,0,0,0.02)",
                                borderRadius: 2,
                                borderLeft: `4px solid ${theme.palette.primary.main}`
                              }}
                            >
                              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                                {suggestion.improvement}
                              </Typography>
                              
                              <Grid container spacing={2}>
                                <Grid item xs={6}>
                                  <Typography variant="caption" color="text.secondary">
                                    Importance
                                  </Typography>
                                  <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Box 
                                      sx={{ 
                                        width: `${suggestion.importance * 10}%`,
                                        height: 6,
                                        bgcolor: theme.palette.primary.main,
                                        borderRadius: 1,
                                        mr: 1,
                                        maxWidth: "80%"
                                      }} 
                                    />
                                    <Typography variant="caption" fontWeight="bold">
                                      {suggestion.importance}/10
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
                                        width: `${suggestion.expected_improvement * 10}%`,
                                        height: 6,
                                        bgcolor: theme.palette.success.main,
                                        borderRadius: 1,
                                        mr: 1,
                                        maxWidth: "80%"
                                      }} 
                                    />
                                    <Typography variant="caption" fontWeight="bold">
                                      {suggestion.expected_improvement}/10
                                    </Typography>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Paper>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {/* Improvement Suggestions Tab */}
            {tabValue === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    mb: 3, 
                    borderRadius: 2,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    border: "1px solid rgba(0,0,0,0.05)"
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      HTML Preview and Suggestions
                    </Typography>
                    
                    <Button
                      variant="contained"
                      startIcon={<CodeIcon />}
                      onClick={handlePreviewSuggestions}
                      sx={{ borderRadius: 1.5 }}
                    >
                      Preview Improved Design
                    </Button>
                  </Box>
                  
                  <Divider sx={{ mb: 3 }} />
                  
                  <Typography variant="body2" paragraph>
                    We've analyzed your website and generated an improved HTML version with better UX practices applied.
                    Click the button above to preview the suggested improvements.
                  </Typography>
                </Paper>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 2,
                    mt: 4,
                    color: 'black'
                  }}
                >
                  Top Improvement Suggestions
                </Typography>
                
                {analystResult.category_ratings
                  .flatMap(category => 
                    category.improvement_suggestions.map(suggestion => ({
                      ...suggestion,
                      category: category.category
                    }))
                  )
                  .sort((a, b) => b.importance * b.expected_improvement - a.importance * a.expected_improvement)
                  .map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 3, 
                          mb: 2, 
                          borderRadius: 2,
                          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                          border: "1px solid rgba(0,0,0,0.05)"
                        }}
                      >
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <Box>
                            <Chip 
                              label={suggestion.category} 
                              size="small" 
                              sx={{ 
                                mb: 1, 
                                fontWeight: 500,
                                bgcolor: theme.palette.primary.light,
                                color: theme.palette.primary.contrastText
                              }} 
                            />
                            
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                              {suggestion.improvement}
                            </Typography>
                          </Box>
                          
                          
                        </Box>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: "block" }}>
                              Importance: {suggestion.importance}/10
                            </Typography>
                            <Box sx={{ 
                              width: "100%", 
                              height: 8, 
                              bgcolor: "rgba(0,0,0,0.05)", 
                              borderRadius: 1,
                              overflow: "hidden"
                            }}>
                              <Box 
                                sx={{ 
                                  width: `${suggestion.importance * 10}%`, 
                                  height: "100%", 
                                  bgcolor: theme.palette.primary.main,
                                  borderRadius: 1
                                }}
                              />
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: "block" }}>
                              Expected Improvement: {suggestion.expected_improvement}/10
                            </Typography>
                            <Box sx={{ 
                              width: "100%", 
                              height: 8, 
                              bgcolor: "rgba(0,0,0,0.05)", 
                              borderRadius: 1,
                              overflow: "hidden"
                            }}>
                              <Box 
                                sx={{ 
                                  width: `${suggestion.expected_improvement * 10}%`, 
                                  height: "100%", 
                                  bgcolor: theme.palette.success.main,
                                  borderRadius: 1
                                }}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    </motion.div>
                  ))}
              </motion.div>
            )}
          </Box>
        </Container>
      </Box>
      
      {/* Modal for HTML preview */}
      {analystResult.suggested_mew_html && (
        <DynamicIframeModal 
          code={analystResult.suggested_mew_html} 
          open={showPreviewDialog}
          onClose={() => setShowPreviewDialog(false)}
        />
      )}
    </motion.div>
  );
};

export default ResultsPage;