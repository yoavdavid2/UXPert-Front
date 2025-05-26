//this component is used to display the analysis results of a website
//use for Results page
import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Code } from "@mui/icons-material";
import { motion } from "framer-motion";

import ResultsCard from "../layout/ResultsCard";
import OverallScoreCard from "./OverallScoreCard";
import DetailedAnalysisSection from "./DetailedAnalysisSection";
import ImprovementSuggestionsSection from "./ImprovementSuggestionsSection";

import { OverallEvaluation } from "../../types/Report";

interface AnalysisSectionProps {
  decodedCustomerUrl: string;
  handleDownloadReport: () => void;
  handlePreviewSuggestions: () => void;
  averageScore: number;
  analystResult: OverallEvaluation;
  tabValue: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const AnalysisSection = ({
  decodedCustomerUrl,
  handleDownloadReport,
  handlePreviewSuggestions,
  averageScore,
  analystResult,
  tabValue,
  handleTabChange,
}: AnalysisSectionProps) => {
  return (
    <Container maxWidth="lg" sx={{ pb: 8 }}>
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
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                ANALYSIS RESULTS FOR:
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
                  whiteSpace: "nowrap",
                }}
              >
                {decodedCustomerUrl}
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", mt: { xs: 2, sm: 0 }, flexWrap: "wrap" }}
            >
              <Button
                variant="outlined"
                size="small"
                onClick={handleDownloadReport}
                sx={{ mr: 1, mb: { xs: 1, sm: 0 }, borderRadius: 1.5 }}
              >
                Download
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<Code />}
                onClick={handlePreviewSuggestions}
                sx={{ borderRadius: 1.5, mb: { xs: 1, sm: 0 } }}
              >
                Preview Suggestions
              </Button>
            </Box>
          </Box>
        </Paper>
      </motion.div>

      {/* Overall score card */}
      <OverallScoreCard
        averageScore={averageScore}
        bestThing={analystResult.best_thing}
        worstThing={analystResult.worst_thing}
      />

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
            border: "1px solid rgba(0,0,0,0.05)",
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
                "&.Mui-selected": { color: "primary.main" },
              },
              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: "3px 3px 0 0",
              },
            }}
          >
            <Tab label="Overview" />
            <Tab label="Detailed Analysis" />
            <Tab label="Improvement Suggestions" />
          </Tabs>
        </Paper>
      </motion.div>

      {/* Tab content */}
      <Box sx={{ mt: 3, maxHeight: "70vh", overflowY: "auto", pr: 1, mb: 6 }}>
        {/* Overview */}
        {tabValue === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              mb={3}
              color="text.primary"
            >
              Category Scores
            </Typography>
            <Grid container spacing={3}>
              {analystResult.category_ratings.map((cat, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <ResultsCard {...cat} />
                </Grid>
              ))}
            </Grid>
          </motion.div>
        )}

        {/* Detailed Analysis */}
        {tabValue === 1 && (
          <DetailedAnalysisSection
            categoryRatings={analystResult.category_ratings}
          />
        )}

        {/* Improvement Suggestions */}
        {tabValue === 2 && (
          <ImprovementSuggestionsSection
            categoryRatings={analystResult.category_ratings}
            onPreview={handlePreviewSuggestions}
          />
        )}
      </Box>
    </Container>
  );
};

export default AnalysisSection;
