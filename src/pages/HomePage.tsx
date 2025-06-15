import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  Dialog,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import {
  IFeatureCardProps,
  ProjectDto,
  userRequirmentsSummeryDto,
} from "../utils/types";
import FeatureCard from "../components/layout/FeatureCard";
import StepperCard from "../components/stepper/StepperCard";
import { EnhanceIcon, StreamlineIcon } from "../components/layout/Icons";
import { useAuth } from "../utils/AuthContext";

export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const [openCard, setOpenCard] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const features: Partial<IFeatureCardProps>[] = [
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

  const handleOpenCard = () => {
    setOpenCard(true);
  };

  const handleCloseCard = (summary: userRequirmentsSummeryDto | ProjectDto) => {
    setOpenCard(false);
    navigate(`/results?link=${summary.url}`, { state: { summery: summary } });
  };

  return (
    <Box className="page-layout">
      <Container
        disableGutters
        sx={{
          py: { xs: 3, sm: 4, md: 6 },
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          maxWidth: "100% !important",
          width: "100%",
        }}
      >
        <Grid container spacing={{ xs: 2, sm: 3, md: 5 }}>
          <Grid
            item
            xs={12}
            md={6}
            lg={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: isTablet ? "center" : "flex-start",
              textAlign: isTablet ? "center" : "left",
            }}
          >
            <Box
              sx={{
                py: { xs: 1, sm: 2 },
                px: { xs: 2, sm: "6%", md: "8%" },
                maxWidth: { md: "95%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant={isMobile ? "h4" : isTablet ? "h4" : "h2"}
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "#1a237e",
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
                Maximize your website development projects with UXpert
              </Typography>

              <Typography
                variant="subtitle1"
                component="p"
                sx={{
                  color: "#3949ab",
                  mb: { xs: 3, sm: 4 },
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1rem",
                    md: "1.15rem",
                  },
                  [theme.breakpoints.between("sm", "lg")]: {
                    fontSize: "1rem",
                    marginBottom: "2rem",
                  },
                }}
              >
                Use our advanced AI-Module to run comprehensive and advanced
                tests on the user experiences of your website & more.
              </Typography>

              <Box
                sx={{
                  mt: { xs: 3, sm: 4, md: 5 },
                  mb: { xs: 3, sm: 4 },
                }}
              >
                <Grid container spacing={{ xs: 2, sm: 3 }}>
                  {features.map((feature, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={isTablet ? 12 : 6}
                      md={6}
                      key={index}
                      sx={{
                        textAlign: isTablet ? "center" : "left",
                        [theme.breakpoints.between("sm", "lg")]: {
                          paddingLeft: "10px",
                          paddingRight: "10px",
                        },
                      }}
                    >
                      <FeatureCard
                        icon={feature.icon}
                        title={feature.title || ""}
                        description={feature.description || ""}
                        isLargeScreen={!isTablet && !isMobile}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Button
                variant="contained"
                size={isMobile ? "medium" : "large"}
                sx={{
                  mt: { xs: 2, sm: 4 },
                  bgcolor: "#1a237e",
                  color: "white",
                  borderRadius: 8,
                  px: { xs: 3, sm: 4, md: 5 },
                  py: { xs: 1, sm: 1.5, md: 2 },
                  textTransform: "none",
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                  "&:hover": {
                    bgcolor: "#0d1642",
                  },
                  alignSelf: "center",
                }}
                onClick={
                  isAuthenticated ? handleOpenCard : () => navigate("/auth")
                }
              >
                {isAuthenticated ? "New Analysis" : "Get started"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Dialog
        open={openCard}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseCard}
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
    </Box>
  );
};

export default HomePage;
