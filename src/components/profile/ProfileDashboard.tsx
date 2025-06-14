import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Dialog,
  Container,
} from "@mui/material";
import { Add } from "@mui/icons-material";

import AnalysisTimeline from "./AnalysisTimeline";
import StepperCard from "../stepper/StepperCard";
import AnalysisSection from "../results/AnalysisSection";
import DynamicIframeModal from "../layout/DynamicIframeModal";
import { Transition } from "../../pages/HomePage";

import {
  IProfileDashboardProps,
  ProjectDto,
  userRequirmentsSummeryDto,
} from "../../utils/types";
import { Report, OverallEvaluation } from "../../utils/ReportUtils";

import { reportService } from "../../services/reportService";
import "../components.css";

const ProfileDashboard = ({
  selectedProject,
  setGlobalError,
}: IProfileDashboardProps) => {
  const [projectReports, setProjectReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);
  const [openNewProjectDialog, setOpenNewProjectDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const navigate = useNavigate();

  const fetchProjectReports = useCallback(async () => {
    if (!selectedProject?.projectId) return;

    try {
      setLoading(true);
      setSelectedReport(null);
      const reports = await reportService.getReportsByProject(
        selectedProject.projectId
      );
      const sortedReports = reports.reports.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setProjectReports(sortedReports);
      if (sortedReports.length > 0) {
        setSelectedReport(sortedReports[0]);
      }
    } catch (err) {
      console.error("Failed to fetch reports:", err);
      setGlobalError("Failed to load analysis reports");
      setProjectReports([]);
    } finally {
      setLoading(false);
    }
  }, [selectedProject, setGlobalError]);

  useEffect(() => {
    if (selectedProject) {
      fetchProjectReports();
    } else {
      setProjectReports([]);
      setSelectedReport(null);
    }
  }, [selectedProject, fetchProjectReports]);

  const handleCreateProject = () => {
    setOpenNewProjectDialog(true);
  };

  const handleCloseCard = (summary: userRequirmentsSummeryDto | ProjectDto) => {
    setOpenNewProjectDialog(false);
    fetchProjectReports();
    navigate(`/results?link=${summary.url}`, { state: { summery: summary } });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDownloadReport = () => {
    if (selectedReport?.results?.suggested_new_html) {
      const blob = new Blob([selectedReport.results.suggested_new_html], {
        type: "text/html",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "improved-website.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handlePreviewSuggestions = () => {
    if (selectedReport?.results?.suggested_new_html) {
      setShowPreviewDialog(true);
    }
  };

  const convertToOverallEvaluation = (results: any): OverallEvaluation => {
    return {
      category_ratings: (results as any).category_ratings ?? [],
      final_score: results.final_score ?? 0,
      best_thing: results.best_thing ?? "N/A",
      worst_thing: results.worst_thing ?? "N/A",
      suggested_new_html: results.suggested_new_html ?? "",
    };
  };

  return (
    <Box className="dashboard-root" sx={{ overflowY: "auto" }}>
      <Box className="dashboard-header">
        <Box className="dashboard-header-inner">
          <Typography variant="h4" className="dashboard-title">
            Explore the full timeline and insights of your website analysis
          </Typography>
          <Box className="dashboard-header-actions">
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleCreateProject}
              sx={{
                bgcolor: "#1a237e",
                color: "white",
                borderRadius: 2,
                px: 3,
                py: 1,
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(156, 106, 222, 0.3)",
                "&:hover": {
                  bgcolor: "#7E69AC",
                  boxShadow: "0 6px 16px rgba(156, 106, 222, 0.4)",
                },
              }}
            >
              New Analysis
            </Button>
          </Box>
        </Box>
      </Box>

      {selectedProject ? (
        <>
          <Paper elevation={0} className="analysis-wrapper">
            <AnalysisTimeline
              reports={projectReports}
              selectedReport={selectedReport}
              onSelectReport={setSelectedReport}
              loading={loading}
            />
          </Paper>

          {selectedReport?.results && (
            <Box className="results-scroll-area">
              <Container maxWidth="lg" sx={{ pb: 4 }}>
                <AnalysisSection
                  decodedCustomerUrl={selectedReport.url}
                  handleDownloadReport={handleDownloadReport}
                  handlePreviewSuggestions={handlePreviewSuggestions}
                  averageScore={
                    (selectedReport.results as any).category_ratings?.reduce(
                      (sum: number, item: { numeric_rating: number }) =>
                        sum + item.numeric_rating,
                      0
                    ) /
                      (selectedReport.results as any).category_ratings
                        ?.length || 0
                  }
                  analystResult={convertToOverallEvaluation(
                    selectedReport.results
                  )}
                  tabValue={tabValue}
                  handleTabChange={handleTabChange}
                />
              </Container>
            </Box>
          )}
        </>
      ) : (
        <Box className="empty-project-placeholder"></Box>
      )}

      <Dialog
        open={openNewProjectDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenNewProjectDialog(false)}
        aria-describedby="uxpert-card-dialog"
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            m: 2,
            maxHeight: "calc(100% - 64px)",
            overflow: "hidden",
          },
        }}
      >
        <StepperCard onClose={handleCloseCard} />
      </Dialog>

      {selectedReport?.results?.suggested_new_html && (
        <DynamicIframeModal
          code={selectedReport.results.suggested_new_html}
          open={showPreviewDialog}
          onClose={() => setShowPreviewDialog(false)}
        />
      )}
    </Box>
  );
};

export default ProfileDashboard;
