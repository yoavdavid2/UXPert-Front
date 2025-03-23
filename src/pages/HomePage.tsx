import React from "react";
import {
  Box,
  Button,
  Container,
  Grid2 as Grid,
  Paper,
  Typography,
} from "@mui/material";
import { IFeatureCardProps } from "../utils/types";
import FeatureCard from "../components/FeatureCard";

const EnhanceIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2"
      y="4"
      width="20"
      height="16"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M8 12H16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 8V16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const StreamlineIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2"
      y="4"
      width="20"
      height="16"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M8 10H16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M8 14H16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const HomePage: React.FC = () => {
  const features: IFeatureCardProps[] = [
    {
      icon: <EnhanceIcon />,
      title: "Enhance User Experiences with AI-Powered Insights",
      description:
        "Get actionable feedback and detailed analysis of your website's usability, design and functionality. Our AI module ensures your site resonates with your target audience.",
    },
    {
      icon: <StreamlineIcon />,
      title: "Streamline Your Website Optimization Process",
      description:
        "Simplify your workflow with tailored suggestions to improve UI/UX, boost engagement, and create a lasting impression online.",
    },
  ];

  return (
    <Box
      sx={{
        flexDirection: "column",
      }}
      className="page-layout"
    >
      <Container
        disableGutters
        sx={{
          py: { xs: 4, md: 6 },
          px: { xs: 2, sm: 3, md: 4 },
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          maxWidth: "100% !important",
          width: "100%",
        }}
      >
        <Grid container spacing={4}>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: "2%",
                right: "45%",
                top: "12.7%",
                bottom: "59.82%",
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "#1a237e",
                }}
              >
                Maximizing your website development projects with UXpert
              </Typography>
              <Typography
                variant="subtitle1"
                paragraph
                sx={{
                  color: "#3949ab",
                  mb: 4,
                }}
              >
                Use our advanced AI-Module to run comprehensive and advanced
                tests on the user experiences of your website & more.
              </Typography>

              <Grid container spacing={3} sx={{ mt: 3, flexWrap: "nowrap" }}>
                {features.map((feature, index) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={index}>
                    <FeatureCard
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                    />
                  </Grid>
                ))}
              </Grid>

              <Button
                variant="contained"
                sx={{
                  mt: 4,
                  bgcolor: "#1a237e",
                  color: "white",
                  borderRadius: 8,
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#0d1642",
                  },
                }}
              >
                Get started
              </Button>
            </Box>
          </Grid>

          <Grid
            sx={{ display: { xs: "none", md: "block" } }}
            size={{
              xs: 12,
              md: 6,
              lg: 3,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                bottom: "10%",
                right: "3%",
                width: "30%",
                height: "85%",
                backgroundImage: "url('src/assets/images/homepage.svg')",
                backgroundSize: "contain",
                backgroundPosition: "bottom right",
                backgroundRepeat: "no-repeat",
                zIndex: 1,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
