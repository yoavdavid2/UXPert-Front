import React, { useEffect, useState } from "react";
import { Box, Grid, Link, Paper, Typography, useTheme } from "@mui/material";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import ResultsCard from "../components/ResultsCard";
import { userRequirmentsSummeryDto } from "../utils/types";
import AnimatedModal from "../components/animatedModal";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { OverallEvaluation } from "../types/Report";
import DynamicIframeModal from "../components/DynamicIframeModal";

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const state =
    (location.state as { summery?: userRequirmentsSummeryDto }) || {};
  const theme = useTheme();
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [currentLoadingText, setCurrentLoadingText] =
    useState<string>("Loading...");
  const [analystResult, setAnalystResult] = useState<
    OverallEvaluation | undefined
  >(undefined);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const decodedCustomerUrl = searchParams.get("link") || "";

  useEffect(() => {
    if (!decodedCustomerUrl) {
      Swal.fire({
        icon: "error",
        title: "Missing URL",
        text: "No customer URL provided. Redirecting to homepage...",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);
    } else {
      setTimeout(() => {
        axios
          .post(BACKEND_URL + "/api/website/analyze", {
            url: decodedCustomerUrl,
            name: "College of Management",
            includeScreenshots: false,
            deepAnalysis: false,
          })
          .then((response) => {
            console.log(response.data);
            setAnalystResult(response.data);
          })
          .finally(() => {
            setIsLoaded(true);
          });
      }, 3000);
    }
  }, [decodedCustomerUrl, navigate]);

  return isLoaded && analystResult != undefined ? (
    <Box
      className="page-layout"
      sx={{ display: "flex", flexDirection: "column", gap: '30px' }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "black",
          fontSize: {
            xs: "1.75rem",
            sm: "2.25rem",
            md: "2.5rem",
            lg: "3rem",
            [theme.breakpoints.between("sm", "lg")]: "2.25rem",
          },
          lineHeight: 1.2,
        }}
      >
        Analysis result for:{" "}
        <Link
          href={decodedCustomerUrl}
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          sx={{ fontSize: "1.5rem", textDecoration: "underline" }}
        >
          {decodedCustomerUrl}
        </Link>
      </Typography>
      <DynamicIframeModal code={analystResult.suggested_mew_html} />
      <Paper
        elevation={3}
        sx={{
          border: "1px solid black",
          minHeight: "70%",
          maxWidth: "65%",
          margin: "auto",
          display: "flex",
          borderRadius: "10px",
          padding: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          sx={{ width: "100%", height: "100%" }}
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          {analystResult.category_ratings.map((category) => (
            <Grid
              item
              xs={2.4}
              sx={{ display: "flex", justifyContent: "center" }}
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
      </Paper>
    </Box>
  ) : (
    <Box
      className="page-layout"
      sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}
    >
      <AnimatedModal currentText={currentLoadingText}></AnimatedModal>
    </Box>
  );
};

export default ResultsPage;
