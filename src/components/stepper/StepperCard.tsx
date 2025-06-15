import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Breadcrumbs,
} from "@mui/material";
import TargetsStep from "./TargetsStep";
import EmotionsStep from "./EmotionsStep";
import FinalDataStep from "./FinalDataStep";

import {
  IStepperCardProps,
  ProjectDto,
  userRequirmentsSummeryDto,
} from "../../utils/types";

import "../components.css";
import ChooseProjectStep from "./ChooseProjectStep";
import api from "../../services/requestsWrapper";

const StepperCard = ({ onClose }: IStepperCardProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [animationClass, setAnimationClass] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [userProfile, setUserProfile] = useState(
    localStorage.getItem("userProfile")
      ? JSON.parse(localStorage.getItem("userProfile")!)
      : null
  );

  // State for step 0
  const [selectedProject, setSelectedProject] = useState<ProjectDto | null>(
    null
  );

  // State for step 1
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAudience, setSelectedAudience] = useState<string[]>([]);

  // State for step 2
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

  // State for step 3
  const [websitePurpose, setWebsitePurpose] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleAudience = (audience: string) => {
    if (selectedAudience.includes(audience)) {
      setSelectedAudience(selectedAudience.filter((item) => item !== audience));
    } else {
      setSelectedAudience([...selectedAudience, audience]);
    }
  };

  const toggleEmotion = (emotion: string) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter((item) => item !== emotion));
    } else {
      setSelectedEmotions([...selectedEmotions, emotion]);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage === activeStep || isTransitioning) return;

    const isGoingForward = newPage > activeStep;
    setAnimationClass(isGoingForward ? "slide-out-left" : "slide-out-right");
    setIsTransitioning(true);

    setTimeout(() => {
      setActiveStep(newPage);
      setAnimationClass(isGoingForward ? "slide-in-right" : "slide-in-left");
    }, 400);
  };

  useEffect(() => {
    if (isTransitioning) {
      const resetTimer = setTimeout(() => {
        setAnimationClass("");
        setIsTransitioning(false);
      }, 400);

      return () => clearTimeout(resetTimer);
    }
  }, [isTransitioning, animationClass]);

  const getCurrentStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <ChooseProjectStep
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
        );
      case 1:
        return (
          <TargetsStep
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            selectedAudience={selectedAudience}
            toggleAudience={toggleAudience}
          />
        );
      case 2:
        return (
          <EmotionsStep
            selectedEmotions={selectedEmotions}
            toggleEmotion={toggleEmotion}
          />
        );
      case 3:
        return (
          <FinalDataStep
            websitePurpose={websitePurpose}
            setWebsitePurpose={setWebsitePurpose}
            websiteUrl={websiteUrl}
            setWebsiteUrl={setWebsiteUrl}
          />
        );
      default:
        return null;
    }
  };

  const buildSummery = (): userRequirmentsSummeryDto => {
    const result: userRequirmentsSummeryDto = {
      userId: userProfile ? userProfile.id : "0",
      email: userProfile ? userProfile.email : "0",
      url: websiteUrl,
      name: userProfile ? userProfile.websiteUrl : "0",
      categories: selectedCategories,
      audience: selectedAudience,
      emotions: selectedEmotions,
      purpose: websitePurpose,
    };

    return result;
  };

  function finishTheProcess() {
    const summary = buildSummery();
    // TODO: send the summary to the backend and create new project
    // For now, just log it to the console
    api
      .post("/api/projects/new", summary)
      .then((response: any) => {
        onClose(response.data);
      })
      .catch((error: any) => {
        console.error("Error creating project:", error);
      });
  }

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 3,
        overflow: "visible",
        mt: 2,
      }}
    >
      <CardContent sx={{ p: 4, pt: 6 }}>
        <Typography variant="h5" component="div" gutterBottom>
          Let's start!
        </Typography>

        <Box
          sx={{
            position: "relative",
            overflowX: "hidden",
            overflowY: "auto",
            minHeight: "400px",
          }}
        >
          <Box className={`step-content ${animationClass}`}>
            {getCurrentStep()}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 6,
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Breadcrumbs>
              {[1, 2, 3, 4].map((_, i) => (
                <Button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  disabled={i === activeStep || isTransitioning}
                  sx={{
                    fontWeight: i === activeStep ? "bold" : "normal",
                    color: i === activeStep ? "primary.main" : "text.secondary",
                  }}
                >
                  {i + 1}
                </Button>
              ))}
            </Breadcrumbs>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            {activeStep > 0 && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handlePageChange(activeStep - 1)}
                disabled={isTransitioning}
                sx={{ borderRadius: 28, px: 3 }}
              >
                BACK
              </Button>
            )}
            {selectedProject ? (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  onClose(selectedProject);
                }}
                disabled={isTransitioning}
                sx={{ borderRadius: 28, px: 3 }}
              >
                New analysis
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={
                  activeStep < 3
                    ? () => handlePageChange(activeStep + 1)
                    : () => finishTheProcess()
                }
                disabled={isTransitioning}
                sx={{ borderRadius: 28, px: 3 }}
              >
                {activeStep == 0 ? (
                  "New Project"
                ) : (
                  <>{activeStep < 3 ? "NEXT" : "FINISH"}</>
                )}
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StepperCard;
