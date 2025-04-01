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

import { IStepperCardProps, userRequirmentsSummeryDto } from "../../utils/types";

const StepperCard = ({ onClose }: IStepperCardProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);
  const [animationDirection, setAnimationDirection] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  // State for step 1
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAudience, setSelectedAudience] = useState<string[]>([]);

  // State for step 2
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

  // State for step 3
  const [websitePurpose, setWebsitePurpose] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

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

  const handlePageChange = (page: number) => {
    if (page !== activeStep && !isAnimating) {
      setPreviousStep(activeStep);
      setAnimationDirection(page > activeStep ? "forward" : "backward");
      setIsAnimating(true);
      setActiveStep(page);
    }
  };

  const buildSummery = (): userRequirmentsSummeryDto => {
    const result: userRequirmentsSummeryDto = {
      audience: selectedAudience,
      categories: selectedCategories,
      emotions: selectedEmotions,
      purpose: websiteUrl,
      url: websiteUrl
    }

    return result
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
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              opacity: activeStep === 0 ? 1 : 0,
              transform: (() => {
                if (activeStep === 0) return "translateX(0)";
                if (previousStep === 0 && isAnimating) {
                  return animationDirection === "forward"
                    ? "translateX(-100%)"
                    : "translateX(100%)";
                }
                return "translateX(0)";
              })(),
              zIndex: activeStep === 0 ? 10 : 0,
              display:
                activeStep === 0 || (previousStep === 0 && isAnimating)
                  ? "block"
                  : "none",
              transition:
                "transform 500ms ease-in-out, opacity 500ms ease-in-out",
            }}
          >
            <TargetsStep
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              selectedAudience={selectedAudience}
              toggleAudience={toggleAudience}
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              opacity: activeStep === 1 ? 1 : 0,
              transform: (() => {
                if (activeStep === 1) return "translateX(0)";
                if (previousStep === 1 && isAnimating) {
                  return animationDirection === "forward"
                    ? "translateX(-100%)"
                    : "translateX(100%)";
                }
                if (
                  isAnimating &&
                  ((previousStep === 0 &&
                    activeStep === 1 &&
                    animationDirection === "forward") ||
                    (previousStep === 2 &&
                      activeStep === 1 &&
                      animationDirection === "backward"))
                ) {
                  return animationDirection === "forward"
                    ? "translateX(100%)"
                    : "translateX(-100%)";
                }
                return "translateX(0)";
              })(),
              zIndex: activeStep === 1 ? 10 : 0,
              display:
                activeStep === 1 ||
                previousStep === 1 ||
                (isAnimating &&
                  ((previousStep === 0 && activeStep === 1) ||
                    (previousStep === 2 && activeStep === 1)))
                  ? "block"
                  : "none",
              transition:
                "transform 500ms ease-in-out, opacity 500ms ease-in-out",
            }}
          >
            <EmotionsStep
              selectedEmotions={selectedEmotions}
              toggleEmotion={toggleEmotion}
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              opacity: activeStep === 2 ? 1 : 0,
              transform: (() => {
                if (activeStep === 2) return "translateX(0)";
                if (previousStep === 2 && isAnimating) {
                  return animationDirection === "forward"
                    ? "translateX(-100%)"
                    : "translateX(100%)";
                }
                if (
                  isAnimating &&
                  previousStep === 1 &&
                  activeStep === 2 &&
                  animationDirection === "forward"
                ) {
                  return "translateX(100%)";
                }
                return "translateX(0)";
              })(),
              zIndex: activeStep === 2 ? 10 : 0,
              display:
                activeStep === 2 ||
                previousStep === 2 ||
                (isAnimating && previousStep === 1 && activeStep === 2)
                  ? "block"
                  : "none",
              transition:
                "transform 500ms ease-in-out, opacity 500ms ease-in-out",
            }}
          >
            <FinalDataStep
              websitePurpose={websitePurpose}
              setWebsitePurpose={setWebsitePurpose}
              websiteUrl={websiteUrl}
              setWebsiteUrl={setWebsiteUrl}
            />
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
              {[1, 2, 3].map((_, i) => (
                <Button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  disabled={i === activeStep}
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
                sx={{ borderRadius: 28, px: 3 }}
              >
                BACK
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={
                activeStep < 3
                  ? () => handlePageChange(activeStep + 1)
                  : onClose(buildSummery())
              }
              sx={{ borderRadius: 28, px: 3 }}
            >
              {activeStep < 2 ? "NEXT" : "FINISH"}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StepperCard;
