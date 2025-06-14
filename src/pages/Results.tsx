import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { Box, Link, useTheme, Button, IconButton } from "@mui/material";
import { ArrowBack, OpenInNew } from "@mui/icons-material";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import { BACKEND_URL } from "../config";
import { userRequirmentsSummeryDto } from "../utils/types";
import { OverallEvaluation } from "../utils/ReportUtils";
import AnimatedModal from "../components/layout/animatedModal";
import DynamicIframeModal from "../components/layout/DynamicIframeModal";
import AnalysisSection from "../components/results/AnalysisSection";
import api from "../services/requestsWrapper";
import { reportService } from "../services/reportService";
import { loadingTexts } from "../constants/loadingTexts";

const ResultsPage = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [currentLoadingText, setCurrentLoadingText] = useState(
    "Analyzing your website..."
  );
  const [analystResult, setAnalystResult] = useState<
    OverallEvaluation | undefined
  >(undefined);
  const [tabValue, setTabValue] = useState(0);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);

  const state =
    (location.state as { summery?: userRequirmentsSummeryDto }) || {};
  const decodedCustomerUrl = searchParams.get("link") || "";
  const reportId = searchParams.get("reportId");

  const showErrorAndRedirect = (title: string, text: string) => {
    Swal.fire({
      icon: "error",
      title,
      text: `${text} Redirecting to homepage...`,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);
  };

  useEffect(() => {
    // Case 1: Loading from an existing report ID
    if (reportId) {
      setCurrentLoadingText("Loading report data...");

      reportService
        .getReportById(reportId)
        .then((report) => {
          if (report && report.results) {
            setAnalystResult(report.results as unknown as OverallEvaluation);
          } else {
            throw new Error("Report data is incomplete");
          }
        })
        .catch(() => {
          showErrorAndRedirect(
            "Unable to load report",
            "Failed to load the report data."
          );
        })
        .finally(() => {
          setIsLoading(false);
        });

      return;
    }

    // Case 2: Creating a new analysis
    if (!decodedCustomerUrl) {
      showErrorAndRedirect("Missing URL", "No website URL provided.");
      return;
    }

    let currentTextIndex = 0;
    const loadingTextInterval = setInterval(() => {
      setCurrentLoadingText(
        loadingTexts[currentTextIndex % loadingTexts.length]
      );
      currentTextIndex++;
    }, 3000);

    const timeoutId = setTimeout(() => {
      api
        .post(BACKEND_URL + "/api/website/analyze", {
          projectId: state.summery?.projectId,
          url: decodedCustomerUrl,
          name: decodedCustomerUrl.split("/")[2],
          categories: state.summery?.categories,
          audience: state.summery?.audience,
          emotions: state.summery?.emotions,
          purpose: state.summery?.purpose,
          includeScreenshots: false,
          deepAnalysis: false,
        })
        .then((response: any) => {
          if (!response.data) {
            showErrorAndRedirect(
              "Error parsing response",
              "An error occurred while parsing the analysis result."
            );
          } else {
            setAnalystResult(response.data);
          }
        })
        .catch(() => {
          showErrorAndRedirect(
            "Unable to analyze",
            "An error occurred while analyzing your website."
          );
        })
        .finally(() => {
          setIsLoading(false);
          clearInterval(loadingTextInterval);
        });
    }, 2000);

    return () => {
      clearInterval(loadingTextInterval);
      clearTimeout(timeoutId);
    };
  }, [decodedCustomerUrl, reportId, navigate, state]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Implementation for downloading HTML file
  const handleDownloadReport = () => {
    if (analystResult?.suggested_new_html) {
      const blob = new Blob([analystResult.suggested_new_html], {
        type: "text/html",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "uxpert.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: "No analysis HTML found to download.",
      });
    }
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
          width: "100%",
        }}
      >
        <AnimatedModal currentText={currentLoadingText}></AnimatedModal>
      </Box>
    );
  }

  const averageScore =
    analystResult.category_ratings.reduce(
      (sum, item) => sum + item.numeric_rating,
      0
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
        overflow: "hidden",
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
        <Box
          sx={{
            py: 1.5,
            px: 3,
            bgcolor: "white",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            mb: 4,
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ mr: 2, color: theme.palette.primary.main }}
          >
            <ArrowBack />
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
              startIcon={<OpenInNew />}
              variant="text"
              sx={{ mr: 1 }}
            >
              Visit site
            </Button>
          </Box>
        </Box>

        <AnalysisSection
          decodedCustomerUrl={decodedCustomerUrl}
          handleDownloadReport={handleDownloadReport}
          handlePreviewSuggestions={handlePreviewSuggestions}
          averageScore={averageScore}
          analystResult={analystResult}
          tabValue={tabValue}
          handleTabChange={handleTabChange}
        />
      </Box>

      {analystResult.suggested_new_html && (
        <DynamicIframeModal
          code={analystResult.suggested_new_html}
          open={showPreviewDialog}
          onClose={() => setShowPreviewDialog(false)}
        />
      )}
    </motion.div>
  );
};

export default ResultsPage;
